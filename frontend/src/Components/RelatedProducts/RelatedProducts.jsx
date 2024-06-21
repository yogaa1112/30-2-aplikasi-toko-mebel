import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/all_product'
import Item from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
        {data_product.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.price}
            old_price={item.price}
          />
        ))}
        </div>
    </div>
  )
}

export default RelatedProducts