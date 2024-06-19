import React, { useContext } from 'react'
import axios from 'axios'
import { ShopContext } from '../../Context/ShopContext'

const CheckOutButton = ({cartItems}) => {
    const {clearCart} = useContext(ShopContext)
    const userEmail = localStorage.getItem('user-id')
    const handleCheckout = ()=>{
        if(!localStorage.getItem('auth-token')){
            alert("Please Login first")
            window.location.href = '/login';
        }
        axios.post("http://localhost:4000/checkout", {
            cartItems,
            userEmail
        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
                clearCart()
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
