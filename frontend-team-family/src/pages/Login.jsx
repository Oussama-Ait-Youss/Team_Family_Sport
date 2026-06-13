import React, { useState, useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight, Globe, Command, Info } from 'lucide-react';

const Login = () => {
  const { login, token, isLoading: isAuthLoading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setIsSubmitting(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full font-sans bg-zinc-50 overflow-hidden">
      {/* LEFT SIDE: Form Area */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white shadow-[10px_0_30px_rgba(0,0,0,0.02)] z-30">
        <div className="max-w-md w-full mx-auto">
          
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.1] mb-4">
              DISCIPLINES.<br/>
              <span className="text-red-600">FOCUS.</span><br/>
              STRENGTH.
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-sm font-medium flex items-center gap-3">
              <Info size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-20">
            <div>
              <label className="block text-sm font-bold text-gray-700 ml-2 mb-2">Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-full focus:ring-2 focus:ring-red-600 focus:bg-white focus:border-transparent outline-none transition-all shadow-sm"
                placeholder="combattant@dojo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 ml-2 mb-2">Mot de passe</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 rounded-full focus:ring-2 focus:ring-red-600 focus:bg-white focus:border-transparent outline-none transition-all shadow-sm"
                placeholder="••••••••"
              />
              <div className="flex justify-end mt-2 pr-2">
                <a href="#" className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors">Mot de passe oublié ?</a>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full group bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-full shadow-xl shadow-gray-900/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center mt-6"
            >
              {isSubmitting ? (
                 <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="mt-8 flex items-center relative z-20">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400 font-medium">Ou continuer avec</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 mt-6 relative z-20">
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors font-semibold text-gray-700">
              <Command size={18} />
              Apple
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors font-semibold text-gray-700">
              <Globe size={18} />
              Google
            </button>
          </div>

          <p className="mt-8 text-center text-gray-500 text-sm font-medium relative z-20">
            Nouveau au dojo ?{' '}
            <Link to="/register" className="text-red-600 font-bold hover:text-red-500 transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Visual Area */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center overflow-visible z-10">
        
        {/* The Background Shape */}
        <div className="absolute w-2/3 h-3/4 bg-red-600 rounded-[3rem] z-0 right-10 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Subtle pattern / noise inside the red shape */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
            <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
            </svg>
        </div>

        {/* The Fighter Image (Pop-out effect) */}
        <img 
          src="/fighter.png" 
          alt="Martial Artist" 
          className="absolute z-10 h-[90%] w-auto object-contain drop-shadow-2xl scale-110 -translate-x-12"
        />

        {/* Decorations / Floating Text */}
        <div className="absolute bottom-20 left-10 z-20 font-black text-8xl tracking-widest text-white/20 select-none pointer-events-none drop-shadow-lg -rotate-90 origin-bottom-left">
          武士道
        </div>
        
        <div className="absolute top-20 right-20 z-0">
          <svg width="120" height="120" viewBox="0 0 100 100" className="text-red-500 opacity-50 animate-[spin_20s_linear_infinite]">
            <path fill="currentColor" d="M50 0 A50 50 0 0 1 100 50 A50 50 0 0 1 50 100 A50 50 0 0 1 0 50 A50 50 0 0 1 50 0 Z M50 10 A40 40 0 0 0 10 50 A40 40 0 0 0 50 90 A40 40 0 0 0 90 50 A40 40 0 0 0 50 10 Z"></path>
          </svg>
        </div>

      </div>
      
    </div>
  );
};

export default Login;
