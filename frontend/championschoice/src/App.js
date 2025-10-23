import React from 'react';
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

function App() {
    return (
        <Routes>
            {/* Main home page - Public */}
            <Route path="/" element={<HomePage />} />

            {/* Auth portal page - Choose Customer or Vendor */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Public shopping page */}
            <Route path="/shopping-page" element={<ShoppingPage />} />

            {/* Customer authentication routes */}
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/customer-register" element={<CustomerRegister />} />

            {/* Vendor authentication routes */}
            <Route path="/vendor-login" element={<VendorLogin />} />
            <Route path="/vendor-register" element={<VendorRegister />} />

            {/* Protected routes (require login) */}
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/inventory-manager" element={<InventoryManager />} />
        </Routes>
    );
}

export default App;