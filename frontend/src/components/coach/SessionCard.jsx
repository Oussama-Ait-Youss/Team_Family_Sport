import React from 'react';

const SessionCard = ({ session, onClick }) => {
  const groupName = session.group?.name || session.group_name || 'Groupe Inconnu';
  
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    try {
      if (timeStr.includes('T')) {
        return new Date(timeStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      }
      const [hours, minutes] = timeStr.split(':');
      return `${hours}:${minutes}`;
    } catch (e) {
      return timeStr;
    }
  };

  const start = formatTime(session.start_time);
  const end = formatTime(session.end_time);
  
  const durationDisplay = (start && end) ? `${start} - ${end}` : 'Heure non définie';
  const isCompleted = session.attendance_completed;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-2 pl-3">
        <h3 className="font-bold text-zinc-800 text-lg">{groupName}</h3>
        {isCompleted && (
          <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-200">
             <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
             Appel Fait
          </span>
        )}
      </div>
      
      <div className="flex items-center text-sm text-zinc-500 mt-2 pl-3">
        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mr-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <span className="font-medium text-zinc-600">{durationDisplay}</span>
      </div>
      
      {/* Decorative left accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
    </div>
  );
};

export default SessionCard;
