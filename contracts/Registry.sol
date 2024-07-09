// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.9.0;

contract Registry{

    address public superAdmin;
    uint public totalAdmins;
    
    struct Admin{
        address adminAddress;
        string city;
        string district;
        string state;
    }

    struct CarDetails{
        address owner;
        address admin;
        uint256 carRegistrationID;
        uint pinCode;
        uint index;
        bool registered;
        uint marketValue;
        string color;
        string carno;
        string carname;
        string fueltype;
        string firstregistrationdate;
        bool markAvailable;
        mapping(uint => RequestDetails) requests; // reqNo => RequestDetails
        uint noOfRequests;  // other users requested to this land
        uint seats;
    }

    struct UserProfile{
        address userAddr;
        string fullName;
        string gender;
        string email;
        uint256 contact;
        string residentialAddr;
        uint totalIndices;
        uint requestIndices;  // this user requested to other lands
    }

    struct OwnerOwns{
        uint pinCode;
        string state;
        string district;
        string city;
    }
    
    struct RequestedCars{
        uint pinCode;
        string state;
        string district;
        string city;
    }

    struct RequestDetails{
        address whoRequested;
        uint reqIndex;
    }

    mapping(address => Admin) public admins;
    mapping(address => mapping(uint => OwnerOwns)) public ownerMapsProperty;  // ownerAddr => index no. => OwnerOwns 
    mapping(address => mapping(uint => RequestedCars)) public requestedCars;  // ownerAddr => reqIndex => RequestedLands
    mapping(string => mapping(string => mapping(string => mapping(uint => CarDetails)))) public carDetalsMap; // state => district => city => surveyNo => LandDetails
    mapping(address => UserProfile) public userProfile;
    

    constructor(){
        superAdmin = msg.sender;
    }

    modifier onlyAdmin(){
        require(admins[msg.sender].adminAddress == msg.sender, "Only admin can Register Car");
        _;
    }


    // SuperAdmin: Registers new admin
    function addAdmin(address _adminAddr, string memory _state, string memory _district, string memory _city) external{
        Admin storage newAdmin = admins[_adminAddr];
        totalAdmins++;

        newAdmin.adminAddress = _adminAddr;
        newAdmin.city = _city;
        newAdmin.district = _district;
        newAdmin.state = _state;
    }


    // check if it is admin
    function isAdmin() external view returns(bool){
        if(admins[msg.sender].adminAddress == msg.sender){
            return true;
        }
        else return false;
    }


    // Admin: registers land
    function registerCar(string memory _state, string memory _district, string memory _city, uint256 _carRegistrationID, uint _pinCode, address _owner, uint _marketValue, uint _seats,string memory _color,string memory _carno,string memory _carname,string memory _fueltype,string memory _firstregistrationdate) external onlyAdmin{
        
        require(keccak256(abi.encodePacked(admins[msg.sender].state)) == keccak256(abi.encodePacked(_state))  
        && keccak256(abi.encodePacked(admins[msg.sender].district)) == keccak256(abi.encodePacked(_district))
        && keccak256(abi.encodePacked(admins[msg.sender].city)) == keccak256(abi.encodePacked(_city)), "Admin can only register car of same city.");

        require(carDetalsMap[_state][_district][_city][_pinCode].registered == false, "Survey Number already registered!");

        CarDetails storage newCarRegistry = carDetalsMap[_state][_district][_city][_pinCode];
        OwnerOwns storage newOwnerOwns = ownerMapsProperty[_owner][userProfile[_owner].totalIndices];
        
        newCarRegistry.owner = _owner;
        newCarRegistry.admin = msg.sender;
        newCarRegistry.carRegistrationID = _carRegistrationID;
        newCarRegistry.pinCode = _pinCode;
        newCarRegistry.index = userProfile[_owner].totalIndices;
        newCarRegistry.registered = true;
        newCarRegistry.marketValue = _marketValue;
        newCarRegistry.markAvailable = false;
        newCarRegistry.seats = _seats;
        newCarRegistry.color = _color;
        newCarRegistry.carno=_carno;
        newCarRegistry.carname=_carname;
        newCarRegistry.fueltype=_fueltype;
        newCarRegistry.firstregistrationdate = _firstregistrationdate;




        newOwnerOwns.pinCode = _pinCode;
        newOwnerOwns.state = _state;
        newOwnerOwns.district = _district;
        newOwnerOwns.city = _city;

        userProfile[_owner].totalIndices++;
    }


    // User_1: set user profile
    function setUserProfile(string memory _fullName, string memory _gender, string memory _email, uint256 _contact, string memory _residentialAddr) external{
        
        UserProfile storage newUserProfile = userProfile[msg.sender];

        newUserProfile.fullName = _fullName;
        newUserProfile.gender = _gender;
        newUserProfile.email = _email;
        newUserProfile.contact = _contact;
        newUserProfile.residentialAddr = _residentialAddr;
    }


    // User_1: mark property available
    function markMyPropertyAvailable(uint indexNo) external {
        
        string memory state = ownerMapsProperty[msg.sender][indexNo].state;
        string memory district = ownerMapsProperty[msg.sender][indexNo].district;
        string memory city = ownerMapsProperty[msg.sender][indexNo].city;
        uint pinCode = ownerMapsProperty[msg.sender][indexNo].pinCode;

        require(carDetalsMap[state][district][city][pinCode].markAvailable == false, "Property already marked available");

        carDetalsMap[state][district][city][pinCode].markAvailable = true;
    
    }


    // User_2: Request for buy  *ownerAddress & index = arguements* 
    function RequestForBuy(string memory _state, string memory _district, string memory _city, uint _pinCode) external{

        CarDetails storage thisCarDetail = carDetalsMap[_state][_district][_city][_pinCode];
        require(thisCarDetail.markAvailable == true, "This car is NOT marked for sale!");

        uint req_serialNum = thisCarDetail.noOfRequests; 
        thisCarDetail.requests[req_serialNum].whoRequested = msg.sender;
        thisCarDetail.requests[req_serialNum].reqIndex = userProfile[msg.sender].requestIndices;
        thisCarDetail.noOfRequests++;

        // adding requested land to user_2 profile
        RequestedCars storage newReqestedCars = requestedCars[msg.sender][userProfile[msg.sender].requestIndices];
        newReqestedCars.pinCode = _pinCode;
        newReqestedCars.state = _state;
        newReqestedCars.district = _district;
        newReqestedCars.city = _city;

        userProfile[msg.sender].requestIndices++;

    }


    // User_1: Accept the buy request; sell.
    function AcceptRequest(uint _index, uint _reqNo) external{

        uint _pinCode = ownerMapsProperty[msg.sender][_index].pinCode;
        string memory _state = ownerMapsProperty[msg.sender][_index].state; 
        string memory _district = ownerMapsProperty[msg.sender][_index].district;
        string memory _city = ownerMapsProperty[msg.sender][_index].city;
        
        // updating LandDetails
        address newOwner = carDetalsMap[_state][_district][_city][_pinCode].requests[_reqNo].whoRequested;
        uint newOwner_reqIndex = carDetalsMap[_state][_district][_city][_pinCode].requests[_reqNo].reqIndex;
        uint noOfReq = carDetalsMap[_state][_district][_city][_pinCode].noOfRequests;

        // deleting requested land from all requesters AND removing all incoming requests
        for(uint i=0; i<noOfReq; i++){
            address requesterAddr = carDetalsMap[_state][_district][_city][_pinCode].requests[i].whoRequested;
            uint requester_reqIndx = carDetalsMap[_state][_district][_city][_pinCode].requests[i].reqIndex;
            
            delete requestedCars[requesterAddr][requester_reqIndx];
            delete carDetalsMap[_state][_district][_city][_pinCode].requests[i];
        }

        carDetalsMap[_state][_district][_city][_pinCode].owner = newOwner;
        carDetalsMap[_state][_district][_city][_pinCode].markAvailable = false;
        carDetalsMap[_state][_district][_city][_pinCode].noOfRequests = 0;

        // deleting property from user_1's ownerMapsProperty 
        delete ownerMapsProperty[msg.sender][_index];

        // adding ownerMapsProperty for newOwner
        uint newOwnerTotProp = userProfile[newOwner].totalIndices;
        OwnerOwns storage newOwnerOwns = ownerMapsProperty[newOwner][newOwnerTotProp];
       
        newOwnerOwns.pinCode = _pinCode;
        newOwnerOwns.state = _state;
        newOwnerOwns.district = _district;
        newOwnerOwns.city = _city;

        carDetalsMap[_state][_district][_city][_pinCode].index = newOwnerTotProp;

        userProfile[newOwner].totalIndices++;

    }

    
    //******* GETTERS **********

    // return land details 
    function getCarDetails(string memory _state, string memory _district, string memory _city, uint _pinCode) external view returns(address, uint256, uint,uint, uint,string memory,string memory,string memory,string memory,string memory){
        
        address owner = carDetalsMap[_state][_district][_city][_pinCode].owner;
        uint256 carRegistrationID = carDetalsMap[_state][_district][_city][_pinCode].carRegistrationID;
        uint indx = carDetalsMap[_state][_district][_city][_pinCode].index;
        uint mv = carDetalsMap[_state][_district][_city][_pinCode].marketValue;
        uint seats = carDetalsMap[_state][_district][_city][_pinCode].seats;
        string memory color = carDetalsMap[_state][_district][_city][_pinCode].color;
        string memory carno = carDetalsMap[_state][_district][_city][_pinCode].carno;
        string memory carname = carDetalsMap[_state][_district][_city][_pinCode].carname;
        string memory fueltype = carDetalsMap[_state][_district][_city][_pinCode].fueltype;
        string memory firstregistrationdate = carDetalsMap[_state][_district][_city][_pinCode].firstregistrationdate;


        return(owner, carRegistrationID,indx ,mv, seats,color,carno,carname,fueltype,firstregistrationdate);
    }

    function getRequestCnt_propId(string memory _state, string memory _district, string memory _city, uint _pinCode) external view returns(uint, uint256){
        uint _noOfRequests = carDetalsMap[_state][_district][_city][_pinCode].noOfRequests;
        uint256 _carRegistrationID = carDetalsMap[_state][_district][_city][_pinCode].carRegistrationID;
        return(_noOfRequests, _carRegistrationID);
    }

    function getRequesterDetail(string memory _state, string memory _district, string memory _city, uint _pinCode, uint _reqIndex) external view returns(address){
        address requester = carDetalsMap[_state][_district][_city][_pinCode].requests[_reqIndex].whoRequested;
        return(requester);
    }

    function isAvailable(string memory _state, string memory _district, string memory _city, uint _pinCode) external view returns(bool){
        bool available = carDetalsMap[_state][_district][_city][_pinCode].markAvailable;
        return(available);
    }

    function getOwnerOwns(uint indx) external view returns(string memory, string memory, string memory, uint){
        
        uint pinCode = ownerMapsProperty[msg.sender][indx].pinCode;
        string memory state = ownerMapsProperty[msg.sender][indx].state;
        string memory district = ownerMapsProperty[msg.sender][indx].district;
        string memory city = ownerMapsProperty[msg.sender][indx].city;

        return(state, district, city, pinCode);
    }

    function getRequestedCars(uint indx) external view returns(string memory, string memory, string memory, uint){
        
        uint pinCode = requestedCars[msg.sender][indx].pinCode;
        string memory state = requestedCars[msg.sender][indx].state;
        string memory district = requestedCars[msg.sender][indx].district;
        string memory city = requestedCars[msg.sender][indx].city;

        return(state, district, city, pinCode);
    }

    function getUserProfile() external view returns(string memory, string memory, string memory, uint256, string memory){
        
        string memory fullName = userProfile[msg.sender].fullName;
        string memory gender = userProfile[msg.sender].gender;
        string memory email = userProfile[msg.sender].email;
        uint256 contact = userProfile[msg.sender].contact;
        string memory residentialAddr = userProfile[msg.sender].residentialAddr;

        return(fullName, gender, email, contact, residentialAddr);
    }

    function getIndices() external view returns(uint, uint){

        uint _totalIndices = userProfile[msg.sender].totalIndices;
        uint _reqIndices = userProfile[msg.sender].requestIndices;

        return(_totalIndices, _reqIndices);
    }


    function didIRequested(string memory _state, string memory _district, string memory _city, uint _pinCode) external view returns(bool){
        
        CarDetails storage thisCarDetail = carDetalsMap[_state][_district][_city][_pinCode];
        uint _noOfRequests = thisCarDetail.noOfRequests;

        if(_noOfRequests == 0) 
            return (false);

        for(uint i=0; i<_noOfRequests; i++){
            if(thisCarDetail.requests[i].whoRequested == msg.sender){
                return (true);
            }
        } 

        return(false);
        }
}
