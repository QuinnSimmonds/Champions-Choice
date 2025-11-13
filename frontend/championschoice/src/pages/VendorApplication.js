import React, { useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTypography,
    MDBBtn,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function VendorApplicationPage() {
    const [submitted, setSubmitted] = useState(false);
    const [vendorCode, setVendorCode] = useState("");

    const [form, setForm] = useState({
        businessName: "",
        marketCap: "",
        typeOfSport: "",
        averageRatings: "",
        reputableBlogMentions: "",
        influencerAffiliations: "",
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/vendor/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setVendorCode(data.vendorCode);
        setSubmitted(true);
    }

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

            {/* NAVBAR */}
            <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm py-3">
                <MDBContainer fluid className="px-4 d-flex align-items-center justify-content-between">
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

            {/* HEADER */}
            <div
                style={{
                    background: "linear-gradient(180deg, #e3f2fd, #bbdefb)",
                    padding: "50px 0",
                    textAlign: "center",
                }}
            >
                <MDBContainer>
                    <MDBTypography tag="h2" className="fw-bold mb-2" style={{ color: "#0d47a1" }}>
                        Vendor Application
                    </MDBTypography>
                    <p className="lead mb-4" style={{ color: "#1565c0" }}>
                        Tell us about your brand to get your special vendor registration code
                    </p>
                </MDBContainer>
            </div>

            {/* CONFIRMATION PAGE */}
            {submitted ? (
                <MDBContainer className="py-5">
                    <MDBRow className="justify-content-center">
                        <MDBCol md="8" lg="6">
                            <MDBCard className="shadow-3">
                                <MDBCardBody className="text-center p-4">

                                    <MDBIcon fas icon="check-circle" size="3x" style={{ color: "#2e7d32" }} className="mb-3" />
                                    <MDBTypography tag="h3" className="fw-bold mb-3" style={{ color: "#0d47a1" }}>
                                        Application Approved
                                    </MDBTypography>

                                    <p className="text-muted mb-4">
                                        Your vendor registration code is:
                                    </p>

                                    <MDBTypography tag="h2" className="fw-bold mb-4" style={{ color: "#2e7d32" }}>
                                        {vendorCode}
                                    </MDBTypography>

                                    <p className="text-muted mb-4">
                                        Use this code when signing up on the Vendor Registration page.
                                    </p>

                                    <Link to="/vendor-register">
                                        <MDBBtn color="success" size="lg">
                                            Go to Vendor Registration
                                            <MDBIcon fas icon="arrow-right" className="ms-2" />
                                        </MDBBtn>
                                    </Link>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            ) : (
                /* FORM PAGE */
                <MDBContainer className="py-5">
                    <MDBRow className="justify-content-center">
                        <MDBCol md="8" lg="6">
                            <MDBCard className="shadow-3">
                                <MDBCardBody className="p-4">

                                    <MDBTypography tag="h4" className="fw-bold mb-4 text-center" style={{ color: "#0d47a1" }}>
                                        Vendor Information
                                    </MDBTypography>

                                    <form onSubmit={handleSubmit}>

                                        <label className="fw-bold">Business Name</label>
                                        <input
                                            name="businessName"
                                            value={form.businessName}
                                            onChange={handleChange}
                                            className="form-control mb-3"
                                            placeholder="Enter business name"
                                        />

                                        <label className="fw-bold">Market Cap (Estimate)</label>
                                        <input
                                            name="marketCap"
                                            value={form.marketCap}
                                            onChange={handleChange}
                                            className="form-control mb-3"
                                            placeholder="Estimated market value"
                                        />

                                        <label className="fw-bold">Type of Sport</label>
                                        <input
                                            name="typeOfSport"
                                            value={form.typeOfSport}
                                            onChange={handleChange}
                                            className="form-control mb-3"
                                            placeholder="Basketball, MMA, Soccer, etc."
                                        />

                                        <label className="fw-bold">Average Ratings</label>
                                        <input
                                            name="averageRatings"
                                            value={form.averageRatings}
                                            onChange={handleChange}
                                            className="form-control mb-3"
                                            placeholder="Customer satisfaction rating"
                                        />

                                        <label className="fw-bold">Reputable Blog Mentions</label>
                                        <input
                                            name="reputableBlogMentions"
                                            value={form.reputableBlogMentions}
                                            onChange={handleChange}
                                            className="form-control mb-3"
                                            placeholder="Blogs or media outlets mentioning your brand"
                                        />

                                        <label className="fw-bold">Influencer Affiliations</label>
                                        <input
                                            name="influencerAffiliations"
                                            value={form.influencerAffiliations}
                                            onChange={handleChange}
                                            className="form-control mb-3"
                                            placeholder="Any influencers you work with"
                                        />

                                        <div className="text-center mt-4">
                                            <MDBBtn color="primary" size="lg" type="submit">
                                                Submit Application
                                                <MDBIcon fas icon="paper-plane" className="ms-2" />
                                            </MDBBtn>
                                        </div>

                                    </form>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            )}
        </div>
    );
}
