import api from '../axiosInstance';

export const movieService = {
getAll: (page: number = 1, limit: number = 8) =>
  api.get('/movies', {
    params: {
      page,
      limit,
    },
  }),

  getById: (id: string) => api.get(`/movies/${id}`),
  create: (data: FormData) =>
    api.post('/movies', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
update: async (id: string, data: any) => {
  if (data.poster instanceof File) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('publishingYear', data.publishingYear);
    formData.append('poster', data.poster);
    return api.put(`/movies/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } else {
    return api.put(`/movies/${id}`, data);
  }
},
  delete: (id: string) => api.delete(`/movies/${id}`),
};