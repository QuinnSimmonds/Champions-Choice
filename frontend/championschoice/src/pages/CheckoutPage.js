import React, { useEffect, useState } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBContainer,
    MDBBtn, MDBTypography, MDBInput,
    MDBCard, MDBCardBody, MDBRow, MDBCol
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function CheckoutPage() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const customerId = localStorage.getItem("userId");

    const isLoggedIn = !!token;

    // Redirect if not customer
    useEffect(() => {
        if (!isLoggedIn || role !== "CUSTOMER") {
            navigate("/");
        }
    }, [isLoggedIn, role, navigate]);

    // Cart
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await fetch(`/api/cart/${customerId}`);
                const data = await res.json();
                setCart(data);
            } catch (err) {
                console.error("Error loading cart:", err);
            }
        };
        loadCart();
    }, [customerId]);

    // ADDRESS FIELDS
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        zip: ""
    });

    // PAYMENT FIELDS
    const [payment, setPayment] = useState({
        cardNumber: "",
        expiration: "",
        cvv: ""
    });

    const [message, setMessage] = useState("");

    // Calculate total
    const total = cart
        .reduce(
            (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
            0
        )
        .toFixed(2);

    const placeOrder = async () => {
        // Validate address
        if (
            !address.firstName ||
            !address.lastName ||
            !address.street ||
            !address.city ||
            !address.zip
        ) {
            alert("Please fill in all address fields.");
            return;
        }

        // Validate payment info
        if (!payment.cardNumber || !payment.expiration || !payment.cvv) {
            alert("Please fill in all payment fields.");
            return;
        }

        try {
            const response = await fetch(`/api/orders/place/${customerId}`, {
                method: "POST"
            });

            if (!response.ok) {
                alert("Failed to place order. Please try again.");
                return;
            }

            const order = await response.json();
            console.log("✅ Order created:", order);

            setMessage("Order Placed Successfully!");

            setTimeout(() => {
                navigate("/orders");
            }, 2000);

        } catch (err) {
            console.error("Error placing order:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

            {/* NAVBAR */}
            <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
                <MDBContainer fluid className="px-4 d-flex justify-content-between">

                    <MDBNavbarBrand>
                        <Link to="/" style={{ textDecoration: "none", color: "#0d47a1", display: "flex" }}>
                            <img src={logo} alt="Logo" style={{ width: "50px", marginRight: "10px" }} />
                            <strong>Champion’s Choice</strong>
                        </Link>
                    </MDBNavbarBrand>

                    <div className="d-flex gap-3">
                        <Link to="/customer-dashboard">
                            <MDBBtn size="sm" color="primary">Dashboard</MDBBtn>
                        </Link>
                        <Link to="/shopping-cart">
                            <MDBBtn size="sm" color="secondary">Cart</MDBBtn>
                        </Link>
                    </div>

                </MDBContainer>
            </MDBNavbar>

            {/* HEADER */}
            <div style={{
                background: "linear-gradient(180deg, #e3f2fd, #bbdefb)",
                padding: "50px 0",
                textAlign: "center"
            }}>
                <MDBContainer>
                    <img src={logo} alt="Logo" style={{ width: "120px" }} />
                    <MDBTypography tag="h2" className="fw-bold mt-3" style={{ color: "#0d47a1" }}>
                        Checkout
                    </MDBTypography>
                </MDBContainer>
            </div>

            {/* BODY */}
            <MDBContainer className="py-5">
                <MDBRow className="g-4">

                    {/* LEFT: Checkout Form */}
                    <MDBCol md="7">
                        <MDBCard className="shadow-3">
                            <MDBCardBody>

                                {/* DELIVERY ADDRESS */}
                                <MDBTypography tag="h5" className="fw-bold mb-4" style={{ color: "#0d47a1" }}>
                                    Delivery Address
                                </MDBTypography>

                                <MDBRow className="mb-3">
                                    <MDBCol md="6">
                                        <MDBInput
                                            label="First Name"
                                            value={address.firstName}
                                            onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                                        />
                                    </MDBCol>

                                    <MDBCol md="6">
                                        <MDBInput
                                            label="Last Name"
                                            value={address.lastName}
                                            onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBInput
                                    label="Street Address"
                                    className="mb-3"
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                />

                                <MDBRow>
                                    <MDBCol md="8">
                                        <MDBInput
                                            label="City"
                                            className="mb-3"
                                            value={address.city}
                                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                        />
                                    </MDBCol>

                                    <MDBCol md="4">
                                        <MDBInput
                                            label="Zip Code"
                                            className="mb-3"
                                            value={address.zip}
                                            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                {/* PAYMENT INFORMATION */}
                                <MDBTypography tag="h5" className="fw-bold mt-4 mb-3" style={{ color: "#0d47a1" }}>
                                    Payment Information
                                </MDBTypography>

                                <MDBInput
                                    label="Card Number"
                                    className="mb-3"
                                    value={payment.cardNumber}
                                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                                />

                                <MDBRow className="mb-3">
                                    <MDBCol md="6">
                                        <MDBInput
                                            label="Expiration Date (MM/YY)"
                                            value={payment.expiration}
                                            onChange={(e) => setPayment({ ...payment, expiration: e.target.value })}
                                        />
                                    </MDBCol>

                                    <MDBCol md="6">
                                        <MDBInput
                                            label="CVV"
                                            value={payment.cvv}
                                            onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <div className="text-end mt-4">
                                    <MDBBtn color="success" size="lg" onClick={placeOrder}>
                                        Place Order
                                    </MDBBtn>
                                </div>

                            </MDBCardBody>
                        </MDBCard>

                        {message && (
                            <MDBTypography
                                tag="h4"
                                className="fw-bold text-center mt-4"
                                style={{ color: "green" }}
                            >
                                {message}
                            </MDBTypography>
                        )}
                    </MDBCol>

                    {/* RIGHT: Summary */}
                    <MDBCol md="5">
                        <MDBCard className="shadow-3">
                            <MDBCardBody>
                                <MDBTypography tag="h5" className="fw-bold mb-4" style={{ color: "#0d47a1" }}>
                                    Order Summary
                                </MDBTypography>

                                {cart.length === 0 ? (
                                    <p className="text-muted">Your cart is empty.</p>
                                ) : (
                                    cart.map((item) => (
                                        <div className="d-flex justify-content-between mb-2" key={item.id}>
                                            <span>{item.product?.name} (x{item.quantity})</span>
                                            <span>${(item.product?.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))
                                )}

                                <hr />

                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Total:</span>
                                    <span>${total}</span>
                                </div>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        </div>
    );
}
