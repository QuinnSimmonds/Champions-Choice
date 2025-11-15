import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import {
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

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // jwt persistence
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const isLoggedIn = !!token;
  const isCustomer = role === "CUSTOMER";

  // Fetch cart items
  const fetchCart = useCallback(async () => {
    if (!isCustomer || !userId) return;
    try {
      const res = await fetch(`/api/cart/${userId}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  }, [isCustomer, userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    await fetch(`/api/cart/${itemId}?quantity=${quantity}&customerId=${userId}`, {
      method: "PUT"
    });
    fetchCart();
  };

  // Remove item
  const removeItem = async (itemId) => {
    await fetch(`/api/cart/${itemId}?customerId=${userId}`, { method: "DELETE" });
    fetchCart();
  };

  // Clear entire cart
  const clearCart = async () => {
    await fetch(`/api/cart/clear/${userId}`, { method: "DELETE" });
    fetchCart();
  };

  // Checkout button (placeholder)
  const handleCheckout = () => {
    console.log("Checkout clicked!");
    // Future: redirect to checkout page or handle order submission
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  ).toFixed(2);

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
        <MDBContainer fluid className="px-4">
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

          <div className="d-flex align-items-center gap-3">

            {/* Not logged in */}
            {!isLoggedIn && (
                <Link to="/auth">
                  <MDBBtn color="primary" size="sm">
                    <MDBIcon fas icon="sign-in-alt" className="me-2" />
                    Sign In / Register
                  </MDBBtn>
                </Link>
            )}

            {/* Customer */}
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

          </div>

        </MDBContainer>
      </MDBNavbar>
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
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      style={{ width: "60px", textAlign: "center" }}
                    />
                  </MDBCol>
                  <MDBCol md="2" className="text-end">
                    <MDBBtn color="danger" outline onClick={() => removeItem(item.id)}>
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

              <MDBBtn color="success" onClick={() => navigate("/checkout")}>
                Checkout
              </MDBBtn>
            </div>
          </div>
        )}
      </MDBContainer>
    </>
  );
}