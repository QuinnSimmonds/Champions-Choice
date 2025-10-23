import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBIcon } from "mdb-react-ui-kit";
import {
  MDBContainer,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import logo from '../assets/logo.png';

export default function VendorLogin() {
  const navigate = useNavigate();

  // State for form inputs and error
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/vendor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Vendor login successful:', data);

        // Optionally save vendor info in localStorage
        localStorage.setItem('vendor', JSON.stringify(data));

        navigate('/inventory-manager'); // redirect on success
      } else {
        const errData = await response.json();
        setError(errData.message || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Server connection error');
    }
  };

  return (
    <>
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
              <strong>Champion’s Choice</strong>
            </Link>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
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
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-3"
              label="Username"
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-3"
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}

            <div className="d-flex justify-content-between mx-2 mb-4 w-100">
              <a href="#!">Forgot password?</a>
            </div>

            <MDBBtn type="submit" className="mb-4 w-100" color="primary">
              Sign in
            </MDBBtn>

            <div className="text-center">
              <p>
                Don’t have an account?{' '}
                <Link to="/vendor-register">Register here</Link>
              </p>
            </div>
          </form>
        </MDBContainer>
      </div>
    </>
  );
}