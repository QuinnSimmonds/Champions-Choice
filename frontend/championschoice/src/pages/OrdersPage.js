import React, { useEffect, useState } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBContainer,
    MDBCard, MDBCardBody, MDBTypography,
    MDBBtn
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function OrdersPage() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const customerId = localStorage.getItem("userId");

    const isLoggedIn = !!token;

    // redirect if not customer
    useEffect(() => {
        if (!isLoggedIn || role !== "CUSTOMER") {
            navigate("/");
        }
    }, [isLoggedIn, role, navigate]);

    const [orders, setOrders] = useState([]);

    // load orders
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const res = await fetch(`/api/orders/customer/${customerId}`);
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error("Error loading orders:", err);
            }
        };
        loadOrders();
    }, [customerId]);

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight:"100vh" }}>

            {/* NAVBAR */}
            <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
                <MDBContainer fluid className="px-4 d-flex justify-content-between">
                    <MDBNavbarBrand>
                        <Link to="/" style={{ textDecoration:"none", color:"#0d47a1", display:"flex" }}>
                            <img src={logo} alt="Logo" style={{ width:"50px", marginRight:"10px" }} />
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
                background:"linear-gradient(180deg, #e3f2fd, #bbdefb)",
                padding:"50px 0",
                textAlign:"center"
            }}>
                <MDBContainer>
                    <img src={logo} alt="Logo" style={{ width:"120px" }} />
                    <MDBTypography tag="h2" className="fw-bold mt-3" style={{ color:"#0d47a1" }}>
                        Order History
                    </MDBTypography>
                </MDBContainer>
            </div>

            {/* BODY */}
            <MDBContainer className="py-5">

                {orders.length === 0 ? (
                    <p className="text-muted">You have no orders yet.</p>
                ) : (
                    orders.map((order) => (
                        <MDBCard className="mb-4 shadow-3" key={order.id}>
                            <MDBCardBody>
                                <MDBTypography tag="h5" className="fw-bold" style={{ color:"#0d47a1" }}>
                                    Order #{order.id}
                                </MDBTypography>
                                <p className="text-muted mb-2">Placed: {order.createdAt}</p>

                                <ul>
                                    {order.items.map((item) => (
                                        <li key={item.id}>
                                            {item.product.name} — {item.quantity} × ${item.price}
                                        </li>
                                    ))}
                                </ul>

                                <hr />

                                <MDBTypography tag="h6" className="fw-bold">
                                    Total: ${order.totalPrice}
                                </MDBTypography>
                            </MDBCardBody>
                        </MDBCard>
                    ))
                )}

            </MDBContainer>

        </div>
    );
}
