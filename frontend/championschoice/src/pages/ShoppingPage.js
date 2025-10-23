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
  MDBInputGroup,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function ShoppingPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const customer = JSON.parse(localStorage.getItem("customer"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `/api/products/search?query=${query}`
        : `/api/products`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!customer) {
      alert("Please log in first!");
      return;
    }
    try {
      const res = await fetch(
        `/api/cart/add?customerId=${customer.id}&productId=${productId}&quantity=1`,
        { method: "POST" }
      );
      if (res.ok) {
        alert("Item added to cart!");
      } else {
        alert("Error adding item to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
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

          <div style={{ flexGrow: 1, maxWidth: "50%", margin: "0 auto" }}>
            <MDBInputGroup>
              <input
                className="form-control form-control-lg"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MDBBtn color="primary" onClick={() => fetchProducts(searchQuery)}>
                <MDBIcon fas icon="search" />
              </MDBBtn>
            </MDBInputGroup>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/shopping-cart" className="text-reset" style={{ textDecoration: 'none' }}>
              <MDBIcon
                  fas
                  icon="shopping-cart"
                  size="2x"
                  style={{ color: '#0d47a1' }}
              />
              <div style={{ fontSize: '16px', color: '#0d47a1', marginTop: '5px', fontWeight: 'bold' }}>
                Cart
              </div>
            </Link>
          </div>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="py-5">
        {loading ? (
          <p className="text-center text-muted">Loading products...</p>
        ) : (
          <MDBRow>
            {products.map((product) => (
              <MDBCol md="6" lg="4" xl="3" className="mb-4" key={product.id}>
                <MDBCard className="h-100 shadow-3">
                  <MDBCardImage src={product.imageUrl} alt={product.name} style={{ height: "220px", objectFit: "cover" }} />
                  <MDBCardBody className="text-center">
                    <MDBTypography tag="h5" className="fw-bold mb-2">
                      {product.name}
                    </MDBTypography>
                    <p className="text-muted">{product.sport}</p>
                    <p className="small text-muted">{product.description}</p>
                    <MDBTypography tag="h6" className="mb-3 fw-bold">
                      ${product.price}
                    </MDBTypography>
                    <MDBBtn color="primary" size="sm" onClick={() => handleAddToCart(product.id)}>
                      <MDBIcon fas icon="cart-plus" className="me-2" />
                      Add to Cart
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        )}
      </MDBContainer>
    </div>
  );
}