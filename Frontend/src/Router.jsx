import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ServiceDetail from './pages/ServiceDetail';
import Cart from './pages/Cart.jsx';
import Layout from "./components/Layout/Index.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <Routes>
           <Route path="/" element={<Layout/> }>
                <Route path="/" element={<Home />} /> // http://localhost:5173/
                <Route path="/services" element={<Services />} /> // http://localhost:5173/services
                <Route path="/login" element={<Login />} /> // http://localhost:5173/login
                <Route path="/register" element={<Register />} /> // http://localhost:5173/register
                <Route path="/profile" element={<Profile />} /> // http://localhost:5173/profile
                <Route path="/services/:id" element={<ServiceDetail />} /> // http://localhost:5173/services/:id
                <Route path="/cart" element={<Cart />} /> // http://localhost:5173/cart
            </Route>
          </Routes>
        </Box>
    </Box>
    </BrowserRouter>
  );
};

export default Router;
