import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import logo from '../assets/logo.png';

export default function VendorRegister() {
  const navigate = useNavigate();

  // form state
  const [formData, setFormData] = useState({
    businessName: '',
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

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/vendor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        alert('Vendor registered successfully!');
        navigate('/vendor-login');
      } else {
        const errData = await response.json();
        setError(errData.message || 'Vendor registration failed');
      }
    } catch (err) {
      console.error('Error registering vendor:', err);
      setError('Server connection error');
    }
  };

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

        {/* Registration Form */}
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <MDBInput
            wrapperClass="mb-3"
            label="Business Name"
            id="businessName"
            type="text"
            value={formData.businessName}
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
  );
}