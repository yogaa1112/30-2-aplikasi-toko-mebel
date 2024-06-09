import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom';

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price).replace('IDR', 'Rp');
}

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img src={props.image} alt="" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          {formatPrice(props.new_price)}
        </div>
        <div className="item-price-old">
          {formatPrice(props.old_price)}
        </div>
      </div>
    </div>
  )
}

export default Item
