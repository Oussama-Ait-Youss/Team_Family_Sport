import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import CoachDashboard from './pages/CoachDashboard';

// Écran de validation en attente
const PendingApproval = () => (
  <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
    <div className="max-w-md w-full bg-zinc-800 border border-yellow-500/30 p-8 rounded-xl shadow-2xl text-center relative z-10">
      <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h2 className="text-xl font-bold text-white mb-3">En attente de validation</h2>
      <p className="text-zinc-400">
        Votre compte est en attente de validation par l'administrateur. Vous recevrez un email dès que votre accès sera activé.
      </p>
      <button 
        onClick={() => { localStorage.removeItem('auth_token'); window.location.href = '/login'; }}
        className="mt-8 px-6 py-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors"
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
          {/* Routes Publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/pending-approval" element={<PendingApproval />} />

          {/* Wrapper pour les Routes Protégées (Utilisateurs Actifs) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/coach/dashboard" element={<CoachDashboard />} />
            {/* Rediriger la racine vers le dashboard par défaut */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
          
          {/* Fallback vers la page de login pour toute URL inconnue */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
