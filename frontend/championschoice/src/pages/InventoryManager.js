import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBTextArea
} from "mdb-react-ui-kit";
import logo from "../assets/logo.png";

export default function InventoryManager() {
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    sport: "",
    imageUrl: ""
  });

  const vendorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = !!token;

  // EDIT MODE STATE
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    description: "",
    price: "",
    sport: "",
    imageUrl: ""
  });

  // redirect non-vendors away
  useEffect(() => {
    if (!isLoggedIn || role !== "VENDOR") {
      window.location.href = "/";
    }
  }, [isLoggedIn, role]);

  // Fetch vendor products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`/api/products/vendor/${vendorId}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching vendor products:", err);
    }
  }, [vendorId]);

  useEffect(() => {
    if (vendorId) {
      fetchProducts();
    }
  }, [fetchProducts, vendorId]);

  // Handle add-product form changes
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Add new product
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    try {
      await fetch(`/api/products/vendor/${vendorId}`, {
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

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await fetch(`/api/products/${id}/vendor/${vendorId}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };


  // EDIT MODE FUNCTIONS
  const startEditing = (product) => {
    setEditingProductId(product.id);
    setEditProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      sport: product.sport,
      imageUrl: product.imageUrl
    });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const updateProduct = async () => {
    try {
      await fetch(`/api/products/${editingProductId}/vendor/${vendorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct)
      });

      setEditingProductId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

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
              <Link to="/vendor-dashboard">
                <MDBBtn color="primary" size="sm">Dashboard</MDBBtn>
              </Link>
            </div>

          </MDBContainer>
        </MDBNavbar>

        <MDBContainer className="py-5">
          <MDBTypography tag="h3" className="fw-bold mb-4 text-primary">
            Inventory Manager
          </MDBTypography>

          {/* Add New Product */}
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
                  <MDBTextArea label="Description" name="description" rows={2} value={newProduct.description} onChange={handleChange} />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput label="Price ($)" name="price" type="number" value={newProduct.price} onChange={handleChange} />
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

          {/* Product List */}
          {products.map((product) => (
              <MDBCard className="mb-3" key={product.id}>
                <MDBCardBody>
                  <MDBRow className="align-items-center">

                    {/* PRODUCT IMAGE */}
                    <MDBCol md="2">
                      <MDBCardImage
                          className="rounded-3"
                          fluid
                          src={product.imageUrl}
                          alt={product.name}
                      />
                    </MDBCol>

                    {/* NORMAL VIEW */}
                    {editingProductId !== product.id ? (
                        <>
                          <MDBCol md="6">
                            <p className="fw-bold mb-1">{product.name}</p>
                            <p className="text-muted mb-1">{product.sport}</p>
                            <p>{product.description}</p>
                          </MDBCol>

                          <MDBCol md="2">
                            <p className="fw-bold">${product.price}</p>
                          </MDBCol>

                          <MDBCol md="2" className="text-end">
                            <MDBBtn color="warning" outline className="me-2" onClick={() => startEditing(product)}>
                              <MDBIcon fas icon="edit" /> Edit
                            </MDBBtn>

                            <MDBBtn color="danger" outline onClick={() => deleteProduct(product.id)}>
                              <MDBIcon fas icon="trash" /> Delete
                            </MDBBtn>
                          </MDBCol>
                        </>
                    ) : (
                        /* EDIT MODE */
                        <>
                          <MDBCol md="10">
                            <MDBRow className="mb-2">
                              <MDBCol md="6">
                                <MDBInput
                                    label="Name"
                                    name="name"
                                    value={editProduct.name}
                                    onChange={handleEditChange}
                                />
                              </MDBCol>
                              <MDBCol md="6">
                                <MDBInput
                                    label="Sport"
                                    name="sport"
                                    value={editProduct.sport}
                                    onChange={handleEditChange}
                                />
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className="mb-2">
                              <MDBCol md="8">
                                <MDBTextArea
                                    label="Description"
                                    name="description"
                                    rows={2}
                                    value={editProduct.description}
                                    onChange={handleEditChange}
                                />
                              </MDBCol>
                              <MDBCol md="4">
                                <MDBInput
                                    label="Price ($)"
                                    name="price"
                                    type="number"
                                    value={editProduct.price}
                                    onChange={handleEditChange}
                                />
                              </MDBCol>
                            </MDBRow>

                            <MDBInput
                                className="mb-2"
                                label="Image URL"
                                name="imageUrl"
                                value={editProduct.imageUrl}
                                onChange={handleEditChange}
                            />
                          </MDBCol>

                          <MDBCol md="2" className="text-end">
                            <MDBBtn color="success" outline className="mb-2" onClick={updateProduct}>
                              <MDBIcon fas icon="check" /> Save
                            </MDBBtn>

                            <MDBBtn color="secondary" outline onClick={() => setEditingProductId(null)}>
                              <MDBIcon fas icon="times" /> Cancel
                            </MDBBtn>
                          </MDBCol>
                        </>
                    )}

                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
          ))}
        </MDBContainer>
      </>
  );
}
