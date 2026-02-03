
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, STORE_LINKS } from '../constants';

const Home: React.FC = () => {
  const bestSellers = PRODUCTS.filter(p => p.bestSeller);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="bg-brand-yellow pt-24 pb-32 border-b-2 border-brand-blue overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 z-10">
              <span className="inline-block bg-brand-blue text-brand-yellow px-4 py-1 rounded-sm text-[10px] font-black uppercase tracking-[0.4em] mb-8">Est. 2020 • Indonesia</span>
              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black text-brand-blue leading-[0.85] uppercase tracking-tighter mb-10">
                Naturally <br /> Yours — <br />
                <span className="text-white drop-shadow-[4px_4px_0px_#3F51B5]">Everyday Glow.</span>
              </h1>
              <p className="text-xl md:text-2xl text-brand-blue font-bold mb-14 max-w-xl leading-none tracking-tight">
                Natural ingredients. Skin-friendly formulas. <br className="hidden md:block" /> Designed for daily care.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/products" className="bg-brand-blue text-brand-yellow px-14 py-6 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-brand-blue transition-all neo-shadow">
                  Shop Now
                </Link>
                <Link to="/products" className="bg-transparent border-4 border-brand-blue text-brand-blue px-14 py-6 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-blue hover:text-brand-yellow transition-all">
                  Explore Products
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="absolute -inset-2 bg-brand-blue rounded-[3rem] -z-10"></div>
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 border-brand-blue">
                  <img 
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop" 
                    alt="Jennskin Natural Skincare" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-10 -left-10 bg-white border-2 border-brand-blue p-8 rounded-full w-48 h-48 flex items-center justify-center text-center shadow-2xl z-20">
                <p className="text-[11px] font-black uppercase text-brand-blue leading-none">100% BPOM <br /> Certified <br /> Safe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Ticker */}
      <div className="bg-brand-blue py-8 overflow-hidden flex border-b-2 border-white/10">
        <div className="flex whitespace-nowrap animate-marquee items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center mx-12">
              <span className="text-brand-yellow font-black uppercase tracking-[0.3em] text-xs">Alcohol Free</span>
              <span className="w-2 h-2 bg-white rounded-full mx-6"></span>
              <span className="text-brand-yellow font-black uppercase tracking-[0.3em] text-xs">Natural Ingredients</span>
              <span className="w-2 h-2 bg-white rounded-full mx-6"></span>
              <span className="text-brand-yellow font-black uppercase tracking-[0.3em] text-xs">Indonesian Made</span>
              <span className="w-2 h-2 bg-white rounded-full mx-6"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div className="max-w-md">
              <h2 className="text-6xl lg:text-8xl font-black text-brand-blue uppercase tracking-tighter leading-none mb-6">Our <br /> Favorites</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">The essentials your skin has been waiting for.</p>
            </div>
            <Link to="/products" className="group text-xs font-black uppercase tracking-widest text-brand-blue flex items-center mt-8 md:mt-0">
              View All Collection <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-brand-blue py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
                <div className="absolute top-0 left-0 -translate-x-10 -translate-y-10 w-full h-full bg-brand-yellow rounded-[4rem] -z-10"></div>
                <img src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop" className="rounded-[3rem] border-2 border-white shadow-2xl relative z-10" alt="Self care" />
            </div>
            <div className="order-1 lg:order-2 space-y-16">
              <h2 className="text-6xl md:text-8xl font-black text-brand-yellow uppercase tracking-tighter leading-[0.85]">
                Why <br /> Jennskin?
              </h2>
              <div className="space-y-10">
                {[
                  { id: '01', title: 'Clean Formulas', desc: 'No alcohol, no parabens. Only the essentials your skin needs.' },
                  { id: '02', title: 'Tropical Science', desc: 'Designed specifically for the Indonesian climate and humidity.' },
                  { id: '03', title: 'Safe for Daily Use', desc: 'Gentle enough to be your morning and evening ritual foundation.' }
                ].map(feature => (
                  <div key={feature.id} className="flex items-start gap-8 group">
                    <span className="text-6xl font-black text-white/10 group-hover:text-brand-yellow transition-colors leading-none">{feature.id}</span>
                    <div>
                        <h4 className="text-xl font-black uppercase text-white mb-2">{feature.title}</h4>
                        <p className="text-white/60 font-bold text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-brand-yellow text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
            <h2 className="text-6xl md:text-[120px] font-black text-brand-blue uppercase tracking-tighter leading-none mb-10">Ready <br /> To Glow?</h2>
            <p className="text-brand-blue/70 text-lg md:text-xl font-bold mb-16 max-w-2xl mx-auto leading-tight">Join the natural skincare revolution. High quality, Indonesian made, BPOM certified.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href={STORE_LINKS.shopee} className="w-full sm:w-auto bg-brand-blue text-brand-yellow px-16 py-7 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-brand-blue transition-all neo-shadow">Buy on Shopee</a>
              <a href={STORE_LINKS.tokopedia} className="w-full sm:w-auto bg-white text-brand-blue px-16 py-7 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all border-2 border-brand-blue">Buy on Tokopedia</a>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
