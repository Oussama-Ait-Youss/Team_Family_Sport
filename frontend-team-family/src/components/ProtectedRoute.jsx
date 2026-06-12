import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, token, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Redirection si non authentifié
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Redirection si compte en attente
  if (user.status === 'pending') {
    return <Navigate to="/pending-approval" replace />;
  }

  // Accès autorisé
  return <Outlet />;
};

export default ProtectedRoute;
