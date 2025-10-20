import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import logo from '../assets/logo.png';

export default function VendorRegister() {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #e3f2fd, #bbdefb)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <MDBContainer
        className="p-4 d-flex flex-column align-items-center shadow-3 rounded"
        style={{ backgroundColor: 'white', maxWidth: '450px' }}
      >
        {/* Logo and Title */}
        <img
          src={logo}
          alt="Champion's Choice Logo"
          style={{ width: '120px', height: 'auto', marginBottom: '15px' }}
        />
        <h3 className="fw-bold mb-4 text-primary text-center">
          Vendor Registration
        </h3>

        {/* Register Form */}
        <MDBInput
          wrapperClass="mb-3"
          label="Brand"
          id="vendorBrand"
          type="brand"
        />
        <MDBInput
          wrapperClass="mb-3"
          label="Email address"
          id="vendorEmail"
          type="email"
        />
        <MDBInput
          wrapperClass="mb-3"
          label="Password"
          id="vendorPassword"
          type="password"
        />
        <MDBInput
          wrapperClass="mb-3"
          label="Confirm Password"
          id="vendorConfirmedPassword"
          type="confirmedpassword"
        />

        <Link to="/vendor-login">        
            <MDBBtn className="mb-4 w-100" color="primary">Register</MDBBtn>
        </Link>

        <div className="text-center">

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: '50%' }}
          >
            <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>
            <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>
            <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>
            <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
}