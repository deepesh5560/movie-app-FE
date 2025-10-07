import api from "../axiosInstance";
import Cookies from 'js-cookie';

export const authService = {
  signup: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/signup', data),

  login: async (data: { email: string; password: string }) => {
    const res = await api.post('/auth/login', data);
    const token = res.data.access_token;

   
    if (token) {
      localStorage.setItem('access_token', token);
       Cookies.set('access_token', token, {
        expires: 7, 
        sameSite: 'strict',
      });
    }

    return res.data;
  },

  logout: () => {
    Cookies.remove('access_token', { path: '/', sameSite: 'strict' });
    localStorage.removeItem('access_token');
    window.location.href ="/login"
  },
};
