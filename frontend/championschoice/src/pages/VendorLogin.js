import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import logo from '../assets/logo.png';

export default function VendorLogin() {
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
          Vendor Login
        </h3>

        {/* Login Form */}
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

        <div className="d-flex justify-content-between mx-2 mb-4 w-100">
          <a href="#!">Forgot password?</a>
        </div>

        <Link to="/inventory-manager"> 
            <MDBBtn className="mb-4 w-100" color="primary">Sign in</MDBBtn>
        </Link>

        <div className="text-center">
        </div>
      </MDBContainer>
    </div>
  );
}