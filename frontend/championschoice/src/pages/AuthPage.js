import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';
import logo from '../assets/logo.png';

export default function AuthPage() {
    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Navigation Bar with Home Link */}
            <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm py-3">
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

            {/* Main Content */}
            <div
                style={{
                    background: 'linear-gradient(180deg, #e3f2fd, #bbdefb)',
                    minHeight: 'calc(100vh - 70px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 20px'
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
        </div>
    );
}