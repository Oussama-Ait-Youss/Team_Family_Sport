import React from 'react';

const OverduePaymentsList = ({ overdueList }) => {
  if (!overdueList || overdueList.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[12rem] text-zinc-500 bg-zinc-50/50 rounded-lg border border-dashed border-zinc-200">
        Aucun paiement en retard.
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-200">
          <tr>
            <th className="px-4 py-3">Joueur</th>
            <th className="px-4 py-3">Date d'échéance</th>
          </tr>
        </thead>
        <tbody>
          {overdueList.map((payment, idx) => (
            <tr key={payment.id || idx} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-medium text-zinc-900">{payment.user?.name || payment.player_name || 'Inconnu'}</div>
                <div className="text-zinc-500 text-xs">{payment.user?.email || payment.player_email || ''}</div>
              </td>
              <td className="px-4 py-3 font-medium text-red-600">
                {payment.next_due_date ? formatDate(payment.next_due_date) : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverduePaymentsList;
