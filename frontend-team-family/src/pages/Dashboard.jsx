import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Activity } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* SIDEBAR */}
            <aside className="w-64 bg-slate-900 text-white flex-col hidden md:flex">
                <div className="h-16 flex items-center justify-center border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-wider flex items-center">
                        <span className="text-red-500 mr-2">🥋</span> TFS
                    </h1>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <a href="#" className="flex items-center px-4 py-3 bg-red-600 text-white rounded-xl">
                        <LayoutDashboard className="w-5 h-5 mr-3" /> Tableau de bord
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl">
                        <Users className="w-5 h-5 mr-3" /> Membres
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl">
                        <Calendar className="w-5 h-5 mr-3" /> Planning
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl">
                        <Settings className="w-5 h-5 mr-3" /> Paramètres
                    </a>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button onClick={logout} className="flex items-center w-full px-4 py-3 text-slate-300 hover:bg-red-600 hover:text-white rounded-xl transition-colors">
                        <LogOut className="w-5 h-5 mr-3" /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* HEADER */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 z-10">
                    <h2 className="text-xl font-semibold text-gray-800">Vue d'ensemble</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600">
                            Bonjour, <span className="text-red-600 font-bold">{user?.name || 'Sensei'}</span>
                        </span>
                        <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold border-2 border-red-500">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                    </div>
                </header>

                {/* WIDGETS */}
                <div className="flex-1 overflow-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl mr-4"><Users className="w-8 h-8" /></div>
                            <div><p className="text-sm text-gray-500">Total Élèves</p><p className="text-2xl font-bold">142</p></div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mr-4"><Calendar className="w-8 h-8" /></div>
                            <div><p className="text-sm text-gray-500">Prochain Cours</p><p className="text-xl font-bold">17:30 - Karaté</p></div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
                            <div className="p-4 bg-green-50 text-green-600 rounded-xl mr-4"><Activity className="w-8 h-8" /></div>
                            <div><p className="text-sm text-gray-500">Présences du jour</p><p className="text-2xl font-bold">28</p></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;