import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/api';
import { ProductCard, LoadingSpinner } from '../components/Shared';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search, Filter, Sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('none'); // 'asc' | 'desc' | 'none'

  useEffect(() => {
    setLoading(true);
    Promise.all([ProductService.getAll(), ProductService.getCategories()])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load products. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  if (error) return <div className="max-w-7xl mx-auto px-4 py-10 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Our Collection</h1>
          <p className="text-gray-500">Discover over {products.length} hand-picked items</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={18} className="text-gray-400" />
            <select 
              className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all capitalize"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden w-full sm:w-auto">
            <button 
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'none' : 'asc')}
              className={`p-2 flex-1 sm:flex-none flex items-center justify-center gap-1 transition-colors ${sortOrder === 'asc' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
              title="Price: Low to High"
            >
              <SortAsc size={20} />
            </button>
            <button 
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'none' : 'desc')}
              className={`p-2 border-l border-gray-200 flex-1 sm:flex-none flex items-center justify-center gap-1 transition-colors ${sortOrder === 'desc' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
              title="Price: High to Low"
            >
              <SortDesc size={20} />
            </button>
          </div>
        </div>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory(''); setSortOrder('none'); }}
                className="mt-4 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
