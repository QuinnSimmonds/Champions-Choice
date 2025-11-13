import React, { useEffect, useState } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBContainer, MDBBtn,
    MDBTypography, MDBInput, MDBCard, MDBCardBody, MDBRow, MDBCol
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function VendorProfile() {

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    // login persistence
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isLoggedIn = !!token;

    // redirect if not a vendor
    useEffect(() => {
        if (!isLoggedIn || role !== "VENDOR") {
            navigate("/");
        }
    }, [isLoggedIn, role, navigate]);

    const [vendor, setVendor] = useState({
        businessName: "",
        email: "",
        username: ""
    });

    // Load vendor info
    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const res = await fetch(`/api/vendor/${userId}`);
                const data = await res.json();
                setVendor({
                    businessName: data.businessName || "",
                    email: data.email || "",
                    username: data.username || ""
                });
            } catch (err) {
                console.error("Error loading vendor profile:", err);
            }
        };

        fetchVendor();
    }, [userId]);

    const handleChange = (e) => {
        setVendor({ ...vendor, [e.target.name]: e.target.value });
    };

    const saveProfile = () => {
        alert("Save functionality coming soon...");
    };

    const deleteAccount = () => {
        alert("Delete functionality coming soon...");
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight:"100vh" }}>

            {/* NAVBAR */}
            <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
                <MDBContainer fluid className="px-4 d-flex justify-content-between align-items-center">
                    <MDBNavbarBrand>
                        <Link
                            to="/"
                            style={{ textDecoration:"none", color:"#0d47a1", display:"flex" }}
                        >
                            <img src={logo} alt="Logo" style={{ width:"50px", marginRight:"10px" }} />
                            <strong>Champion’s Choice</strong>
                        </Link>
                    </MDBNavbarBrand>

                    <div className="d-flex gap-3">
                        <Link to="/vendor-dashboard">
                            <MDBBtn size="sm" color="primary">Dashboard</MDBBtn>
                        </Link>
                    </div>
                </MDBContainer>
            </MDBNavbar>

            {/* HEADER */}
            <div style={{ background:"linear-gradient(180deg, #e3f2fd, #bbdefb)", padding:"50px 0", textAlign:"center" }}>
                <MDBContainer>
                    <img src={logo} alt="Logo" style={{ width:"120px" }} />
                    <MDBTypography tag="h2" className="fw-bold mt-3" style={{ color:"#0d47a1" }}>
                        Vendor Profile
                    </MDBTypography>
                </MDBContainer>
            </div>

            {/* BODY */}
            <MDBContainer className="py-5">
                <MDBCard className="shadow-3">
                    <MDBCardBody>

                        <MDBTypography tag="h5" className="fw-bold mb-4" style={{ color:"#0d47a1" }}>
                            Business Information
                        </MDBTypography>

                        <MDBInput label="Business Name" name="businessName" value={vendor.businessName} onChange={handleChange} className="mb-3" />
                        <MDBInput label="Email" name="email" value={vendor.email} onChange={handleChange} className="mb-3" />
                        <MDBInput label="Username" name="username" value={vendor.username} onChange={handleChange} />

                    </MDBCardBody>
                </MDBCard>

                <div className="d-flex justify-content-between mt-4">
                    <MDBBtn color="success" size="lg" onClick={saveProfile}>Save</MDBBtn>
                    <MDBBtn color="danger" size="lg" onClick={deleteAccount}>Delete Account</MDBBtn>
                </div>
            </MDBContainer>

        </div>
    );
}
