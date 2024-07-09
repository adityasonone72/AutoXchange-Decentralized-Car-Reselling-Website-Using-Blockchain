import React, { useEffect, useState } from 'react'
import DisplayCarDetails from './DisplayCarDetails';

const Property = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [carDetailList, setCarDetailList] = useState([])
  const [length, setLength] = useState(0);
  const [reload, setReload] = useState(0);
  const detailsArr = [];


  useEffect(()=>{

    const getProperty = async () =>{
      const _indices = await contract.getIndices({from: account});
      const _totalIndices = _indices[0].words[0];

      for(let i=0; i<_totalIndices; i++){
        const ownerOwns = await contract.getOwnerOwns(i, {from: account});  // returns object
        
        // if survey no. != 0
        if(ownerOwns[3].words[0] != 0){
            const carDetails = await contract.getCarDetails(ownerOwns[0], ownerOwns[1], ownerOwns[2], ownerOwns[3].words[0], {
              from: account
            })

            const isAvaliable = await contract.isAvailable(ownerOwns[0], ownerOwns[1], ownerOwns[2], ownerOwns[3].words[0], {
              from: account
            })
            
            const carDetails2 = {state: ownerOwns[0], district: ownerOwns[1], city: ownerOwns[2], pinCode: ownerOwns[3].words[0], isAvaliable}
            let allDetails = {...carDetails, ...carDetails2}
            detailsArr.push(allDetails);
        }
      }
      setCarDetailList(detailsArr);
      setLength(detailsArr.length)
      console.log(detailsArr)
    }

    getProperty();
  }, [reload])

  const markAvailableFunction = async (indx) =>{
      await contract.markMyPropertyAvailable(indx, {from: account});
      setReload(!reload);
      console.log(indx);
  }



  return (
    <div className='container' style={{marginBottom: '2rem'}}>
        {  
        (length == 0) ? 
        <div className="no-result-div">
          <p className='no-result'>No properties found :(</p>
        </div>
        :
          carDetailList.map((details, index) =>{
            return(
              <DisplayCarDetails
                 
                key = {index}
                owner = {details[0]}
                carRegistrationID = {details[1].words[0]}
                index = {details[2].words[0]}
                marketValue = {details[3].words[0]}
                seats = {details[4].words[0]}
                color = {details[5]}
                carno = {details[6]}
                carname = {details[7]}
                fueltype = {details[8]}
                firstregistrationdate = {details[9]}
                state = {details.state}
                district = {details.district}
                city = {details.city}
                pinCode = {details.pinCode}
                available = {details.isAvaliable}
                markAvailable = {markAvailableFunction}

              />
            )
          })
        } 
      
    </div>
  )
}

export default Property
