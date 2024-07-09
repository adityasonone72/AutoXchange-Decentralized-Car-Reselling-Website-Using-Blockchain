import React from 'react'

const DisplayExploreResult = (props) => {
  return (
    <>
    {
        (props.carRegistrationID != 0) ?   // propertyId != 0 means we got a result while exploring.
          (
            <div className='explore-result'>
              <p><b>Owner:</b> {props.owner}</p>
              <p><b>Pin Code:</b> {props.pinCode}</p>
              <p><b>Car Registration ID:</b> {props.carRegistrationID}</p>
              <p><b>Market Value:</b> {props.marketValue}</p>
              <p><b>Seats:</b> {props.seats} </p>
              <p><b>Color:</b> {props.color}</p>
              <p><b>Car No.:</b> {props.carno}</p>
              <p><b>Car Name:</b> {props.carname}</p>
              <p><b>Fuel Type:</b> {props.fueltype}</p>
              <p><b>First Registration Date:</b> {props.firstregistrationdate}</p>

              {
              (props.available) ?  // if land is marked for sale.
                (
                  (props.isAdmin || props.isOwner) ?  // isOwner means "is Owner exploring its own land?"
                    (
                      // if owner is exploring its own land, then, owner CANNOT request its own land, hence "Marked for sale" will be displayed only.
                      <button className='marked-sale'><b>Marked for sale</b></button>
                    )
                    :
                    (
                      // if owner is exploring other's land, then owner can request to buy other's land, hence "Request for buy" can be displayed on button.
                      (props.didIRequested) ? 
                      <button className='req-pending'><b>Request Pending</b></button>
                      :
                      <button className='buy-btn' onClick={props.requestForBuy}><b>Request for buy</b></button>
                    )
                )
                :
                <button className='no-sale'><b>Not for sale</b></button>
              }

            </div> 
          )
          :
          (
            (props.noResult) ? 
              <div className="no-result-div">
                <p className='no-result'>No result found :(</p>
              </div>
              :
              <></>
          )
    }
    </>
  )
}

export default DisplayExploreResult
