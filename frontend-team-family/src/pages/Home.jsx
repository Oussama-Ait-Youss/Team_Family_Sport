import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Activity } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm h-20 flex items-center justify-between px-8 md:px-16 z-50">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🥋</span>
          <span className="text-2xl font-black tracking-tight text-slate-900">TFS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-red-600 transition-colors">Accueil</a>
          <a href="#disciplines" className="hover:text-red-600 transition-colors">Disciplines</a>
          <a href="#" className="hover:text-red-600 transition-colors">Horaires</a>
          <a href="#" className="hover:text-red-600 transition-colors">Tarifs</a>
        </div>
        <div>
          <Link to="/login" className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-full transition-all shadow-md">
            Espace Membre
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mb-6">
            Maîtrisez votre corps et <span className="text-red-600">votre esprit.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10">
            Rejoignez Team Family Sports, le dojo de référence pour les passionnés d'arts martiaux de tous niveaux. Dépassez vos limites avec des instructeurs certifiés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg shadow-red-500/30 transition-all text-lg">
              Rejoindre le Dojo
            </Link>
            <a href="#disciplines" className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-full transition-all text-lg">
              Découvrir nos cours
            </a>
          </div>
        </section>

        {/* Features/Disciplines Section */}
        <section id="disciplines" className="bg-white py-24 px-8 md:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 mb-16">Nos Disciplines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Karaté</h3>
                <p className="text-slate-500 leading-relaxed">
                  L'art de la frappe. Développez votre explosivité, votre concentration et apprenez les techniques ancestrales d'autodéfense.
                </p>
              </div>
              {/* Card 2 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Judo</h3>
                <p className="text-slate-500 leading-relaxed">
                  La voie de la souplesse. Maîtrisez les projections et le combat au sol dans un esprit de respect et d'entraide mutuelle.
                </p>
              </div>
              {/* Card 3 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Activity size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Boxe</h3>
                <p className="text-slate-500 leading-relaxed">
                  Le noble art. Améliorez votre cardio, votre agilité et votre force physique grâce à des entraînements intenses.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-2xl mb-4">🥋</div>
          <p className="mb-2">© 2026 Team Family Sports. Tous droits réservés.</p>
          <p className="text-sm">123 Rue du Dojo, 75000 Paris | contact@tfs.com | 01 23 45 67 89</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
