import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
  { label: 'Site Settings', desc: 'Store links, brand info, footer', path: '/admin/settings' },
  { label: 'Home Page', desc: 'Hero, ticker, features, CTA', path: '/admin/pages/home' },
  { label: 'Products Page', desc: 'Header text', path: '/admin/pages/products' },
  { label: 'About Page', desc: 'Intro, philosophy', path: '/admin/pages/about' },
  { label: 'Contact Page', desc: 'Header, booth info', path: '/admin/pages/contact' },
  { label: 'Products', desc: 'Add, edit, delete products', path: '/admin/products' },
  { label: 'Testimonials', desc: 'Customer reviews', path: '/admin/testimonials' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-black text-slate-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <Link key={card.path} to={card.path} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-brand-blue transition-all group">
            <h3 className="font-bold text-lg text-slate-800 group-hover:text-brand-blue">{card.label}</h3>
            <p className="text-slate-400 text-sm mt-1">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
