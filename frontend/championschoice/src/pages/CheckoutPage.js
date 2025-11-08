import React, { useEffect, useState, useCallback } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTypography,
  MDBBtn,
  MDBNavbar,
  MDBNavbarBrand,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  const total = cart
    .reduce(
      (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
      0
    )
    .toFixed(2);

  // ✅ FIXED — wrapped in useCallback
  const fetchCart = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/cart/${user.id}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  }, [user]);

  // ✅ FIXED — includes all real dependencies
  useEffect(() => {
    if (!user || user.role !== "customer") {
      navigate("/customer-login");
      return;
    }

    fetchCart();
  }, [user, navigate, fetchCart]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handlePlaceOrder = async () => {
    if (!form.fullName || !form.address || !form.cardNumber) {
      alert("Please fill in required fields before placing your order.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/orders/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: user.id,
          shippingInfo: form,
          cartItems: cart,
          total,
        }),
      });

      if (res.ok) {
        alert("Order placed successfully!");
        navigate("/");
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const displayName =
    user?.customerName || user?.username || user?.email || "Account";

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* ✅ HEADER */}
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

          <div className="d-flex align-items-center gap-3">
            <span className="fw-bold text-primary">{displayName}</span>
            <MDBBtn color="danger" size="sm" onClick={handleLogout}>
              <MDBIcon fas icon="sign-out-alt" className="me-2" />
              Logout
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBNavbar>

      {/* ✅ CONTENT */}
      <MDBContainer className="py-5">
        <MDBTypography tag="h2" className="fw-bold mb-4 text-primary">
          Checkout
        </MDBTypography>

        <MDBRow>
          {/* ✅ LEFT — FORM */}
          <MDBCol md="7">
            <MDBCard className="mb-4 shadow-3">
              <MDBCardBody>
                <MDBTypography tag="h5" className="fw-bold mb-3 text-primary">
                  Shipping Information
                </MDBTypography>

                <MDBInput
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="mb-3"
                  required
                />
                <MDBInput
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mb-3"
                  required
                />

                <MDBRow className="mb-3">
                  <MDBCol md="6">
                    <MDBInput
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput
                      label="State"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                    />
                  </MDBCol>

                  <MDBCol md="3">
                    <MDBInput
                      label="ZIP"
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBTypography tag="h5" className="fw-bold mb-3 text-primary">
                  Payment Information
                </MDBTypography>

                <MDBInput
                  label="Card Number"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className="mb-3"
                />

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      label="Expiration Date (MM/YY)"
                      name="expDate"
                      value={form.expDate}
                      onChange={handleChange}
                      className="mb-3"
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      label="CVV"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      className="mb-3"
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* ✅ RIGHT — ORDER SUMMARY */}
          <MDBCol md="5">
            <MDBCard className="shadow-3">
              <MDBCardBody>
                <MDBTypography tag="h5" className="fw-bold mb-3 text-primary">
                  Order Summary
                </MDBTypography>

                {cart.length === 0 ? (
                  <p className="text-muted">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <span>
                        {item.product?.name} × {item.quantity}
                      </span>
                      <strong>
                        ${(item.product?.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  ))
                )}

                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>${total}</strong>
                </div>

                <MDBBtn
                  color="success"
                  block
                  className="mt-4"
                  disabled={loading || cart.length === 0}
                  onClick={handlePlaceOrder}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}