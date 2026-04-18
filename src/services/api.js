import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const ProductService = {
  getAll: (limit = 20) => api.get(`/products?limit=${limit}`),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  getCategories: () => api.get('/products/categories'),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
};

export const AuthService = {
  login: (credentials) => api.post('/auth/login', credentials),
  getAllUsers: () => api.get('/users'),
};

export default api;
