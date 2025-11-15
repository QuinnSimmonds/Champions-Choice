import React, { useEffect, useState } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBContainer, MDBBtn,
    MDBTypography, MDBInput, MDBCard, MDBCardBody, MDBRow, MDBCol
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function CustomerProfile() {

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    // login persistence
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isLoggedIn = !!token;

    useEffect(() => {
        if (!isLoggedIn || role !== "CUSTOMER") {
            navigate("/");
        }
    }, [isLoggedIn, role, navigate]);

    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: ""
    });

    // Load customer info
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await fetch(`/api/customer/${userId}`);
                const data = await res.json();
                setCustomer({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    username: data.username || "",
                    email: data.email || ""
                });
            } catch (err) {
                console.error("Error loading customer profile:", err);
            }
        };

        fetchCustomer();
    }, [userId]);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const saveProfile = () => {
        alert("Save functionality coming soon...");
    };

    const deleteAccount = () => {
        alert("Delete functionality coming soon...");
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

            {/* NAVBAR */}
            <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
                <MDBContainer fluid className="px-4 d-flex justify-content-between align-items-center">
                    <MDBNavbarBrand>
                        <Link to="/" style={{ textDecoration:"none", color:"#0d47a1", display:"flex" }}>
                            <img src={logo} alt="Logo" style={{ width:"50px", marginRight:"10px" }} />
                            <strong>Champion’s Choice</strong>
                        </Link>
                    </MDBNavbarBrand>

                    <div className="d-flex gap-3">
                        <Link to="/customer-dashboard">
                            <MDBBtn size="sm" color="primary">Dashboard</MDBBtn>
                        </Link>
                        <Link to="/cart">
                            <MDBBtn size="sm" color="secondary">Cart</MDBBtn>
                        </Link>
                    </div>
                </MDBContainer>
            </MDBNavbar>

            {/* HEADER */}
            <div style={{ background:"linear-gradient(180deg, #e3f2fd, #bbdefb)", padding:"50px 0", textAlign:"center" }}>
                <MDBContainer>
                    <img src={logo} alt="Logo" style={{ width:"120px" }} />
                    <MDBTypography tag="h2" className="fw-bold mt-3" style={{ color:"#0d47a1" }}>
                        Customer Profile
                    </MDBTypography>
                </MDBContainer>
            </div>

            {/* BODY */}
            <MDBContainer className="py-5">
                <MDBCard className="shadow-3">
                    <MDBCardBody>

                        <MDBTypography tag="h5" className="fw-bold mb-4" style={{ color:"#0d47a1" }}>
                            Basic Information
                        </MDBTypography>

                        <MDBRow className="mb-3">
                            <MDBCol md="6">
                                <MDBInput label="First Name" name="firstName" value={customer.firstName} onChange={handleChange} />
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBInput label="Last Name" name="lastName" value={customer.lastName} onChange={handleChange} />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol md="6">
                                <MDBInput label="Username" name="username" value={customer.username} onChange={handleChange} />
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBInput label="Email" name="email" value={customer.email} onChange={handleChange} />
                            </MDBCol>
                        </MDBRow>

                    </MDBCardBody>
                </MDBCard>

                {/* BUTTONS */}
                <div className="d-flex justify-content-between mt-4">
                    <MDBBtn color="success" size="lg" onClick={saveProfile}>Save</MDBBtn>
                    <MDBBtn color="danger" size="lg" onClick={deleteAccount}>Delete Account</MDBBtn>
                </div>

            </MDBContainer>
        </div>
    );
}
