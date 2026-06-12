import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import MetricsCards from '../components/dashboard/MetricsCards';
import PendingUsersList from '../components/dashboard/PendingUsersList';
import OverduePaymentsList from '../components/dashboard/OverduePaymentsList';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dashboardRes, usersRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/admin/users?status=pending')
        ]);
        
        setDashboardData(dashboardRes.data);
        setPendingUsers(usersRes.data.data || usersRes.data);
      } catch (err) {
        setError("Impossible de charger les données du tableau de bord.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role?.name === 'admin' || user?.role === 'admin') {
      fetchDashboardData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role?.name !== 'admin' && user.role !== 'admin') {
     return (
       <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center font-sans">
         <div className="p-8 text-center bg-white shadow-sm rounded-xl border border-zinc-200">
           <p className="text-red-500 font-medium mb-4">Accès non autorisé. Vous n'êtes pas administrateur.</p>
           <button 
             onClick={logout}
             className="px-4 py-2 text-sm font-medium text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors"
           >
             Retour
           </button>
         </div>
       </div>
     );
  }

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      await api.patch(`/admin/users/${userId}/status`, { status: newStatus });
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut", err);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <nav className="bg-white shadow-sm border-b border-zinc-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-zinc-800 tracking-tight">Team Family Sports <span className="text-red-600">Admin</span></span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-zinc-600">{user.name || user.email}</span>
              <button 
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 mb-6">Aperçu de l'Activité</h1>
              <MetricsCards metrics={{
                total_players: dashboardData?.metrics?.total_players || 0,
                total_coaches: dashboardData?.metrics?.total_coaches || 0,
                monthly_revenue: dashboardData?.metrics?.monthly_revenue || 0
              }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50">
                  <h2 className="text-lg font-semibold text-zinc-800">Utilisateurs en Attente</h2>
                </div>
                <div className="p-6 flex-1">
                  <PendingUsersList 
                    pendingUsers={pendingUsers} 
                    handleStatusUpdate={handleStatusUpdate} 
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50">
                  <h2 className="text-lg font-semibold text-zinc-800">Paiements en Retard</h2>
                </div>
                <div className="p-6 flex-1">
                  <OverduePaymentsList 
                    overdueList={dashboardData?.overdue_payments || []} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
