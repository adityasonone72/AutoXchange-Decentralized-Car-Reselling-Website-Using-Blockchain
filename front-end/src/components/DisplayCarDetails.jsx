import React from 'react'

const DisplayCarDetails = (props) => {
  return (
    <>
    {
          <div className='explore-result'>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <p><b>Owner:</b> {props.owner}</p>
                <p><b>Pin Code:</b> {props.pinCode}</p>
                <p><b>Car Registration ID:</b> {props.carRegistrationID}</p>
                <p><b>Market Value:</b> {props.marketValue}</p>
                <p><b>carname:</b> {props.carname}</p>
                <p><b>Fuel Type:</b> {props.fueltype}</p>
                <p><b>First Registration Date:</b> {props.firstregistrationdate}</p>
              </div>

              <div className='col-12 col-md-6'>
                <p><b>State:</b> {props.state}</p>
                <p><b>District:</b> {props.district}</p>
                <p><b>City:</b> {props.city}</p>
                <p><b>Seats:</b> {props.seats} </p>
                <p><b>Color:</b> {props.color} </p>
                <p><b>Car No.:</b> {props.carno} </p>
              </div>
            </div>
            {
            (props.available) ? 
              <button className='marked-available'><b>Marked Available</b></button>
              :
              <button className='mark-available-btn' onClick={() => {props.markAvailable(props.index)}} ><b>Mark Available</b></button>
            }
          </div> 
    }
    </>
  )
}

export default DisplayCarDetails
