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
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function ShoppingPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Filters
  const [selectedSport, setSelectedSport] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
      setOriginalProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Apply filters and sorting
  useEffect(() => {
    let filtered = [...originalProducts];

    // ✅ Sport Filter
    if (selectedSport !== "All") {
      filtered = filtered.filter((p) => p.sport === selectedSport);
    }

    // ✅ Price Range Filter
    if (minPrice !== "") {
      filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== "") {
      filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // ✅ Sorting
    if (sortOrder === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  }, [selectedSport, sortOrder, minPrice, maxPrice, originalProducts]);

  const handleAddToCart = async (productId) => {
    if (!user || user.role !== "customer") {
      alert("Please log in as a customer first!");
      navigate("/customer-login");
      return;
    }

    try {
      const res = await fetch(
        `/api/cart/add?customerId=${user.id}&productId=${productId}&quantity=1`,
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const displayName =
    user?.customerName ||
    user?.vendorName ||
    user?.username ||
    user?.email ||
    "Account";

  // ✅ Extract unique sports for filter
  const sports = ["All", ...new Set(originalProducts.map((p) => p.sport))];

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* ✅ HEADER */}
      <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
        <MDBContainer fluid className="px-4 d-flex align-items-center justify-content-between">
          <MDBNavbarBrand>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "#0d47a1", display: "flex", alignItems: "center" }}
            >
              <img src={logo} alt="Logo" style={{ width: "50px", marginRight: "10px" }} />
              <strong>Champion’s Choice</strong>
            </Link>
          </MDBNavbarBrand>

          {/* ✅ SEARCH */}
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

          {/* ✅ ACCOUNT + CART */}
          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                <span className="fw-bold text-primary">{displayName}</span>
                <MDBBtn color="danger" size="sm" onClick={handleLogout}>
                  <MDBIcon fas icon="sign-out-alt" className="me-2" />
                  Logout
                </MDBBtn>
              </>
            ) : (
              <Link to="/auth">
                <MDBBtn color="primary" size="sm">
                  <MDBIcon fas icon="sign-in-alt" className="me-2" />
                  Sign In / Register
                </MDBBtn>
              </Link>
            )}

            <Link to="/shopping-cart" className="text-reset" style={{ textDecoration: "none" }}>
              <MDBIcon fas icon="shopping-cart" size="2x" style={{ color: "#0d47a1" }} />
              <div style={{ fontSize: "16px", color: "#0d47a1", marginTop: "5px", fontWeight: "bold" }}>
                Cart
              </div>
            </Link>
          </div>
        </MDBContainer>
      </MDBNavbar>

      {/* ✅ FILTER BAR */}
      <MDBContainer className="mt-4">
        <MDBCard className="p-3 shadow-3">
          <MDBRow className="gy-3">

            {/* ✅ Sport Filter */}
            <MDBCol md="3">
              <label className="fw-bold text-primary mb-2">Filter by Sport</label>
              <select
                className="form-select"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                {sports.map((sport, idx) => (
                  <option key={idx} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </MDBCol>

            {/* ✅ Sort by Price */}
            <MDBCol md="3">
              <label className="fw-bold text-primary mb-2">Sort by Price</label>
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="none">None</option>
                <option value="low-high">Low → High</option>
                <option value="high-low">High → Low</option>
              </select>
            </MDBCol>

            {/* ✅ Price Range */}
            <MDBCol md="3">
              <label className="fw-bold text-primary mb-2">Min Price</label>
              <MDBInput
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </MDBCol>

            <MDBCol md="3">
              <label className="fw-bold text-primary mb-2">Max Price</label>
              <MDBInput
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </MDBCol>

            {/* ✅ Reset Filters */}
            <MDBCol md="12" className="text-end">
              <MDBBtn
                color="secondary"
                size="sm"
                onClick={() => {
                  setSelectedSport("All");
                  setSortOrder("none");
                  setMinPrice("");
                  setMaxPrice("");
                  setProducts(originalProducts);
                }}
              >
                Reset Filters
              </MDBBtn>
            </MDBCol>

          </MDBRow>
        </MDBCard>
      </MDBContainer>

      {/* ✅ PRODUCT GRID */}
      <MDBContainer className="py-5">
        {loading ? (
          <p className="text-center text-muted">Loading products...</p>
        ) : (
          <MDBRow>
            {products.map((product) => (
              <MDBCol md="6" lg="4" xl="3" className="mb-4" key={product.id}>
                <MDBCard className="h-100 shadow-3">

                  <MDBCardImage
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ height: "220px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/fallback.png")}
                  />

                  <MDBCardBody className="text-center">
                    <MDBTypography tag="h5" className="fw-bold mb-2">
                      {product.name}
                    </MDBTypography>
                    <p className="text-muted">{product.sport}</p>
                    <p className="small text-muted">{product.description}</p>
                    <MDBTypography tag="h6" className="mb-3 fw-bold">
                      ${product.price}
                    </MDBTypography>

                    <MDBBtn
                      color="primary"
                      size="sm"
                      onClick={() => handleAddToCart(product.id)}
                    >
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