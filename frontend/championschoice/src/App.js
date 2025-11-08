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
import CheckoutPage from "./pages/CheckoutPage";
import SurveyPage from "./pages/SurveyPage";

// ✅ Protected Routes
import { CustomerOnly, VendorOnly } from './routes/ProtectedRoutes';

function App() {
    return (
        <Routes>

            {/* ✅ Public Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* ✅ Public Auth Selection */}
            <Route path="/auth" element={<AuthPage />} />

            {/* ✅ Public (Anyone can browse), but Add-to-Cart will require login */}
            <Route path="/shopping-page" element={<ShoppingPage />} />

            {/* ✅ CUSTOMER AUTH ROUTES */}
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/customer-register" element={<CustomerRegister />} />

            {/* ✅ VENDOR AUTH ROUTES */}
            <Route path="/vendor-login" element={<VendorLogin />} />
            <Route path="/vendor-register" element={<VendorRegister />} />

            {/* ✅ CUSTOMER-ONLY ROUTES */}
            <Route
                path="/shopping-cart"
                element={
                    <CustomerOnly>
                        <ShoppingCart />
                    </CustomerOnly>
                }
            />

            {/* ✅ VENDOR-ONLY ROUTES */}
            <Route
                path="/inventory-manager"
                element={
                    <VendorOnly>
                        <InventoryManager />
                    </VendorOnly>
                }
            />

            
            <Route 
                path="/checkout" 
                element={
                    <CheckoutPage />
                } 
            />

            <Route 
                path="/survey" 
                element={
                    <SurveyPage />
                } 
            />


        </Routes>
    );
}

export default App;