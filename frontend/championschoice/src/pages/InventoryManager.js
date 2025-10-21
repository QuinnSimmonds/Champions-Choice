import React, { useEffect, useState, useCallback } from "react";
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

export default function InventoryManager() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    sport: "",
    image: ""
  });

  const vendor = JSON.parse(localStorage.getItem("vendor"));

  // Fetch vendor products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`/api/products/vendor/${vendor.id}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching vendor products:", err);
    }
  }, [vendor.id]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle form changes
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Add new product
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    try {
      await fetch(`/api/products/vendor/${vendor.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });
      setNewProduct({ name: "", description: "", price: "", sport: "", image: "" });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await fetch(`/api/products/${id}/vendor/${vendor.id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
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

          <MDBInput label="Image URL" name="image" value={newProduct.image} onChange={handleChange} />

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
              <MDBCol md="2">
                <MDBCardImage src={product.image} alt={product.name} fluid />
              </MDBCol>
              <MDBCol md="6">
                <p className="fw-bold mb-1">{product.name}</p>
                <p className="text-muted mb-1">{product.sport}</p>
                <p>{product.description}</p>
              </MDBCol>
              <MDBCol md="2">
                <p className="fw-bold">${product.price}</p>
              </MDBCol>
              <MDBCol md="2" className="text-end">
                <MDBBtn color="danger" outline onClick={() => deleteProduct(product.id)}>
                  <MDBIcon fas icon="trash" /> Delete
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      ))}
    </MDBContainer>
  );
}