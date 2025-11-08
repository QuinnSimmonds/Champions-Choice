import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function ShoppingCart() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(async () => {
    if (!user || user.role !== "customer") return;

    try {
      const res = await fetch(`/api/cart/${user.id}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (itemId, quantity) => {
    await fetch(
      `/api/cart/${itemId}?quantity=${quantity}&customerId=${user.id}`,
      { method: "PUT" }
    );
    fetchCart();
  };

  const removeItem = async (itemId) => {
    await fetch(`/api/cart/${itemId}?customerId=${user.id}`, {
      method: "DELETE"
    });
    fetchCart();
  };

  const clearCart = async () => {
    await fetch(`/api/cart/clear/${user.id}`, { method: "DELETE" });
    fetchCart();
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

  const total = cart
    .reduce(
      (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
      0
    )
    .toFixed(2);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

      {/* ✅ UNIFIED HEADER */}
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
                alt="Logo"
                style={{ width: "50px", marginRight: "10px" }}
              />
              <strong>Champion’s Choice</strong>
            </Link>
          </MDBNavbarBrand>

          {/* Right: Account + Cart */}
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

            {/* ✅ Cart button */}
            <Link
              to="/shopping-cart"
              className="text-reset"
              style={{ textDecoration: "none" }}
            >
              <MDBIcon fas icon="shopping-cart" size="2x" style={{ color: "#0d47a1" }} />
              <div
                style={{
                  fontSize: "16px",
                  color: "#0d47a1",
                  marginTop: "5px",
                  fontWeight: "bold",
                }}
              >
                Cart
              </div>
            </Link>

          </div>
        </MDBContainer>
      </MDBNavbar>
      {/* ✅ END HEADER */}

      {/* ✅ CONTENT */}
      <MDBContainer className="py-5">
        <MDBTypography tag="h2" className="fw-bold mb-4 text-primary">
          Shopping Cart
        </MDBTypography>

        {cart.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <MDBCard className="mb-3" key={item.id}>
              <MDBCardBody>
                <MDBRow className="align-items-center">

                  <MDBCol md="6">
                    <p className="fw-bold">{item.product?.name}</p>
                    <p className="text-muted">{item.product?.description}</p>
                  </MDBCol>

                  <MDBCol md="2">
                    <p>${item.product?.price}</p>
                  </MDBCol>

                  <MDBCol md="2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, e.target.value)
                      }
                      style={{ width: "60px", textAlign: "center" }}
                    />
                  </MDBCol>

                  <MDBCol md="2" className="text-end">
                    <MDBBtn
                      color="danger"
                      outline
                      onClick={() => removeItem(item.id)}
                    >
                      <MDBIcon fas icon="trash" />
                    </MDBBtn>
                  </MDBCol>

                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          ))
        )}

        {cart.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-4">

            <MDBTypography tag="h4">Total: ${total}</MDBTypography>

            <div className="d-flex gap-2">
              <MDBBtn color="danger" onClick={clearCart}>
                Clear Cart
              </MDBBtn>

              <MDBBtn
                color="success"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </MDBBtn>
            </div>
          </div>
        )}
      </MDBContainer>
    </div>
  );
}
