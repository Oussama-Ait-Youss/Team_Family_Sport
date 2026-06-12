import React from 'react';

const PendingUsersList = ({ pendingUsers, handleStatusUpdate }) => {
  if (!pendingUsers || pendingUsers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[12rem] text-zinc-500 bg-zinc-50/50 rounded-lg border border-dashed border-zinc-200">
        Aucun utilisateur en attente de validation.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-200">
          <tr>
            <th className="px-4 py-3">Utilisateur</th>
            <th className="px-4 py-3">Rôle & Discipline</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user) => (
            <tr key={user.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-medium text-zinc-900">{user.name}</div>
                <div className="text-zinc-500 text-xs">{user.email}</div>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-zinc-200 text-zinc-800 rounded-full mr-2">
                  {user.role?.name || user.role || 'N/A'}
                </span>
                {user.discipline?.name && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1 lg:mt-0">
                    {user.discipline.name}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(user.id, 'active')}
                    className="px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-md font-medium transition-colors"
                  >
                    Approuver
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(user.id, 'rejected')}
                    className="px-3 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-md font-medium transition-colors"
                  >
                    Rejeter
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingUsersList;
