import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ Must be logged in
export function RequireAuth({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
}

// ✅ Customer-only
export function CustomerOnly({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/customer-login" replace />;
  if (user.role !== "customer") return <Navigate to="/" replace />;
  return children;
}

// ✅ Vendor-only
export function VendorOnly({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/vendor-login" replace />;
  if (user.role !== "vendor") return <Navigate to="/" replace />;
  return children;
}