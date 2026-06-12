import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, token, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Non authentifié -> redirection login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Authentifié mais en attente -> redirection gateway d'approbation
  if (user.status === 'pending') {
    return <Navigate to="/pending-approval" replace />;
  }

  // Tout est bon, on affiche les routes enfants
  return <Outlet />;
};

export default ProtectedRoute;
