import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import User from './component/Home/User';
import Admin from './component/Home/Admin';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import App from './App';
import PrivateRoutes from './Routes/PrivateRoutes';
import DescriptionProduct from './component/Home/DescriptionProduct'
import ProductSell from './component/Home/ProductSell'; 
import DeleteForm from './component/Home/DeleteForm';
import UpdateForm from './component/Home/UpdateForm';
import UpdatePage from './component/Home/UpdatePage';
const Layout = () => {
  return (
    <Routes>
      {/* Bọc App để Navbar luôn hiển thị */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="description-product/:id" element={<DescriptionProduct />} />
        
        <Route element={<PrivateRoutes />}>
          <Route path="user" element={<User />} />
          <Route path="admin" element={<Admin />}>
          </Route>
          <Route path="delete-product" element={<DeleteForm />} />
          <Route path="update-product" element={<UpdateForm />} />
          <Route path="update-products/:id" element={<UpdatePage />} />
          <Route path="add-product" element={<ProductSell />} />
        </Route>
      </Route>
      <Route element={<PrivateRoutes />}>

      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Layout;
