import axios from 'axios';
import { additionalProducts } from './mockData';

const API_BASE_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
  const response = await axios.get(API_BASE_URL);
  return [...response.data, ...additionalProducts];
};

export const fetchProduct = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Fake store API doesn't actually add the product permanently, 
// but we simulate the network request and return the simulated data.
export const addProduct = async (productData) => {
  const response = await axios.post(API_BASE_URL, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  const apiCategories = response.data;
  const newCategories = [...new Set(additionalProducts.map(p => p.category))];
  return [...new Set([...apiCategories, ...newCategories])];
};
