import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBTextArea
} from "mdb-react-ui-kit";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function InventoryManager() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isVendor = user?.role === "vendor";

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    sport: "",
    imageUrl: ""
  });

  // ✅ Edit product state
  const [editProductId, setEditProductId] = useState(null);
  const [editFields, setEditFields] = useState({
    name: "",
    description: "",
    price: "",
    sport: "",
    imageUrl: ""
  });

  // ✅ Fetch vendor products
  const fetchProducts = useCallback(async () => {
    if (!isVendor) return;
    try {
      const res = await fetch(`/api/products/vendor/${user.id}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching vendor products:", err);
    }
  }, [isVendor, user]);

  // ✅ Load products
  useEffect(() => {
    if (isVendor) fetchProducts();
  }, [fetchProducts, isVendor]);

  // ✅ Redirect non-vendors
  useEffect(() => {
    if (!user || user.role !== "vendor") {
      navigate("/vendor-login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const displayName =
    user?.vendorName ||
    user?.customerName ||
    user?.username ||
    "Account";

  // ✅ Input change for NEW PRODUCT
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // ✅ Add product
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;

    try {
      await fetch(`/api/products/vendor/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });

      setNewProduct({
        name: "",
        description: "",
        price: "",
        sport: "",
        imageUrl: ""
      });

      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // ✅ Delete product
  const deleteProduct = async (id) => {
    try {
      await fetch(`/api/products/${id}/vendor/${user.id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // ✅ ---------------------------
  // ✅ EDIT PRODUCT LOGIC
  // ✅ ---------------------------

  const startEditing = (product) => {
    setEditProductId(product.id);
    setEditFields({
      name: product.name,
      description: product.description,
      price: product.price,
      sport: product.sport,
      imageUrl: product.imageUrl
    });
  };

  const handleEditChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const cancelEdit = () => {
    setEditProductId(null);
    setEditFields({});
  };

  const saveProduct = async (id) => {
    try {
      await fetch(`/api/products/${id}/vendor/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFields),
      });

      setEditProductId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // ✅ Unauthorized view
  if (!isVendor) {
    return (
      <MDBContainer className="py-5">
        <h3 className="text-center text-danger">Unauthorized – Vendor access only.</h3>
      </MDBContainer>
    );
  }

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

            <Link
              to="/shopping-cart"
              className="text-reset"
              style={{ textDecoration: "none" }}
            >
              <MDBIcon fas icon="shopping-cart" size="2x" style={{ color: "#0d47a1" }} />
              <div style={{ fontSize: "16px", color: "#0d47a1", marginTop: "5px", fontWeight: "bold" }}>
                Cart
              </div>
            </Link>
          </div>
        </MDBContainer>
      </MDBNavbar>

      {/* ✅ PAGE CONTENT */}
      <MDBContainer className="py-5">
        <MDBTypography tag="h3" className="fw-bold mb-4 text-primary">
          Inventory Manager
        </MDBTypography>

        {/* ✅ Add New Product */}
        <MDBCard className="mb-4">
          <MDBCardBody>
            <MDBTypography tag="h5" className="text-primary mb-3">
              Add New Product
            </MDBTypography>

            <MDBRow className="mb-3">
              <MDBCol md="6">
                <MDBInput label="Product Name" name="name" value={newProduct.name} onChange={handleChange} />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput label="Sport" name="sport" value={newProduct.sport} onChange={handleChange} />
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-3">
              <MDBCol md="8">
                <MDBTextArea label="Description" rows={2} name="description" value={newProduct.description} onChange={handleChange} />
              </MDBCol>
              <MDBCol md="4">
                <MDBInput label="Price ($)" type="number" name="price" value={newProduct.price} onChange={handleChange} />
              </MDBCol>
            </MDBRow>

            <MDBInput label="Image URL" name="imageUrl" value={newProduct.imageUrl} onChange={handleChange} />

            <div className="text-end mt-3">
              <MDBBtn color="success" onClick={addProduct}>
                <MDBIcon fas icon="plus" className="me-2" /> Add Product
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>

        {/* ✅ PRODUCT LIST WITH EDITING */}
        {products.map((product) => (
          <MDBCard className="mb-3" key={product.id}>
            <MDBCardBody>
              <MDBRow className="align-items-center">

                {/* IMAGE */}
                <MDBCol md="2">
                  <MDBCardImage
                    className="rounded-3"
                    fluid
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </MDBCol>

                {/* DETAILS / EDIT MODE */}
                <MDBCol md="6">
                  {editProductId === product.id ? (
                    <>
                      <MDBInput className="mb-2" label="Name" name="name" value={editFields.name} onChange={handleEditChange} />
                      <MDBInput className="mb-2" label="Sport" name="sport" value={editFields.sport} onChange={handleEditChange} />
                      <MDBTextArea className="mb-2" label="Description" rows={2} name="description" value={editFields.description} onChange={handleEditChange} />
                      <MDBInput className="mb-2" label="Price" type="number" name="price" value={editFields.price} onChange={handleEditChange} />
                      <MDBInput className="mb-2" label="Image URL" name="imageUrl" value={editFields.imageUrl} onChange={handleEditChange} />
                    </>
                  ) : (
                    <>
                      <p className="fw-bold mb-1">{product.name}</p>
                      <p className="text-muted mb-1">{product.sport}</p>
                      <p>{product.description}</p>
                    </>
                  )}
                </MDBCol>

                {/* PRICE */}
                <MDBCol md="2">
                  <p className="fw-bold">
                    ${editProductId === product.id ? editFields.price : product.price}
                  </p>
                </MDBCol>

                {/* ACTION BUTTONS */}
                <MDBCol md="2" className="text-end">

                  {editProductId === product.id ? (
                    <>
                      <MDBBtn color="success" size="sm" className="me-2" onClick={() => saveProduct(product.id)}>
                        Save
                      </MDBBtn>
                      <MDBBtn color="secondary" size="sm" onClick={cancelEdit}>
                        Cancel
                      </MDBBtn>
                    </>
                  ) : (
                    <>
                      <MDBBtn
                        color="primary"
                        outline
                        size="sm"
                        className="me-2"
                        onClick={() => startEditing(product)}
                      >
                        <MDBIcon fas icon="edit" /> Edit
                      </MDBBtn>

                      <MDBBtn
                        color="danger"
                        outline
                        size="sm"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <MDBIcon fas icon="trash" /> Delete
                      </MDBBtn>
                    </>
                  )}
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        ))}
      </MDBContainer>
    </div>
  );
}