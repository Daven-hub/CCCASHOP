import axios from 'axios';
// import { useToast } from '../hook/use-toast';


// 👉 Crée une instance
const axiosInstance = axios.create({
      // baseURL: 'https://cc-ca.ca/api',
  baseURL: 'http://localhost:83/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Une erreur est survenue';

    if (
      error.response &&
      error.response.data &&
      typeof error.response.data === 'object'
    ) {
      message = error.response.data.message || message;
    }

    return Promise.reject(message);
  }
);
// 👉 Interceptor des requêtes : ajoute le token si présent
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// 👉 Interceptor des réponses : gestion des erreurs + refresh token
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Si token expiré et qu'on n'a pas déjà tenté un refresh
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem('refreshToken')
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');

//         const res = await axios.post('http://localhost:8000/api/refresh-token.php', {
//           refreshToken,
//         });

//         const newAccessToken = res.data.accessToken;
//         localStorage.setItem('accessToken', newAccessToken);

//         // On rejoue la requête originale avec le nouveau token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // En cas d’échec, on logout
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;