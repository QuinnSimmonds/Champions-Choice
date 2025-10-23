import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
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
  const customer = JSON.parse(localStorage.getItem("customer"));

  // Fetch cart items
  const fetchCart = useCallback(async () => {
    if (!customer) return;
    try {
      const res = await fetch(`/api/cart/${customer.id}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  }, [customer]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    await fetch(`/api/cart/${itemId}?quantity=${quantity}&customerId=${customer.id}`, {
      method: "PUT"
    });
    fetchCart();
  };

  // Remove item
  const removeItem = async (itemId) => {
    await fetch(`/api/cart/${itemId}?customerId=${customer.id}`, { method: "DELETE" });
    fetchCart();
  };

  // Clear entire cart
  const clearCart = async () => {
    await fetch(`/api/cart/clear/${customer.id}`, { method: "DELETE" });
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
  );

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

              <MDBBtn color="success" onClick={handleCheckout}>
                Checkout
              </MDBBtn>
            </div>
          </div>
        )}
      </MDBContainer>
    </>
  );
}