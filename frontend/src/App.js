import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart"
import Footer from './Components/Footer/Footer'
import LoginSignup from "./Pages/LoginSignup";
import home_banner from "./Components/Assets/home.png";
import office_banner from "./Components/Assets/office.png"
import kitchen_banner from "./Components/Assets/kitchen.png"
import CheckoutSuccess from "./Components/CheckoutSuccess/CheckoutSuccess";
import NotFound from "./Pages/NotFound";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/home" element={<ShopCategory banner={home_banner} category="living" />} />
          <Route path="/office" element={<ShopCategory banner={office_banner} category="office" />} />
          <Route path="/kitchen" element={<ShopCategory banner={kitchen_banner} category="kitchen" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/Login" element={<LoginSignup />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;