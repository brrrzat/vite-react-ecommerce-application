import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../services/api';
import { ProductCard, LoadingSpinner } from '../components/Shared';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getAll(4)
      .then(res => setFeaturedProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Elevate Your <span className="text-indigo-400">Lifestyle</span>
          </h1>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Discover our curated collection of premium products, from cutting-edge electronics to timeless fashion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products" className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <ShoppingBag className="text-indigo-600" />, title: 'Premium Quality', desc: 'Sourced from the best brands worldwide.' },
          { icon: <ShieldCheck className="text-indigo-600" />, title: 'Secure Payment', desc: '100% secure payment processing.' },
          { icon: <Truck className="text-indigo-600" />, title: 'Fast Delivery', desc: 'Free shipping on orders over $100.' },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Collections</h2>
            <p className="text-gray-500 mt-2">Handpicked items just for you</p>
          </div>
          <Link to="/products" className="text-indigo-600 font-bold flex items-center gap-1 hover:underline">
            View all products <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Exclusive Member Access</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">Sign up now to receive early access to new collections and 20% off your first purchase.</p>
          <Link to="/register" className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};
