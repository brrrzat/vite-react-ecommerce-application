import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
// @ts-ignore
import { useAuth, AuthProvider } from './context/AuthContext';
// @ts-ignore
import { Navbar, Footer, LoadingSpinner } from './components/Shared';

// Page Imports
// @ts-ignore
import { HomePage } from './pages/HomePage';
// @ts-ignore
import { ProductListPage } from './pages/ProductListPage';
// @ts-ignore
import { ProductDetailsPage } from './pages/ProductDetailsPage';
// @ts-ignore
import { LoginPage, RegisterPage } from './pages/AuthPages';
// @ts-ignore
import { DashboardPage } from './pages/DashboardPage';
// @ts-ignore
import { ProductFormPage } from './pages/ProductFormPage';
// @ts-ignore
import { ProfilePage } from './pages/ProfilePage';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }: any) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// 404 Page Component
const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center py-40 px-4 text-center">
    <h1 className="text-9xl font-black text-indigo-600">404</h1>
    <h2 className="text-4xl font-bold mt-4 text-gray-900">Lost in Space?</h2>
    <p className="text-gray-500 mt-4 max-w-md">The page you're looking for doesn't exist or has been moved to another galaxy.</p>
    <Link to="/" className="mt-10 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
      Go Home
    </Link>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected User Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />

              {/* Protected Admin Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute adminOnly={true}>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/items" element={
                <ProtectedRoute adminOnly={true}>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/items/create" element={
                <ProtectedRoute adminOnly={true}>
                  <ProductFormPage />
                </ProtectedRoute>
              } />
              <Route path="/items/:id/edit" element={
                <ProtectedRoute adminOnly={true}>
                  <ProductFormPage />
                </ProtectedRoute>
              } />

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
