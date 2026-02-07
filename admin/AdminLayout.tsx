import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { api } from './api';

const AdminLayout: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.me().then(data => { setUser(data.user); setLoading(false); }).catch(() => { navigate('/admin/login'); setLoading(false); });
  }, [navigate]);

  const handleLogout = async () => {
    await api.logout().catch(() => {});
    localStorage.removeItem('cms_token');
    navigate('/admin/login');
  };

  if (loading) return <div className="min-h-screen bg-slate-100 flex items-center justify-center"><p className="text-slate-400">Loading...</p></div>;
  if (!user) return null;

  const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Settings', path: '/admin/settings' },
    { label: 'Home Page', path: '/admin/pages/home' },
    { label: 'Products Page', path: '/admin/pages/products' },
    { label: 'About Page', path: '/admin/pages/about' },
    { label: 'Contact Page', path: '/admin/pages/contact' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Testimonials', path: '/admin/testimonials' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-brand-blue text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link to="/admin" className="font-black text-brand-yellow text-lg uppercase tracking-tighter">CMS</Link>
          <Link to="/" className="text-white/60 text-xs font-bold hover:text-white">← View Site</Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/60">Hi, {user.username}</span>
          <button onClick={handleLogout} className="text-xs font-bold text-brand-yellow hover:text-white">Logout</button>
        </div>
      </header>
      <div className="flex">
        <nav className="w-56 bg-white border-r border-slate-200 min-h-[calc(100vh-56px)] p-4 space-y-1 flex-shrink-0">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === item.path ? 'bg-brand-blue text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1 p-8 max-w-5xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
