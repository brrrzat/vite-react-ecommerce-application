import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../services/api';
import { LoadingSpinner } from '../components/Shared';
import { Star, ChevronLeft, ShoppingCart, ShieldCheck, RefreshCw } from 'lucide-react';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    ProductService.getById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8 font-medium transition-colors"
      >
        <ChevronLeft size={20} /> Back to products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Column */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-center h-[500px]">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform hover:scale-110 duration-500"
          />
        </div>

        {/* Info Column */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-4 leading-tight">{product.title}</h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < Math.floor(product.rating?.rate || 0) ? "currentColor" : "none"}
                    stroke={i < Math.floor(product.rating?.rate || 0) ? "none" : "currentColor"}
                  />
                ))}
              </div>
              <span className="text-gray-500 font-medium">({product.rating?.count || 0} reviews)</span>
            </div>
          </div>

          <div className="text-5xl font-black text-indigo-600 mb-8">
            ${product.price}
          </div>

          <div className="prose prose-indigo mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-14">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center font-bold text-xl"
              >-</button>
              <div className="w-16 h-full flex items-center justify-center font-bold text-lg">{quantity}</div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center font-bold text-xl"
              >+</button>
            </div>
            <button className="flex-1 bg-indigo-600 text-white h-14 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
              <ShoppingCart size={22} /> Add to Cart
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <ShieldCheck className="text-green-600" />
              <span className="text-sm font-semibold text-gray-700">2 Year Warranty</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <RefreshCw className="text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
