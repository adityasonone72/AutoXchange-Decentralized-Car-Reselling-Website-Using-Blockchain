import React, {useState, useEffect } from 'react'
import DisplayRequested from './DisplayRequested';

const Requested = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  const reqArr = [];

  const [requestedList, setRequestedList] = useState([]);
  const [length, setLength] = useState(0);

  useEffect(() =>{

    const getRequested = async () =>{

      const _indices = await contract.getIndices({from: account});
      const _reqIndices = _indices[1].words[0];

      for(let i=0; i<_reqIndices; i++){

        const reqCar = await contract.getRequestedCars(i, {from: account});

        // if surveyNo. != 0
        if(reqCar[3].words[0] != 0){
          const carDetails = await contract.getCarDetails(reqCar[0], reqCar[1], reqCar[2], reqCar[3].words[0], {
            from: account
          })

          const carDetails2 = {state: reqCar[0], district: reqCar[1], city: reqCar[2], pinCode: reqCar[3].words[0]}
          let allDetails = {...carDetails, ...carDetails2}
          reqArr.push(allDetails);
        }
      }
      setRequestedList(reqArr);
      setLength(reqArr.length);
      console.log(reqArr);
    }

    getRequested();

  }, [])


  return (
    <div className='container'>
        {  
        (length === 0) ? 
        <div className="no-result-div">
          <p className='no-result'>No pending requests.</p>
        </div>
        :
          requestedList.map((details, index) =>{
            return(
              <DisplayRequested
                 
                key = {index}
                owner = {details[0]}
                carRegistrationID = {details[1].words[0]}
                index = {details[2].words[0]}
                marketValue = {details[3].words[0]}
                seats = {details[4].words[0]}
                state = {details.state}
                district = {details.district}
                city = {details.city}
                pinCode = {details.pinCode}
                color = {details[5]}
                carno = {details[6]}
                carname = {details[7]}
                fueltype = {details[8]}
                firstregistrationdate = {details[9]}

              />
            )
          })
        } 
    </div>
  )
}

export default Requested