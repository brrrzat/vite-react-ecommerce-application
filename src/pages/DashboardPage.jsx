import React, { useState, useEffect } from 'react';
import { ProductService, AuthService } from '../services/api';
import { LoadingSpinner } from '../components/Shared';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  BarChart3,
  LayoutDashboard
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

export const DashboardPage = () => {
  const [stats, setStats] = useState({ products: 0, users: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Promise.all([ProductService.getAll(), AuthService.getAllUsers()])
      .then(([prodRes, userRes]) => {
        setProducts(prodRes.data);
        const revenue = prodRes.data.reduce((acc, curr) => acc + curr.price, 0) * 42; // Simulated multiplier
        setStats({
          products: prodRes.data.length,
          users: userRes.data.length,
          revenue: Math.floor(revenue)
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const chartData = products.slice(0, 8).map(p => ({
    name: p.title.substring(0, 10),
    sales: Math.floor(Math.random() * 100) + 20,
    revenue: Math.floor(p.price * (Math.random() * 50))
  }));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Real-time overview of your store's performance</p>
        </div>
        <Link 
          to="/items/create" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={20} /> Add Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          { label: 'Total Products', value: stats.products, icon: <Package />, color: 'bg-blue-500' },
          { label: 'Total Users', value: stats.users, icon: <Users />, color: 'bg-purple-500' },
          { label: 'Estimated Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: <DollarSign />, color: 'bg-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className={`${stat.color} text-white p-4 rounded-2xl`}>
              {React.cloneElement(stat.icon, { size: 28 })}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Sales Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-green-500" /> Sales Analytics
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="text-indigo-500" /> Revenue Forecast
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6, fill: '#8b5cf6' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Items Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Inventory Management</h3>
          <Link to="/products" className="text-indigo-600 text-sm font-bold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-4">Product</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.slice(0, 5).map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} className="w-10 h-10 object-contain" alt="" />
                      <span className="font-bold text-gray-800 line-clamp-1">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-bold text-gray-900">${product.price}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/items/${product.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </Link>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
