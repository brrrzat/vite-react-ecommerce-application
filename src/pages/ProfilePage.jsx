import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, ShoppingCart, Settings, CreditCard, LogOut } from 'lucide-react';

export const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 h-40 relative">
          <div className="absolute -bottom-16 left-12 w-32 h-32 bg-white rounded-3xl shadow-xl p-2">
            <div className="bg-indigo-100 w-full h-full rounded-2xl flex items-center justify-center">
              <User size={64} className="text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="pt-24 pb-12 px-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-black text-gray-900 capitalize">{user.username}</h1>
              <p className="text-indigo-600 font-bold flex items-center gap-2 mt-2">
                <Shield size={18} /> {user.role === 'admin' ? 'Administrator' : 'Premium Member'}
              </p>
            </div>
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center gap-2">
              <Settings size={18} /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="bg-white p-2 rounded-lg text-gray-400"><Mail size={20} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                  <p className="font-bold text-gray-700">{user.username}@eshop.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="bg-white p-2 rounded-lg text-gray-400"><CreditCard size={20} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Method</p>
                  <p className="font-bold text-gray-700">Visa ending in 4242</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { icon: <ShoppingCart size={18} />, title: 'Ordered Leather Jacket', date: 'Oct 24, 2023', amount: '$54.00' },
                  { icon: <Settings size={18} />, title: 'Updated Profile Info', date: 'Sep 12, 2023', amount: null },
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="text-indigo-600">{act.icon}</div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{act.title}</p>
                        <p className="text-xs text-gray-400">{act.date}</p>
                      </div>
                    </div>
                    {act.amount && <span className="font-bold text-gray-900">{act.amount}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button onClick={() => logout()} className="text-red-600 font-bold flex items-center gap-2 hover:bg-red-50 px-6 py-3 rounded-xl transition-all">
              <LogOut size={20} /> Sign Out of Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
