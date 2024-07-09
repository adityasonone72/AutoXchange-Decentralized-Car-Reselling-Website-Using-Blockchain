import React, { useEffect, useState } from 'react'
import emblem from '../images/emblem.svg'
import '../css/SuperAdmin.css'
import { NavLink } from 'react-router-dom';

const SuperAdmin = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  
  const [adminData, setAdminData] = useState({
    address:"", state:"", district:"", city:""
  });

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setAdminData({...adminData, [name]:value});
  }

  const handleSubmit = async () =>{
    await contract.addAdmin(adminData.address, adminData.state, adminData.district, adminData.city, {
      from: account
    })

    console.log('admin details submitted');
    setAdminData({address:"", state:"", district:"", city:""});
  }


  return (
    <div className='container superAdmin-mainDiv'>
      
      <div className='superAdmin-heading-div'>
          <NavLink to='/'>
          <img src={emblem} alt="emblem" className="emblem" />
          </NavLink>
          <h1>Super Admin</h1>
      </div>
      
      <p className='superAdmin-p'>Add an Admin</p>
      
      <form method='POST' className='admin-form'>
        <div className='form-group'>
            <label>Admin Address</label>
            <input type="text" className="form-control" name="address" placeholder="Enter admin address" 
            autoComplete="off" value={adminData.address} onChange={onChangeFunc}/>
        </div>
        <div className='form-group'>
    <label>State</label>
    <select className="form-control" name="state" value={adminData.state} onChange={onChangeFunc}>
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
            <input type="text" className="form-control" name="district" placeholder="Enter district" 
            autoComplete="off" value={adminData.district} onChange={onChangeFunc}/>
        </div>
        <div className='form-group'>
            <label>City</label>
            <input type="text" className="form-control" name="city" placeholder="Enter city" 
            autoComplete="off" value={adminData.city} onChange={onChangeFunc}/>
        </div>
      </form>
      <button className='admin-form-btn' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default SuperAdmin