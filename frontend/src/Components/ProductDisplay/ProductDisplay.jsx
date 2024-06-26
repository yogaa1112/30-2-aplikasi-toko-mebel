import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';



export const ProductDisplay = (props) => {
    const { product } = props;
    const {addToCart} = useContext(ShopContext);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        }).format(price).replace('IDR', 'Rp');
      }
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-prices-old">{formatPrice(product.price)}</div>
                    <div className="productdisplay-right-prices-new">{formatPrice(product.price)}</div>
                </div>
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Eaque tenetur officia nulla ipsum deserunt odio, amet praesentium?
                    Reprehenderit perferendis impedit eius soluta, fugit eaque,
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Style</h1>
                    <div className='productdisplay-right-sizes'>
                        <div>Black</div>
                        <div>Beige</div>
                        <div>Polish</div>
                        <div>Simple</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category :</span> {product.category}</p>
                <p className="productdisplay-right-category"><span>Tags :</span> {product.sub_category}</p>
            </div>
        </div>
    )
}
export default ProductDisplay