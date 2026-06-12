import axios from 'axios';

const api = axios.create({
  // Modifiez cette URL en fonction de la configuration locale de votre backend Laravel
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur de Requête : Attacher le Token Bearer automatiquement
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de Réponse : Gérer les erreurs 401 et 403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Non autorisé - Supprimer le token et rediriger vers la page de connexion
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        // Interdit
        console.error('Accès refusé : 403 Forbidden');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
