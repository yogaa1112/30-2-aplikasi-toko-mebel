import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart"
import LoginSignup from "./Pages/LoginSignup";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/office" element={<ShopCategory category="office" />} />
          <Route path="/kicthen" element={<ShopCategory category="kitchen" />} />
          <Route path="/living" element={<ShopCategory category="living" />} />
          <Route path="/product" element={<Product />}>
            <Route path="/productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/Login" element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;