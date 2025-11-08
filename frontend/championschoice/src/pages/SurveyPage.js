import React, { useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCheckbox,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function SurveyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const sportsList = [
    "Basketball",
    "Football",
    "Baseball",
    "Soccer",
    "Tennis",
    "Volleyball",
    "Golf",
    "Track & Field",
    "Swimming",
    "Hockey",
    "Rugby",
    "Wrestling"
  ];

  const [selectedSports, setSelectedSports] = useState([]);

  const toggleSport = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport)
        ? prev.filter((s) => s !== sport)
        : [...prev, sport]
    );
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Please log in to submit your survey.");
      navigate("/auth");
      return;
    }

    // ✅ You can later send this to your backend
    console.log("User selected sports:", selectedSports);

    alert("Thank you! Your preferences have been saved.");
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* ✅ Unified Header */}
      <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm sticky-top py-3">
        <MDBContainer className="d-flex justify-content-between align-items-center">
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

          <div>
            {user && (
              <>
                <span className="fw-bold me-3 text-primary">
                  {user.username || user.customerName || "Account"}
                </span>
                <MDBBtn color="danger" size="sm" onClick={handleLogout}>
                  Logout
                </MDBBtn>
              </>
            )}
          </div>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="py-5">
        <MDBCard className="shadow-3">
          <MDBCardBody>
            <MDBTypography tag="h3" className="fw-bold text-primary mb-4">
              Sports Preference Survey
            </MDBTypography>

            <MDBTypography className="mb-3">
              Select all the sports you enjoy watching or playing:
            </MDBTypography>

            <div className="mb-4">
              {sportsList.map((sport) => (
                <MDBCheckbox
                  key={sport}
                  label={sport}
                  value={sport}
                  checked={selectedSports.includes(sport)}
                  onChange={() => toggleSport(sport)}
                  className="mb-2"
                />
              ))}
            </div>

            <MDBBtn color="success" size="lg" onClick={handleSubmit}>
              Submit Survey
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}