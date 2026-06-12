import React from 'react';

const MetricsCards = ({ metrics }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-500">Joueurs Actifs</p>
          <p className="text-2xl font-bold text-zinc-900">{metrics.total_players}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-500">Entraîneurs</p>
          <p className="text-2xl font-bold text-zinc-900">{metrics.total_coaches}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-500">Revenus Mensuels</p>
          <p className="text-2xl font-bold text-zinc-900">{formatCurrency(metrics.monthly_revenue)}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCards;
