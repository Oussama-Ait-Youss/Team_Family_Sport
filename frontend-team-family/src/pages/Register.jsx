import React, { useState, useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, Dumbbell, ArrowRight } from 'lucide-react';
import api from '../api/axios';

const Register = () => {
  const { token, isLoading: isAuthLoading } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Si déjà connecté, on va direct au dashboard
  if (token && !isAuthLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/register', { 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      });
      // Assuming success redirects to login
      navigate('/login', { state: { message: "Inscription réussie. Veuillez vous connecter." } });
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 font-sans bg-zinc-900 bg-cover bg-center bg-blend-overlay bg-black/80"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1920&q=80')" }}
    >
      <div className="max-w-md w-full backdrop-blur-md bg-zinc-900/80 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 border border-zinc-800/50 relative overflow-hidden">
        {/* Subtle red top glow/border effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-red-600/20 blur-xl"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-4 shadow-inner text-red-600">
            <Dumbbell size={32} />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-2">
            Team Family<span className="text-red-600">.</span>
          </h1>
          <p className="text-zinc-400 font-medium tracking-wide text-sm uppercase">Rejoindre le Dojo</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border-l-4 border-red-600 text-red-200 text-sm font-medium relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Nom Complet</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <User size={18} />
              </div>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 rounded-xl focus:ring-2 focus:ring-red-600/50 focus:border-red-600 outline-none transition-all duration-300"
                placeholder="Bruce Lee"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 rounded-xl focus:ring-2 focus:ring-red-600/50 focus:border-red-600 outline-none transition-all duration-300"
                placeholder="combattant@dojo.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 rounded-xl focus:ring-2 focus:ring-red-600/50 focus:border-red-600 outline-none transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Confirmer mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 rounded-xl focus:ring-2 focus:ring-red-600/50 focus:border-red-600 outline-none transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full group bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center uppercase tracking-wider text-sm mt-8"
          >
            {isSubmitting ? (
               <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
            ) : (
              <>
                <span>S'inscrire</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center relative z-10 border-t border-zinc-800/50 pt-6">
          <p className="text-zinc-400 text-sm">
            Déjà membre ?{' '}
            <Link to="/login" className="text-red-500 font-bold hover:text-red-400 transition-colors">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
