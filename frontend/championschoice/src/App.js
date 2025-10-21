import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import logo from './assets/logo.png';
import CustomerLogin from './pages/CustomerLogin';
import CustomerRegister from './pages/CustomerRegister';
import VendorLogin from './pages/VendorLogin';
import VendorRegister from './pages/VendorRegister';
import ShoppingCart from './pages/ShoppingCart';
import InventoryManager from './pages/InventoryManager';
import ShoppingPage from './pages/ShoppingPage';


function LandingPage() {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #e3f2fd, #bbdefb)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Logo and Title */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img src={logo} alt="Champion's Choice Logo" style={{ width: '120px', marginBottom: '10px' }} />
        <h2 style={{ fontWeight: 'bold', color: '#0d47a1' }}>Champion's Choice</h2>
        <p style={{ fontSize: '1.1rem', color: '#1565c0' }}>Choose your portal below</p>
      </div>

      {/* Two main boxes */}
      <MDBContainer className="d-flex justify-content-center">
        <MDBRow className="w-100" style={{ maxWidth: '900px' }}>
          {/* Customer box */}
          <MDBCol md="6" className="mb-4">
            <MDBCard className="shadow-3 text-center" style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-5">
                <h4 className="mb-4" style={{ color: '#0d47a1', fontWeight: '600' }}>Customer Portal</h4>
                <p style={{ marginBottom: '30px', color: '#455a64' }}>
                  Log in or register as a customer to browse and purchase sporting goods.
                </p>
                <Link to="/customer-login">
                  <MDBBtn color="primary" className="m-2 w-75">Login</MDBBtn>
                </Link>
                <Link to="/customer-register">
                  <MDBBtn outline color="primary" className="m-2 w-75">Register</MDBBtn>
                </Link>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* Vendor box */}
          <MDBCol md="6" className="mb-4">
            <MDBCard className="shadow-3 text-center" style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-5">
                <h4 className="mb-4" style={{ color: '#0d47a1', fontWeight: '600' }}>Vendor Portal</h4>
                <p style={{ marginBottom: '30px', color: '#455a64' }}>
                  Log in or register as a vendor to showcase and manage your products.
                </p>
                <Link to="/vendor-login">
                  <MDBBtn color="success" className="m-2 w-75">Login</MDBBtn>
                </Link>
                <Link to="/vendor-register">
                  <MDBBtn outline color="success" className="m-2 w-75">Register</MDBBtn>
                </Link>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/customer-register" element={<CustomerRegister />} />
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/vendor-register" element={<VendorRegister />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/inventory-manager" element={<InventoryManager />} />
      <Route path="/shopping-page" element={<ShoppingPage />} />
    </Routes>
  );
}

export default App;