import React, { useState } from "react";
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

export default function VendorDashboard() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Basketball Shoes",
      description: "High-performance sneakers for indoor and outdoor courts.",
      price: 120,
      sport: "Basketball",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
    },
    {
      id: 2,
      name: "Football Helmet",
      description: "Protective gear for football players with shock-absorbing padding.",
      price: 85,
      sport: "Football",
      image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    sport: "",
    image: ""
  });

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const newItem = {
      ...newProduct,
      id: products.length + 1
    };
    setProducts([...products, newItem]);
    setNewProduct({ name: "", description: "", price: "", sport: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#f5f5f5" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-start h-100">
          <MDBCol md="10">
            {/* Dashboard Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                Inventory Manager
              </MDBTypography>
              <MDBIcon fas icon="boxes" size="2x" style={{ color: "#0d47a1" }} />
            </div>

            {/* Add New Product Form */}
            <MDBCard className="rounded-3 mb-4">
              <MDBCardBody className="p-4">
                <MDBTypography tag="h5" className="mb-4 text-primary">
                  Add New Product
                </MDBTypography>

                <MDBRow className="mb-3">
                  <MDBCol md="6">
                    <MDBInput
                      label="Product Name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      label="Sport"
                      name="sport"
                      value={newProduct.sport}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="mb-3">
                  <MDBCol md="8">
                    <MDBTextArea
                      label="Description"
                      name="description"
                      rows={2}
                      value={newProduct.description}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                  <MDBCol md="4">
                    <MDBInput
                      label="Price ($)"
                      name="price"
                      type="number"
                      value={newProduct.price}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <MDBInput
                      label="Image URL"
                      name="image"
                      value={newProduct.image}
                      onChange={handleInputChange}
                    />
                  </MDBCol>
                </MDBRow>

                <div className="text-end mt-4">
                  <MDBBtn color="success" onClick={handleAddProduct}>
                    <MDBIcon fas icon="plus" className="me-2" /> Add Product
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            {/* Product List */}
            {products.map((product) => (
              <MDBCard className="rounded-3 mb-4" key={product.id}>
                <MDBCardBody className="p-4">
                  <MDBRow className="align-items-center">
                    <MDBCol md="2" lg="2" xl="2">
                      <MDBCardImage
                        className="rounded-3"
                        fluid
                        src={product.image}
                        alt={product.name}
                      />
                    </MDBCol>
                    <MDBCol md="4" lg="4" xl="4">
                      <p className="lead fw-bold mb-1">{product.name}</p>
                      <p className="text-muted mb-1">{product.sport}</p>
                      <p style={{ fontSize: "0.9rem" }}>{product.description}</p>
                    </MDBCol>
                    <MDBCol md="2" lg="2" xl="2">
                      <MDBTypography tag="h6" className="mb-0">
                        ${product.price}
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol md="4" lg="4" xl="4" className="text-end">
                      <MDBBtn color="info" outline className="me-2">
                        <MDBIcon fas icon="pen" /> Edit
                      </MDBBtn>
                      <MDBBtn color="danger" outline onClick={() => handleDelete(product.id)}>
                        <MDBIcon fas icon="trash" /> Delete
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            ))}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
