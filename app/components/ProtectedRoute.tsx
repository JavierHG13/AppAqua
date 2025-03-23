
import { useAuth } from "../context/AuthContext";
import { Redirect } from "expo-router";  // Si usas expo-router
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return children;
}
