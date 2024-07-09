import React from 'react'

const DisplayRequested = (props) => {
  return (
    <>
        <div className='explore-result'>
          <div className='row'>
            <div className='col-12 col-md-6'>
                <p><b>Owner:</b> {props.owner}</p>
                <p><b>Pin Code:</b> {props.pinCode}</p>
                <p><b>Car Registration ID:</b> {props.carRegistrationID}</p>
                <p><b>Market Value:</b> {props.marketValue}</p>
                <p><b>Car color:</b> {props.color}</p>
                <p><b>First Registration Date:</b> {props.firstregistrationdate}</p>

              </div>
              <div className='col-12 col-md-6'>
                <p><b>Seats:</b> {props.seats} </p>
                <p><b>State:</b> {props.state}</p>
                <p><b>District:</b> {props.district}</p>
                <p><b>City:</b> {props.city}</p>
                <p><b>Car Name:</b> {props.carname}</p>
                <p><b>Fuel Type:</b> {props.fueltype}</p>
            </div>
          </div>

            <button className='no-sale'><b>Request Pending</b></button>
        </div>
    </>
  )
}

export default DisplayRequested