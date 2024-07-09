import React, { useEffect, useState } from 'react'
import '../css/Explore.css'
import DisplayExploreResult from './DisplayExploreResult';

const Explore = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [explore, setExplore] = useState({
    state:"", district:"", city:"", pinCode:""
  })

  const [carDetail, setCarDetail] = useState({
    owner:"", carRegistrationID:"", index:"", marketValue:"", seats:"", color:"", carno:"", carname:"",fueltype:"",firstregistrationdate:""
  })

  const [didIRequested, setDidIRequested] = useState(false);
  const [available, setAvailable] = useState(false);
  const [noResult, setNoResult] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setExplore({...explore, [name]:value})
  }

  const handleOnClick = async () =>{
    const carDetails = await contract.getCarDetails(explore.state, explore.district, explore.city, explore.pinCode, {
      from: account
    })
    
    const isAvaliable = await contract.isAvailable(explore.state, explore.district, explore.city, explore.pinCode, {
      from: account
    })
    
    const owner = carDetails[0];
    const carRegistrationID = carDetails[1].words[0]
    const index = carDetails[2].words[0]
    const marketValue = carDetails[3].words[0]
    const seats = carDetails[4].words[0]
    const pinCode = explore.pinCode
    const color = carDetails[5]
    const carno = carDetails[6]
    const carname = carDetails[7]
    const fueltype = carDetails[8]
    const firstregistrationdate = carDetails[9]
    

    if(account === owner){
      setIsOwner(true)
    }
    else{
      setIsOwner(false);
      if(isAvaliable){
        const _didIRequested = await contract.didIRequested(explore.state, explore.district, explore.city, explore.pinCode,{
          from: account
        })
        
        setDidIRequested(_didIRequested);
      }
    }

    setCarDetail({owner, carRegistrationID, index, marketValue, seats, color, carno, carname, fueltype, firstregistrationdate, pinCode})
    setAvailable(isAvaliable);
    setNoResult(1);
  }

  const requestForBuy = async () =>{
    await contract.RequestForBuy(explore.state, explore.district, explore.city, explore.pinCode, {
      from: account
    })

    setDidIRequested(true);
  }


  useEffect(()=>{
    console.log(carDetail)
  }, [carDetail])

  
  return (
    <div className='container explore-maindiv'>
        <div className='row'>
          <div className='col-12 col-sm-6'>
            <form method='POST' className='admin-form'>
              <div className='form-group'>
                  <label>State</label>
                  <input type="text" className="form-control" name="state" placeholder="Enter State" 
                  autoComplete="off" value={explore.state} onChange={onChangeFunc}/>
              </div>
              <div className='form-group'>
                  <label>District</label>
                  <input type="text" className="form-control" name="district" placeholder="Enter district" 
                  autoComplete="off" value={explore.district} onChange={onChangeFunc}/>
              </div>
            </form>
          </div>
          <div className='col-12 col-sm-6'>
            <form method='POST' className='admin-form'>
              <div className='form-group'>
                  <label>City</label>
                  <input type="text" className="form-control" name="city" placeholder="Enter city" 
                  autoComplete="off" value={explore.city} onChange={onChangeFunc}/>
              </div>
              <div className='form-group'>
                  <label>Pin Code</label>
                  <input type="text" className="form-control" name="pinCode" placeholder="Enter pin code" 
                  autoComplete="off" value={explore.pinCode} onChange={onChangeFunc}/>
              </div>
            </form>
          </div>
        </div>
        <button className='admin-form-btn' onClick={handleOnClick}>Explore</button>

        <DisplayExploreResult

            owner = {carDetail.owner}
            carRegistrationID = {carDetail.carRegistrationID}
            pinCode = {carDetail.pinCode}
            marketValue = {carDetail.marketValue}
            seats = {carDetail.seats}
            color = {carDetail.color}
            carno = {carDetail.carno}
            carname = {carDetail.carname}
            fueltype = {carDetail.fueltype}
            firstregistrationdate = {carDetail.firstregistrationdate}
            available = {available}
            isAdmin = {props.isAdmin}
            didIRequested = {didIRequested}
            requestForBuy = {requestForBuy}
            noResult = {noResult}
            isOwner = {isOwner}
        />
    </div>
  )
}

export default Explore