
import React from 'react';
import { Link } from 'react-router-dom';
import { STORE_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex flex-col brand-logo-font text-brand-yellow uppercase mb-8">
              <span className="text-4xl">jenn</span>
              <span className="text-4xl">skin</span>
            </Link>
            <p className="text-sm font-bold leading-relaxed mb-8 opacity-70">
              Bold, Natural, Indonesian. <br /> Since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-yellow mb-8">Menu</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm font-black hover:text-brand-yellow transition-colors">HOME</Link></li>
              <li><Link to="/products" className="text-sm font-black hover:text-brand-yellow transition-colors">PRODUCTS</Link></li>
              <li><Link to="/about" className="text-sm font-black hover:text-brand-yellow transition-colors">ABOUT</Link></li>
              <li><Link to="/contact" className="text-sm font-black hover:text-brand-yellow transition-colors">CONTACT</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-yellow mb-8">Shop</h4>
            <ul className="space-y-4">
              <li><a href={STORE_LINKS.shopee} className="text-sm font-black hover:text-brand-yellow transition-colors">SHOPEE</a></li>
              <li><a href={STORE_LINKS.tokopedia} className="text-sm font-black hover:text-brand-yellow transition-colors">TOKOPEDIA</a></li>
              <li><a href={STORE_LINKS.tiktok} className="text-sm font-black hover:text-brand-yellow transition-colors">TIKTOK</a></li>
            </ul>
          </div>

          {/* Action */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-yellow mb-8">Get In Touch</h4>
            <a href={STORE_LINKS.whatsapp} className="inline-block bg-brand-yellow text-brand-blue px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
              Chat Support
            </a>
          </div>
        </div>

        <div className="border-t-2 border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] font-black uppercase tracking-widest">
          <p className="opacity-50">&copy; 2024 Jennskin Naturals. All Rights Reserved.</p>
          <div className="flex space-x-8">
            <span className="text-brand-yellow">NA182XXXXXXX</span>
            <a href="#" className="hover:text-brand-yellow">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
