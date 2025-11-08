import React from "react";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <MDBDropdown>
      <MDBDropdownToggle color="primary">
        {user.username} ▼
      </MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem link onClick={() => navigate("/profile")}>
          Profile
        </MDBDropdownItem>

        <MDBDropdownItem link onClick={handleLogout}>
          Logout
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}