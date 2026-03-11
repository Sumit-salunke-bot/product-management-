import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductForm } from '../components/ProductForm';
import { SearchBar } from '../components/SearchBar';
import { FilterSection } from '../components/FilterSection';
import { Pagination } from '../components/Pagination';
import { Loader, ErrorMessage } from '../components/ui/States';
import { Plus, LayoutDashboard, CheckCircle2 } from 'lucide-react';

export const Dashboard = () => {
  const {
    products,
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
    totalItems
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const handleOpenForm = (product = null) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (formData) => {
    let success = false;
    const isEdit = !!editingProduct;
    if (isEdit) {
      success = await handleUpdateProduct(editingProduct.id, formData);
    } else {
      success = await handleCreateProduct(formData);
    }
    
    if (success) {
      handleCloseForm();
      showToast(isEdit ? 'Product updated successfully!' : 'Product added successfully!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = await handleDeleteProduct(id);
      if (success) showToast('Product deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white p-0.5 rounded-full overflow-hidden shadow-sm shadow-indigo-200 ring-2 ring-indigo-100">
                <img src="/app-icon.svg" alt="Inventory Dashboard" className="h-10 w-10 object-cover rounded-full" />
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Product Dashboard</h1>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleOpenForm()}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
              >
                <Plus className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
                Add Product
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex-1 max-w-lg">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-200 mx-4" />
          <div className="w-full md:w-auto overflow-hidden">
            <FilterSection 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-slate-800">
            {totalItems} {totalItems === 1 ? 'Product' : 'Products'} found
          </h2>
        </div>

        {error && <ErrorMessage message={error} />}

        {loading && products.length === 0 ? (
          <Loader />
        ) : products.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onEdit={handleOpenForm}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        ) : !loading ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-slate-900">No products found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Clear Filters
              </button>
            </div>
          </div>
        ) : null}
      </main>

      <ProductForm 
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingProduct}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
