import React from 'react'
import './CheckoutSuccess.css'
import success_icon from '../Assets/success_icon.png'
const CheckoutSuccess = () => {
    return ( 
    <div className='checkout-true'>
        <h2>Checkout Success</h2>
        <img src={success_icon} alt="" />
    </div> 
    );
}
 
export default CheckoutSuccess;