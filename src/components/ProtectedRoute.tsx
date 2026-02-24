import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;