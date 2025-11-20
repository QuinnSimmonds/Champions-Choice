import React, { useState } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBBtn, MDBIcon,
    MDBContainer, MDBTypography, MDBRow, MDBCol, MDBCard, MDBCardBody
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function CustomerDashboard() {
    const navigate = useNavigate();

    const [showBanner, setShowBanner] = useState(
      localStorage.getItem('isVerified') === 'false'
    );

    // login persistence
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isLoggedIn = !!token;

    // redirect if not customer
    if (!isLoggedIn || role !== "CUSTOMER") {
        navigate("/");
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

            {/* NAVBAR */}
            <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
                <MDBContainer fluid className="px-4 d-flex align-items-center justify-content-between">

                    <MDBNavbarBrand>
                        <Link to="/" style={{ textDecoration: "none", color: "#0d47a1", display: "flex", alignItems: "center" }}>
                            <img src={logo} alt="Logo" style={{ width: "50px", marginRight: "10px" }} />
                            <strong>Champion’s Choice</strong>
                        </Link>
                    </MDBNavbarBrand>

                    <div className="d-flex align-items-center gap-3">
                        <Link to="/customer-dashboard">
                            <MDBBtn color="primary" size="sm">Dashboard</MDBBtn>
                        </Link>
                        <Link to="/shopping-cart">
                            <MDBBtn color="secondary" size="sm">Cart</MDBBtn>
                        </Link>
                    </div>

                </MDBContainer>
            </MDBNavbar>

            {/* HEADER */}
            <div style={{
                background: "linear-gradient(180deg, #e3f2fd, #bbdefb)",
                padding: "60px 0",
                textAlign: "center",
            }}>
                <MDBContainer>
                    <img src={logo} alt="Logo" style={{ width: "150px", marginBottom: "20px" }} />
                    <MDBTypography tag="h2" className="fw-bold mb-3" style={{ color: "#0d47a1" }}>
                        Customer Dashboard
                    </MDBTypography>
                    <p className="lead" style={{ color: "#1565c0" }}>
                        Manage your profile, cart, and shopping experience
                    </p>
                </MDBContainer>
            </div>

            {/* VERIFICATION BANNER */}
            {showBanner && (
              <MDBContainer className="mt-4">
                <div style={{
                  backgroundColor: '#fff3cd',
                  border: '1px solid #ffc107',
                  borderRadius: '5px',
                  padding: '15px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong style={{ color: '#856404' }}>⚠️ Please verify your email</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#856404' }}>
                      Check your inbox for a verification link to activate your account.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBanner(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      fontSize: '24px',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      color: '#856404'
                    }}
                  >
                    ✕
                  </button>
                </div>
              </MDBContainer>
            )}

            {/* MAIN CONTENT */}
            <MDBContainer className="py-5">
                <MDBRow className="gy-4">

                    {/* PROFILE */}
                    <MDBCol md="3">
                        <MDBCard className="shadow-3">
                            <MDBCardBody className="text-center">
                                <MDBIcon fas icon="user-edit" size="3x" className="mb-3" style={{ color: "#0d47a1" }} />
                                <MDBTypography tag="h5" className="fw-bold mb-3">Profile</MDBTypography>
                                <Link to="/customer-profile">
                                    <MDBBtn color="primary">Manage Profile</MDBBtn>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/* ORDERS */}
                    <MDBCol md="3">
                        <MDBCard className="shadow-3">
                            <MDBCardBody className="text-center">
                                <MDBIcon fas icon="receipt" size="3x" className="mb-3" style={{ color: "#0d47a1" }} />
                                <MDBTypography tag="h5" className="fw-bold mb-3">Orders</MDBTypography>
                                <Link to="/orders">
                                    <MDBBtn color="primary">View Orders</MDBBtn>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/* CART */}
                    <MDBCol md="3">
                        <MDBCard className="shadow-3">
                            <MDBCardBody className="text-center">
                                <MDBIcon fas icon="shopping-cart" size="3x" className="mb-3" style={{ color: "#0d47a1" }} />
                                <MDBTypography tag="h5" className="fw-bold mb-3">Cart</MDBTypography>
                                <Link to="/shopping-cart">
                                    <MDBBtn color="primary">View Cart</MDBBtn>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/* SHOPPING PAGE */}
                    <MDBCol md="3">
                        <MDBCard className="shadow-3">
                            <MDBCardBody className="text-center">
                                <MDBIcon fas icon="shopping-bag" size="3x" className="mb-3" style={{ color: "#0d47a1" }} />
                                <MDBTypography tag="h5" className="fw-bold mb-3">Shop</MDBTypography>
                                <Link to="/shopping-page">
                                    <MDBBtn color="primary">Start Shopping</MDBBtn>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/* SIGN OUT */}
                    <MDBCol md="3">
                        <MDBCard className="shadow-3">
                            <MDBCardBody className="text-center">
                                <MDBIcon fas icon="sign-out-alt" size="3x" className="mb-3" style={{ color: "#d32f2f" }} />
                                <MDBTypography tag="h5" className="fw-bold mb-3">Sign Out</MDBTypography>
                                <MDBBtn color="danger" onClick={handleLogout}>Logout</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        </div>
    );
}
