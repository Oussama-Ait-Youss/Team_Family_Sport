import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import SessionCard from '../components/coach/SessionCard';
import RollCallInterface from '../components/coach/RollCallInterface';

const CoachDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/sessions');
        setSessions(response.data.data || response.data);
      } catch (err) {
        setError("Impossible de charger vos séances.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role?.name === 'coach' || user?.role === 'coach' || user?.role_id === 2) {
      fetchSessions();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;
  
  const isCoach = user.role?.name === 'coach' || user.role === 'coach' || user.role_id === 2;
  if (!isCoach) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-zinc-200 w-full max-w-sm">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <p className="text-zinc-800 font-bold text-lg mb-2">Accès non autorisé</p>
          <p className="text-zinc-500 mb-6 text-sm">Vous n'avez pas les droits d'entraîneur pour accéder à cette page.</p>
          <button onClick={logout} className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium rounded-lg transition-colors">
            Déconnexion
          </button>
        </div>
      </div>
    );
  }

  // Affichage de l'interface d'appel si une séance est sélectionnée
  if (selectedSession) {
    return (
      <RollCallInterface 
        session={selectedSession} 
        onBack={() => setSelectedSession(null)} 
        onSuccess={() => {
          // Mise à jour de l'état local pour indiquer que l'appel est terminé
          setSessions(prev => prev.map(s => 
            s.id === selectedSession.id ? { ...s, attendance_completed: true } : s
          ));
          setSelectedSession(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans pb-6">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10 border-b border-zinc-200">
        <div className="px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-zinc-800">Mes Séances</h1>
            <p className="text-xs text-zinc-500">Coach {user.name || user.first_name}</p>
          </div>
          <button onClick={logout} className="text-zinc-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm flex items-start space-x-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-zinc-300">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p className="text-zinc-600 font-medium">Aucune séance prévue</p>
            <p className="text-zinc-400 text-sm mt-1">Vous n'avez pas de séances programmées.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Aujourd'hui & À venir</h2>
            {sessions.map(session => (
              <SessionCard 
                key={session.id} 
                session={session} 
                onClick={() => setSelectedSession(session)} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CoachDashboard;
