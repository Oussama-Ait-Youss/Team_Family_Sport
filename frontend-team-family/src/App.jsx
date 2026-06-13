import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

// Composant d'attente
const PendingApproval = () => (
  <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4 font-sans">
    <div className="bg-zinc-800 p-8 rounded-xl shadow-xl border border-amber-500/30 text-center max-w-md w-full">
      <div className="w-16 h-16 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h1 className="text-xl font-bold text-white mb-2">En attente d'approbation</h1>
      <p className="text-zinc-400 text-sm mb-6">Votre compte est en cours de vérification par un administrateur. Vous aurez accès très prochainement.</p>
      <button 
        onClick={() => { localStorage.removeItem('auth_token'); window.location.href = '/login'; }}
        className="px-6 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors text-sm font-medium"
      >
        Retour à l'accueil
      </button>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pending-approval" element={<PendingApproval />} />

          {/* Routes protégées */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
