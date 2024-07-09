import React, { useState } from 'react'
import '../css/RegisterCar.css'

const RegisterCar = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [carDetails, setCarDetials] = useState({
    state:"", district:"", city:"", carRegistrationID:"", pinCode:"", owner:"", marketValue:"", seats:"", color:"", carno:"", carname:"",fueltype:"",firstregistrationdate:""
  }) 

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setCarDetials({...carDetails, [name]:value});
  }

  const handleOnClick = async () =>{
    await contract.registerCar(carDetails.state, carDetails.district, carDetails.city, carDetails.carRegistrationID, carDetails.pinCode, carDetails.owner, carDetails.marketValue, carDetails.seats,carDetails.color,carDetails.carno,carDetails.carname,carDetails.fueltype,carDetails.firstregistrationdate, {
      from: account
    })
    console.log(carDetails)
    setCarDetials({state:"", district:"", city:"", carRegistrationID:"", pinCode:"", owner:"", marketValue:"", seats:"", color:"", carno:"", carname:"",fueltype:"",firstregistrationdate:""})
  }



  return (
    <div className='container registerCar-maindiv'>
      <div className='row'>

         {/* left form */}
        <div className='col-12 col-sm-6'>
            <form method='POST' className='admin-form'>
            <div className='form-group'>
    <label>State</label>
    <select className="form-control" name="state" value={carDetails.state} onChange={onChangeFunc}>
        <option value="">Select State</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
    </select>
</div>

                <div className='form-group'>
                    <label>District</label>
                    <input type="text" className="form-control" name="district" placeholder="Enter District" 
                    autoComplete="off" value={carDetails.district} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>City</label>
                    <input type="text" className="form-control" name="city" placeholder="Enter City" 
                    autoComplete="off" value={carDetails.city} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>Car Registration ID</label>
                    <input type="number" className="form-control" name="carRegistrationID" placeholder="Enter Car Registration ID" 
                    autoComplete="off" value={carDetails.carRegistrationID} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>Color</label>
                    <input type="text" className="form-control" name="color" placeholder="Enter Color" 
                    autoComplete="off" value={carDetails.color} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>Car No.</label>
                    <input type="text" className="form-control" name="carno" placeholder="Enter Car No." 
                    autoComplete="off" value={carDetails.carno} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>Car Name</label>
                    <input type="text" className="form-control" name="carname" placeholder="Enter Car Name" 
                    autoComplete="off" value={carDetails.carname} onChange={onChangeFunc}/>
                </div>
            </form>
        </div>

        {/* right form */}
        <div className='col-12 col-sm-6'>
          <form method='POST' className='admin-form'>
            <div className='form-group'>
                <label>Pin Code</label>
                <input type="number" className="form-control" name="pinCode" placeholder="Enter Pin Code " 
                autoComplete="off" value={carDetails.pinCode} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                <label>Owner Address</label>
                <input type="text" className="form-control" name="owner" placeholder="Enter owner address" 
                autoComplete="off" value={carDetails.owner} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                <label>Market Value</label>
                <input type="number" className="form-control" name="marketValue" placeholder="Enter market value" 
                autoComplete="off" value={carDetails.marketValue} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                <label>Seats</label>
                <input type="number" className="form-control" name="seats" placeholder="Enter no. of seats" 
                autoComplete="off" value={carDetails.seats} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                    <label>Fuel Type</label>
                    <input type="text" className="form-control" name="fueltype" placeholder="Enter Fuel Type" 
                    autoComplete="off" value={carDetails.fueltype} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
    <label>First Registration Date</label>
    <input type="date" className="form-control" name="firstregistrationdate" 
        value={carDetails.firstregistrationdate} onChange={onChangeFunc}/>
</div>


          </form>
        </div>
      </div>
      <button className='admin-form-btn' onClick={handleOnClick}>Submit</button>
    </div>
  )
}

export default RegisterCar
