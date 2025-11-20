import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import {
  MDBContainer,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import logo from '../assets/logo.png';

export default function CustomerRegister() {
  const navigate = useNavigate();

  // state variables
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

// password validation helper
  const isValidPassword = (password) => {
    // Check minimum length
    if (password.length < 8) return false;
    
    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) return false;
    
    // Check for lowercase letter
    if (!/[a-z]/.test(password)) return false;
    
    // Check for number
    if (!/\d/.test(password)) return false;
    
    // Check for special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;
    
    return true;  };

  // handle register submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidPassword(formData.password)) {
      setError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // proxy handles forwarding to http://localhost:8080
      const response = await fetch(`/api/customer/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        navigate('/customer-login'); // redirect on success
      } else {
        const errData = await response.json();
        setError(errData.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error registering user:', err);
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
          <img
            src={logo}
            alt="Champion's Choice Logo"
            style={{ width: '120px', height: 'auto', marginBottom: '15px' }}
          />
          <h3 className="fw-bold mb-4 text-primary text-center">
            Customer Registration
          </h3>

          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-3"
              label="First Name"
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-3"
              label="Last Name"
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
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
              label="Email address"
              id="email"
              type="email"
              value={formData.email}
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
            <MDBInput
              wrapperClass="mb-3"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {error && (
              <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}

            <MDBBtn type="submit" className="mb-4 w-100" color="primary">
              Register
            </MDBBtn>
          </form>
        </MDBContainer>
      </div>
    </>
  );
}
