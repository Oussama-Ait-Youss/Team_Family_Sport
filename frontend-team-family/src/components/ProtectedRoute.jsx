import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, token, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (!isLoading && (!token || !user)) {
    return <Navigate to="/login" replace />;
  }

  if (user?.status === 'pending') {
    return <Navigate to="/pending-approval" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
