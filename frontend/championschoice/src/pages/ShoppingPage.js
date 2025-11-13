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
  MDBInput
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function ShoppingPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // FILTER & SORT STATE
  const [selectedSport, setSelectedSport] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");

  // jwt persistence
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const isLoggedIn = !!token;
  const isCustomer = role === "CUSTOMER";

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [products, selectedSport, maxPrice, sortOption]);

  const fetchProducts = async (query = "") => {
    setLoading(true);
    try {
      const url = query
          ? `/api/products/search?query=${query}`
          : `/api/products`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSorting = () => {
    let result = [...products];

    // SPORT FILTER
    if (selectedSport) {
      result = result.filter(
          (p) => p.sport.toLowerCase() === selectedSport.toLowerCase()
      );
    }

    // MAX PRICE FILTER
    if (maxPrice) {
      result = result.filter((p) => Number(p.price) <= Number(maxPrice));
    }

    // SORTING
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(result);
  };

  const handleAddToCart = async (productId) => {
    if (!isCustomer || !userId) {
      alert("Please log in as customer!");
      return;
    }
    try {
      const res = await fetch(
          `/api/cart/add?customerId=${userId}&productId=${productId}&quantity=1`,
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
        {/* NAVBAR */}
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

            {/* Search Bar */}
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

            {/* Auth Buttons */}
            <div className="d-flex align-items-center gap-3">

              {!isLoggedIn && (
                  <Link to="/auth">
                    <MDBBtn color="primary" size="sm">
                      <MDBIcon fas icon="sign-in-alt" className="me-2" />
                      Sign In / Register
                    </MDBBtn>
                  </Link>
              )}

              {isLoggedIn && role === "CUSTOMER" && (
                  <>
                    <Link to="/customer-dashboard">
                      <MDBBtn color="primary" size="sm">Dashboard</MDBBtn>
                    </Link>

                    <Link to="/shopping-cart">
                      <MDBBtn color="secondary" size="sm">Cart</MDBBtn>
                    </Link>
                  </>
              )}

              {isLoggedIn && role === "VENDOR" && (
                  <Link to="/vendor-dashboard">
                    <MDBBtn color="primary" size="sm">Dashboard</MDBBtn>
                  </Link>
              )}

            </div>
          </MDBContainer>
        </MDBNavbar>

        <MDBContainer className="py-4">

          {/* FILTERS + SORT */}
          <MDBCard className="mb-4 p-3 shadow-3">
            <MDBRow className="gy-3">

              {/* Filter by Sport */}
              <MDBCol md="4">
                <MDBInput
                    label="Filter by Sport"
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                />
              </MDBCol>

              {/* Filter by Max Price */}
              <MDBCol md="4">
                <MDBInput
                    type="number"
                    label="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
              </MDBCol>

              {/* Sort Dropdown */}
              <MDBCol md="4">
                <select
                    className="form-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="name-asc">Name: A → Z</option>
                  <option value="name-desc">Name: Z → A</option>
                </select>
              </MDBCol>

            </MDBRow>
          </MDBCard>

          {/* PRODUCT GRID */}
          {loading ? (
              <p className="text-center text-muted">Loading products...</p>
          ) : (
              <MDBRow>
                {filteredProducts.map((product) => (
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
