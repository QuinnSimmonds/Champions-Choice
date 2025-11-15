import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CustomerLogin from './pages/CustomerLogin';
import CustomerRegister from './pages/CustomerRegister';
import VendorLogin from './pages/VendorLogin';
import VendorRegister from './pages/VendorRegister';
import ShoppingCart from './pages/ShoppingCart';
import InventoryManager from './pages/InventoryManager';
import ShoppingPage from './pages/ShoppingPage';
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import VendorProfile from "./pages/VendorProfile";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import VendorApplication from "./pages/VendorApplication";


function App() {


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <Routes>
            {/* Main home page - Public */}
            <Route path="/" element={<HomePage />} />

            {/* Dashboards */}
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />

            {/* Profiles */}
            <Route path="/customer-profile" element={<CustomerProfile />} />
            <Route path="/vendor-profile" element={<VendorProfile />} />

            {/* Auth portal page - Choose Customer or Vendor */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/vendor-app" element={<VendorApplication />} />

            {/* Public shopping page */}
            <Route path="/shopping-page" element={<ShoppingPage />} />

            {/* Customer authentication routes */}
            <Route path="/customer-login" element={<CustomerLogin setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/customer-register" element={<CustomerRegister />} />

            {/* Vendor authentication routes */}
            <Route path="/vendor-login" element={<VendorLogin setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/vendor-register" element={<VendorRegister />} />

            {/* Protected routes (require login) */}
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/inventory-manager" element={<InventoryManager />} />


        </Routes>
    );
}

export default App;