import '../../Pages/CSS/Load.css'
import React, { useContext } from 'react'
import './CartItems.css'
// import Product from '../../../../backend/model/Product'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cross_cart.png'
import CheckOutButton from '../CheckOutButton/CheckOutButton.jsx'
const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems,removeFromCart} = useContext(ShopContext)
    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(price).replace('IDR', 'Rp');
    }
    const cartItemsList = all_product.filter(cartItem => cartItems[cartItem.id] > 0)
    .map(cartItem => {
      const { _id, __v, date, ...item } = cartItem; 
      return { ...item, quantity: cartItems[cartItem.id] };
    });;
    if (!cartItemsList) {
      return <div className='Load'>Loading...</div>; 
    }
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((cartItem)=>{
        if(cartItems[cartItem.id]>0){
            return <div>
            <div className="cartitems-format cartitems-format-main">
                <img src={cartItem.image} alt="" className='carticon-product-icon' />
                <p>{cartItem.name}</p>
                <p>{formatPrice(cartItem.price)}</p>
                <span className='cartitems-quantity'>{cartItems[cartItem.id]}</span>
                <p>{formatPrice(cartItem.price*cartItems[cartItem.id])}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(cartItem.id)}} alt="" />
            </div>
            <hr />
          </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>{formatPrice(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
                <p>Total</p>
                <h3>{formatPrice(getTotalCartAmount())}</h3>
            </div>
            {cartItemsList.length > 0 ? (
            <CheckOutButton cartItems={cartItemsList} />
            ) : (
              <button disabled>CHECK OUT</button>
            )}
        
        </div>
      <div className="cartitems-promocode">
        <p>if you have a promo code, Enter it here</p>
        <div className="cartitems-promobox">
            <input type="text" name="" id="" placeholder='promo code' />
            <button>Submit</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CartItems
