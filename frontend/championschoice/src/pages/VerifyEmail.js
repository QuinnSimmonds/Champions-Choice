import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import {
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
import logo from '../assets/logo.png';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying your email...');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setMessage('Invalid verification link');
      setStatus('error');
      return;
    }

    // Call backend to verify
    fetch(`/api/customer/verify?token=${token}`)
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setStatus(data.status);
        
        // Update localStorage if user is currently logged in
        if (data.status === 'success') {
          localStorage.setItem('isVerified', 'true');
        }
      })
      .catch(err => {
        console.error('Verification error:', err);
        setMessage('Error verifying email. Please try again.');
        setStatus('error');
      });
  }, [searchParams]);

  return (
    <>
      {/* NAVBAR - Same as your other pages */}
      <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
        <MDBContainer fluid className="px-4">
          <MDBNavbarBrand>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#0d47a1",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="Logo" style={{ width: "50px", marginRight: "10px" }} />
              <strong>Champion's Choice</strong>
            </Link>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>

      {/* MAIN CONTENT - Same gradient background and card structure */}
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
            Email Verification
          </h3>

          {/* Loading State */}
          {status === 'loading' && (
            <p className="text-center">Verifying your email...</p>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <p style={{ color: '#28a745', fontSize: '18px', marginBottom: '20px' }}>
                ✓ {message}
              </p>
              <Link to="/customer-dashboard">
                <MDBBtn className="mb-3 w-100" color="primary">
                  Go to Dashboard
                </MDBBtn>
              </Link>
            </div>
          )}

          {/* Already Verified State */}
          {status === 'already_verified' && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <p style={{ color: '#17a2b8', fontSize: '18px', marginBottom: '20px' }}>
                ✓ {message}
              </p>
              <Link to="/customer-dashboard">
                <MDBBtn className="mb-3 w-100" color="primary">
                  Go to Dashboard
                </MDBBtn>
              </Link>
            </div>
          )}

          {/* Expired State */}
          {status === 'expired' && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <p style={{ color: '#ffc107', fontSize: '18px', marginBottom: '20px' }}>
                ⚠ {message}
              </p>
              <Link to="/customer-register">
                <MDBBtn className="mb-3 w-100" color="primary">
                  Register Again
                </MDBBtn>
              </Link>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <p style={{ color: '#dc3545', fontSize: '18px', marginBottom: '20px' }}>
                ✗ {message}
              </p>
              <Link to="/customer-login">
                <MDBBtn className="mb-3 w-100" color="primary">
                  Back to Login
                </MDBBtn>
              </Link>
            </div>
          )}
        </MDBContainer>
      </div>
    </>
  );
}
