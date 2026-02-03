
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Category } from '../types';
import ProductCard from '../components/ProductCard';

const CATEGORIES: Category[] = ['All', 'Serum', 'Moisturizer', 'Deodorant', 'Cleanser', 'Toner'];

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-24 animate-in fade-in duration-1000">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[10px] font-black tracking-[0.5em] text-brand-blue/30 uppercase mb-8 block">Boutique</span>
          <h1 className="text-7xl md:text-9xl font-black uppercase text-brand-blue tracking-tighter leading-[0.8] mb-10">The Collection</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-bold leading-tight">
            High-performance natural skincare crafted for the modern soul.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-20 gap-10">
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3.5 rounded-full text-[10px] font-black transition-all uppercase tracking-widest border-2 ${
                  activeCategory === category 
                    ? 'bg-brand-blue text-brand-yellow border-brand-blue shadow-lg' 
                    : 'bg-white text-brand-blue/40 border-slate-100 hover:border-brand-blue/20 hover:text-brand-blue'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="SEARCH PRODUCTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-8 py-5 rounded-full border-2 border-slate-100 text-xs font-black tracking-widest focus:outline-none focus:border-brand-blue transition-all"
            />
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-200">
            <h3 className="text-4xl font-black text-slate-300 uppercase tracking-tighter">No items found</h3>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
              className="mt-10 text-brand-blue font-black uppercase tracking-widest text-xs border-b-4 border-brand-yellow hover:border-brand-blue transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
