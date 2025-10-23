import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBTypography,
    MDBBtn,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        setLoading(true);
        try {
            // Fetch first 4 products as featured
            const res = await fetch(`/api/products`);
            const data = await res.json();
            setFeaturedProducts(data.slice(0, 4)); // Show only 4 products
        } catch (err) {
            console.error("Error loading featured products:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            {/* Navigation Bar */}
            <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
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

                    <div>
                        <Link to="/auth">
                            <MDBBtn color="primary" size="sm">
                                <MDBIcon fas icon="sign-in-alt" className="me-2" />
                                Sign In / Register
                            </MDBBtn>
                        </Link>
                    </div>
                </MDBContainer>
            </MDBNavbar>

            {/* Hero Section with Big Logo */}
            <div
                style={{
                    background: "linear-gradient(180deg, #e3f2fd, #bbdefb)",
                    padding: "80px 0",
                    textAlign: "center",
                }}
            >
                <MDBContainer>
                    <img
                        src={logo}
                        alt="Champion's Choice Logo"
                        style={{ width: "180px", marginBottom: "20px" }}
                    />
                    <MDBTypography tag="h1" className="display-4 fw-bold mb-3" style={{ color: "#0d47a1" }}>
                        Welcome to Champion's Choice
                    </MDBTypography>
                    <MDBTypography tag="p" className="lead mb-4" style={{ color: "#1565c0", fontSize: "1.3rem" }}>
                        Your ultimate destination for premium sporting goods
                    </MDBTypography>
                    <Link to="/shopping-page">
                        <MDBBtn color="primary" size="lg" className="me-3">
                            <MDBIcon fas icon="shopping-bag" className="me-2" />
                            Shop Now
                        </MDBBtn>
                    </Link>
                    <Link to="/auth">
                        <MDBBtn outline color="primary" size="lg">
                            Get Started
                        </MDBBtn>
                    </Link>
                </MDBContainer>
            </div>

            {/* Featured Products Section */}
            <MDBContainer className="py-5">
                <div className="text-center mb-5">
                    <MDBTypography tag="h2" className="fw-bold mb-2" style={{ color: "#0d47a1" }}>
                        <MDBIcon fas icon="star" className="me-2" style={{ color: "#ffc107" }} />
                        Featured Products
                    </MDBTypography>
                    <p className="text-muted">Check out our top picks for champions</p>
                </div>

                {loading ? (
                    <p className="text-center text-muted">Loading products...</p>
                ) : (
                    <MDBRow>
                        {featuredProducts.map((product) => (
                            <MDBCol md="6" lg="4" xl="3" className="mb-4" key={product.id}>
                                <MDBCard className="h-100 shadow-3">
                                    <MDBCardImage
                                        src={product.imageUrl}
                                        alt={product.name}
                                        style={{ height: "220px", objectFit: "cover" }}
                                    />
                                    <MDBCardBody className="text-center">
                                        <MDBTypography tag="h5" className="fw-bold mb-2">
                                            {product.name}
                                        </MDBTypography>
                                        <p className="text-muted">{product.sport}</p>
                                        <MDBTypography tag="h6" className="mb-3 fw-bold" style={{ color: "#0d47a1" }}>
                                            ${product.price}
                                        </MDBTypography>
                                        <Link to="/shopping-page">
                                            <MDBBtn color="primary" size="sm">
                                                View All Products
                                            </MDBBtn>
                                        </Link>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ))}
                    </MDBRow>
                )}

                <div className="text-center mt-4">
                    <Link to="/shopping-page">
                        <MDBBtn color="primary" size="lg">
                            Browse All Products
                            <MDBIcon fas icon="arrow-right" className="ms-2" />
                        </MDBBtn>
                    </Link>
                </div>
            </MDBContainer>

            {/* Features Section */}
            <div style={{ background: "white", padding: "60px 0" }}>
                <MDBContainer>
                    <MDBRow className="text-center">
                        <MDBCol md="4" className="mb-4">
                            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🏆</div>
                            <MDBTypography tag="h5" className="fw-bold mb-2" style={{ color: "#0d47a1" }}>
                                Premium Quality
                            </MDBTypography>
                            <p className="text-muted">Authentic brands and top-quality sporting goods</p>
                        </MDBCol>
                        <MDBCol md="4" className="mb-4">
                            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🚚</div>
                            <MDBTypography tag="h5" className="fw-bold mb-2" style={{ color: "#0d47a1" }}>
                                Fast Shipping
                            </MDBTypography>
                            <p className="text-muted">Quick delivery on all orders nationwide</p>
                        </MDBCol>
                        <MDBCol md="4" className="mb-4">
                            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>💯</div>
                            <MDBTypography tag="h5" className="fw-bold mb-2" style={{ color: "#0d47a1" }}>
                                Satisfaction Guaranteed
                            </MDBTypography>
                            <p className="text-muted">30-day return policy on all products</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>

            {/* Vendor CTA Section */}
            <div
                style={{
                    background: "linear-gradient(180deg, #bbdefb, #e3f2fd)",
                    padding: "50px 0",
                    textAlign: "center",
                }}
            >
                <MDBContainer>
                    <MDBTypography tag="h3" className="fw-bold mb-3" style={{ color: "#0d47a1" }}>
                        Are you a vendor?
                    </MDBTypography>
                    <p className="lead mb-4" style={{ color: "#1565c0" }}>
                        Join our platform and reach thousands of customers
                    </p>
                    <Link to="/vendor-register">
                        <MDBBtn color="success" size="lg">
                            <MDBIcon fas icon="store" className="me-2" />
                            Vendor Portal
                        </MDBBtn>
                    </Link>
                </MDBContainer>
            </div>
        </div>
    );
}