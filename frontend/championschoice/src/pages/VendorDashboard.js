import React from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBBtn, MDBIcon,
    MDBContainer, MDBTypography, MDBRow, MDBCol, MDBCard, MDBCardBody
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function VendorDashboard() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isLoggedIn = !!token;

    // redirect if user is NOT a vendor
    if (!isLoggedIn || role !== "VENDOR") {
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
                        <Link to="/vendor-dashboard">
                            <MDBBtn color="primary" size="sm">Dashboard</MDBBtn>
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
                        Vendor Dashboard
                    </MDBTypography>
                    <p className="lead" style={{ color: "#1565c0" }}>
                        Manage your shop, products, and profile
                    </p>
                </MDBContainer>
            </div>

            {/* MAIN CONTENT */}
            <MDBContainer className="py-5">
                <MDBRow className="gy-4">

                    {/* PROFILE */}
                    <MDBCol md="4">
                        <MDBCard className="shadow-3">
                            <MDBCardBody className="text-center">
                                <MDBIcon fas icon="user-circle" size="3x" className="mb-3" style={{ color: "#0d47a1" }} />
                                <MDBTypography tag="h5" className="fw-bold mb-3">Profile</MDBTypography>
                                <Link to="/vendor-profile">
                                    <MDBBtn color="primary">View Profile</MDBBtn>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/* PRODUCT MANAGEMENT */}
                    <MDBCol md="4">
                        <MDBCard className="shadow-3">
                            <MDBCardBody className="text-center">
                                <MDBIcon fas icon="boxes" size="3x" className="mb-3" style={{ color: "#0d47a1" }} />
                                <MDBTypography tag="h5" className="fw-bold mb-3">Products</MDBTypography>
                                <Link to="/inventory-manager">
                                    <MDBBtn color="primary">Manage Products</MDBBtn>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/* SIGN OUT */}
                    <MDBCol md="4">
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
