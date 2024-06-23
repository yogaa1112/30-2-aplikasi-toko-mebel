import '../../Pages/CSS/Load.css'
import { useState } from 'react'
import './AddProduct.css'
import upload_area from '../Assets/upload_area.svg'

const AddProduct = () => {

  const [image,setImage] = useState(false);
  const [productDetails,setProductDetails] = useState({
    name: "",
    image:"",
    category:"office",
    sub_category:"",
    price:""
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }
  const changeHandler = (e) =>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  const token = localStorage.getItem('auth-token')
  const Add_Product = async () =>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('produk', image);

    await fetch('https://api-msib-6-toko-mebel-02.educalab.id/upload', {
      method:'POST',
      headers:{
          Accept: 'application/json',
          'auth-token' :token
      },
      body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})

    if (!responseData) {
      return <div className='Load'>Loading...</div>; 
    }
    else
    {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('https://api-msib-6-toko-mebel-02.educalab.id/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
          'auth-token' :token
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
      })
    }

  }

  return (
    <div className='add-product'>
       <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='type here' />
       </div>
       <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.price} onChange={changeHandler} type="text" name='price' placeholder='type here' />
            </div>
       </div>
       <div className="addproduc-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector' id="">
                <option value="Office">Office</option>
                <option value="home">Home</option>
                <option value="living">Living</option>
                <option value="kitchen">kitchen</option>
                <option value="bedroom">Bedroom</option>
            </select>
       </div>
       <div className="addproduct-itemfield">
        <p>Product Sub-Category</p>
        <select value={productDetails.sub_category} onChange={changeHandler} name="sub_category" className='add-product-selector'>
          <option value="sofa">Sofa</option>
          <option value="kursi">Kursi</option>
          <option value="meja kopi">Meja Kopi</option>
          <option value="rak buku">Rak Buku</option>
          <option value="meja makan">Set Meja Makan</option>
          <option value="Bufet">Bufet</option>
          <option value="tempat tidur">Tempat Tidur</option>
          <option value="lemari">Lemari Pakaian</option>
          <option value="meja rias">Meja Rias</option>
          <option value="meja belajar">Meja Belajar</option>
          <option value="nakas">Nakas</option>
          <option value="meja kantor">Meja Kantor</option>
          <option value="kursi kantor">Kursi Kantor</option>
          <option value="rak arsip">Rak Arsip</option>
          <option value="kursi bar">Kursi Bar</option>
          <option value="rak penyimpanan">Rak Penyimpanan</option>
          <option value="kitchen set">Kitchen Set</option>
          <option value="meja rias">Meja Rias</option>
          <option value="aksesoris dekorasi">Aksesoris & Dekorasi</option>
        </select>
      </div>
       <div className="addproduct-itemfield">
          <label htmlFor="file-input">
              <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
       </div>
       <button onClick={()=>{Add_Product()}} className='addproduct-btn'>
          ADD
       </button>
    </div>
  )
}

export default AddProduct