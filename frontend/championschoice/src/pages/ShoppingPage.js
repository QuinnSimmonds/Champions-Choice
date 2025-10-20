import React, { useState } from "react";
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
  MDBInputGroup,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function ShoppingPage() {
  const [products] = useState([
    {
      id: 1,
      name: "Basketball Shoes",
      description: "High-performance sneakers for indoor and outdoor courts.",
      price: 120,
      sport: "Basketball",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp",
    },
    {
      id: 2,
      name: "Football Helmet",
      description: "Protective gear with shock-absorbing padding.",
      price: 85,
      sport: "Football",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp",
    },
    {
      id: 3,
      name: "Yoga Mat",
      description: "Non-slip mat for yoga, pilates, or stretching routines.",
      price: 30,
      sport: "Yoga",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp",
    },
    {
      id: 4,
      name: "Baseball Bat",
      description: "Lightweight aluminum bat suitable for practice or games.",
      price: 60,
      sport: "Baseball",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp",
    },
    {
      id: 5,
      name: "Soccer Ball",
      description: "Durable training ball for all field conditions.",
      price: 25,
      sport: "Soccer",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp",
    },
    {
      id: 6,
      name: "Tennis Racket",
      description: "Graphite frame racket for enhanced control and power.",
      price: 110,
      sport: "Tennis",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img6.webp",
    },
    {
      id: 7,
      name: "Running Shorts",
      description: "Lightweight, breathable shorts for maximum comfort.",
      price: 40,
      sport: "Running",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img7.webp",
    },
    {
      id: 8,
      name: "Swimming Goggles",
      description: "Anti-fog goggles with UV protection.",
      price: 20,
      sport: "Swimming",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img8.webp",
    },
  ]);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* ---------------- NAVBAR ---------------- */}
      <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
        <MDBContainer fluid className="px-4 d-flex align-items-center justify-content-between">
          {/* Left: Logo */}
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
              <img
                src={logo}
                alt="Champion's Choice Logo"
                style={{ width: "50px", marginRight: "10px" }}
              />
              <strong>Champion’s Choice</strong>
            </Link>
          </MDBNavbarBrand>

          {/* Center: Large Search Bar */}
          <div style={{ flexGrow: 1, maxWidth: "50%", margin: "0 auto" }}>
            <MDBInputGroup className="d-flex align-items-center">
              <input
                className="form-control form-control-lg"
                placeholder="Search products..."
                aria-label="Search"
                type="search"
              />
              <MDBBtn color="primary" style={{ padding: ".75rem 1.5rem" }}>
                <MDBIcon fas icon="search" />
              </MDBBtn>
            </MDBInputGroup>
          </div>

          {/* Right: Cart Icon */}
          <div className="d-flex align-items-center">
            <Link to="/shopping-cart" className="text-reset">
              <MDBIcon fas icon="shopping-cart" size="lg" />
            </Link>
          </div>
        </MDBContainer>
      </MDBNavbar>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <MDBContainer className="py-5">
        <div className="text-center mb-5">
          <MDBTypography tag="h2" className="fw-bold text-primary">
            Shop Champion’s Choice Products
          </MDBTypography>
          <p className="text-muted">
            Browse our collection of premium sporting equipment.
          </p>
        </div>

        <MDBRow>
          {products.map((product) => (
            <MDBCol md="6" lg="4" xl="3" className="mb-4" key={product.id}>
              <MDBCard className="h-100 shadow-3">
                <MDBCardImage
                  src={product.image}
                  position="top"
                  alt={product.name}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <MDBCardBody className="text-center d-flex flex-column justify-content-between">
                  <div>
                    <MDBTypography tag="h5" className="fw-bold mb-2">
                      {product.name}
                    </MDBTypography>
                    <p className="text-muted mb-1">{product.sport}</p>
                    <p className="small text-muted">{product.description}</p>
                  </div>

                  <div>
                    <MDBTypography tag="h6" className="mb-3 fw-bold">
                      ${product.price}
                    </MDBTypography>
                    <div className="d-flex justify-content-center gap-2">
                      <MDBBtn color="primary" size="sm">
                        <MDBIcon fas icon="cart-plus" className="me-2" />
                        Add to Cart
                      </MDBBtn>
                      <MDBBtn outline color="primary" size="sm">
                        <MDBIcon fas icon="info-circle" className="me-2" />
                        Details
                      </MDBBtn>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}