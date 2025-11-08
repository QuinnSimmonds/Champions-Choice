import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import {
  MDBContainer,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import logo from '../assets/logo.png';
import { useAuth } from "../context/AuthContext";

export default function VendorLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/vendor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();

        login({
          id: data.id,
          username: data.username,
          role: "vendor"
        });

        navigate('/inventory-manager');
      } else {
        const errData = await response.json();
        setError(errData.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
        <MDBContainer fluid className="px-4">
          <MDBNavbarBrand>
            <Link to="/" style={{ textDecoration: "none", color: "#0d47a1" }}>
              <img src={logo} alt="Logo" style={{ width: "50px", marginRight: "10px" }} />
              <strong>Champion’s Choice</strong>
            </Link>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>

      <div style={{
        background: 'linear-gradient(180deg, #e3f2fd, #bbdefb)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <MDBContainer className="p-4 shadow-3 rounded" style={{ backgroundColor: 'white', maxWidth: '450px' }}>
          <img src={logo} alt="Champion's Choice Logo" style={{ width: '120px', marginBottom: '15px' }} />
          <h3 className="fw-bold mb-4 text-primary text-center">Vendor Login</h3>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <MDBInput wrapperClass="mb-3" label="Username" id="username" value={formData.username} onChange={handleChange} />
            <MDBInput wrapperClass="mb-3" label="Password" id="password" type="password" value={formData.password} onChange={handleChange} />

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            <MDBBtn type="submit" className="mb-4 w-100" color="primary">Sign in</MDBBtn>

            <p className="text-center">
              Don't have an account? <Link to="/vendor-register">Register here</Link>
            </p>
          </form>
        </MDBContainer>
      </div>
    </>
  );
}