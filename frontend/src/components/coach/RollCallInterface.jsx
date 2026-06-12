import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const RollCallInterface = ({ session, onBack, onSuccess }) => {
  const [attendances, setAttendances] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const players = session.players || session.group?.players || [];

  useEffect(() => {
    if (players && players.length > 0) {
      // Par défaut, tous présents
      const initial = players.map(p => ({
        user_id: p.id,
        status: 'present'
      }));
      setAttendances(initial);
    }
  }, [players]);

  const handleStatusChange = (userId, status) => {
    setAttendances(prev => prev.map(item => 
      item.user_id === userId ? { ...item, status } : item
    ));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.post('/attendances', {
        session_id: session.id,
        attendances: attendances
      });
      // Afficher un message de succès simple puis rediriger
      alert("Appel validé avec succès !");
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'enregistrement de l'appel. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const groupName = session.group?.name || session.group_name || 'Groupe';

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 sticky top-0 z-20 border-b border-zinc-200 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 text-zinc-500 hover:text-zinc-800 transition-colors bg-zinc-50 rounded-full hover:bg-zinc-100 mr-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-zinc-800 leading-tight truncate">Appel: {groupName}</h2>
          <p className="text-xs text-zinc-500">Veuillez pointer les présences</p>
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-3">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm mb-4 border border-red-200">
            {error}
          </div>
        )}

        {players.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-zinc-300">
            <p className="text-zinc-500 font-medium">Aucun joueur dans ce groupe.</p>
          </div>
        ) : (
          players.map(player => {
            const currentStatus = attendances.find(a => a.user_id === player.id)?.status || 'present';
            
            return (
              <div key={player.id} className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600 font-bold uppercase text-sm border border-zinc-200">
                    {(player.name || player.first_name || '?').charAt(0)}
                  </div>
                  <p className="font-bold text-zinc-800 text-lg flex-1 truncate">{player.name || player.first_name + ' ' + player.last_name}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleStatusChange(player.id, 'present')}
                    className={`py-2.5 text-sm font-bold rounded-lg transition-all active:scale-95 ${
                      currentStatus === 'present' 
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 border-transparent' 
                        : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    Présent
                  </button>
                  <button
                    onClick={() => handleStatusChange(player.id, 'absent')}
                    className={`py-2.5 text-sm font-bold rounded-lg transition-all active:scale-95 ${
                      currentStatus === 'absent' 
                        ? 'bg-red-500 text-white shadow-md shadow-red-500/20 border-transparent' 
                        : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    Absent
                  </button>
                  <button
                    onClick={() => handleStatusChange(player.id, 'excused')}
                    className={`py-2.5 text-sm font-bold rounded-lg transition-all active:scale-95 ${
                      currentStatus === 'excused' 
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 border-transparent' 
                        : 'bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    Excusé
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Fixed Bottom Bar */}
      {players.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-zinc-200 z-20 pb-safe">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span className="flex items-center">
                Valider l'Appel
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RollCallInterface;
