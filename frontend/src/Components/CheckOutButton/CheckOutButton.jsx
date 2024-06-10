import React from 'react'
import axios from 'axios'

const CheckOutButton = ({cartItems}) => {
    const handleCheckout = ()=>{
        axios.post("http://localhost:4000/checkout", {
            cartItems,

        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err)=>{
            console.log(err.message);
        })
    }
  return (
    <div>
       <button onClick={()=>handleCheckout()}> CHECKOUT</button>
    </div>
  )
}

export default CheckOutButton
