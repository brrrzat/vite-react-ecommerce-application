import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // In a real app, we'd store a token, but FakeStoreAPI returns a token
    // We'll mock the user profile data
    const userProfile = {
      username: userData.username,
      role: userData.username === 'mor_2314' ? 'admin' : 'user', // mor_2314 is a default user in fakestoreapi
      token: userData.token
    };
    setUser(userProfile);
    localStorage.setItem('user', JSON.stringify(userProfile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
