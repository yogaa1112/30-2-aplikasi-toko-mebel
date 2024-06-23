import { useEffect,useState } from 'react'
import './ListProduct.css'
import remove_icon from '../Assets/remove-icon.png'

const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);
    
    const token = localStorage.getItem('auth-token')
    const fetchInfo = async ()=>{
      await fetch ('https://api-msib-6-toko-mebel-02.educalab.id/allproducts')
      .then((res)=>res.json())
      .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
      fetchInfo();
    }, [])

    const remove_product = async(id)=>{
      await fetch('https://api-msib-6-toko-mebel-02.educalab.id/removeproduct', {
        method:'DELETE',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token' : token
        },
        body:JSON.stringify({id:id})
      })
      await fetchInfo();
    }

  return (
    <div className='list-product'>
       <h1>All Mebelify Product List</h1>
       <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Sub Category</p>
        <p>Remove</p>
       </div>
       <div className="listproduct-allproduct">
        <hr />
          {allproducts.map((product,index)=>{
            return <> 
            <div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>Rp{product.price}</p>
              <p>{product.category}</p>
              <p>{product.sub_category}</p>
              <img onClick={()=>{remove_product(product.id)}} src={remove_icon} alt="" className="listproduct-remove-icon" />
            </div>
            <hr />
            </>
          })}
       </div>
    </div>
  )
}

export default ListProduct