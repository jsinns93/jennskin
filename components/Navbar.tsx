
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  storeLinks: { shopee: string; tokopedia: string; lazada: string; tiktok: string; whatsapp: string };
}

const Navbar: React.FC<Props> = ({ storeLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brand-yellow border-b-2 border-brand-blue">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex flex-col brand-logo-font text-brand-blue uppercase hover:opacity-80 transition-opacity">
            <span className="text-2xl lg:text-3xl">jenn</span>
            <span className="text-2xl lg:text-3xl">skin</span>
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-[11px] font-black tracking-[0.2em] transition-all hover:text-white ${
                  location.pathname === link.path ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-brand-blue/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <a 
              href={storeLinks.shopee} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-brand-blue text-brand-yellow px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-blue transition-all neo-shadow"
            >
              SHOP NOW
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-blue focus:outline-none">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-brand-yellow border-t-2 border-brand-blue py-10 px-8 space-y-8 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              className="block text-4xl font-black text-brand-blue uppercase tracking-tighter"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-8 border-t border-brand-blue/10">
            <a href={storeLinks.shopee} className="block w-full text-center bg-brand-blue text-brand-yellow py-5 rounded-2xl font-black uppercase tracking-widest text-xs">GO TO STORE</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
