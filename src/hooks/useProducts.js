import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        api.fetchProducts(),
        api.fetchCategories()
      ]);
      setProducts(fetchedProducts);
      setCategories(['All', ...fetchedCategories]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      setLoading(true);
      const newProduct = await api.addProduct(productData);
      // Since fakeAPI returns an ID like 21, we append it to our state
      setProducts(prev => [newProduct, ...prev]);
      return true;
    } catch (err) {
      setError('Failed to create product.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const updated = await api.updateProduct(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
      return true;
    } catch (err) {
      setError('Failed to update product.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      await api.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete product.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Derived state for filtering and searching
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Derived state for pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return {
    products: paginatedProducts,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    totalPages,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    totalItems: filteredProducts.length
  };
};

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
