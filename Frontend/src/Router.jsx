import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from './components/Home/index.jsx';
import Services from './components/Services/List/Services.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ServiceDetail from "./components/Services/Single/ServiceDetail.jsx";
import Cart from './pages/Cart.jsx';
import Layout from "./components/Layout/index.jsx";
import AdminServices from "./pages/admin/AdminServices.jsx";
import AddServiceForm from "./components/Admin/AddServiceForm.jsx";
import { AuthContext } from './contexts/AuthContext.jsx';
import { useContext } from 'react';

const AdminRoute = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.email === 'admin@moviliza.com';
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route element={<AdminRoute />}>
            <Route path="admin/services" element={<AdminServices />} />
            <Route path="admin/services/new" element={<AddServiceForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
