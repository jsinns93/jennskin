
import React from 'react';
import { STORE_LINKS } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="py-24 bg-brand-yellow min-h-screen border-b-8 border-brand-blue animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <h1 className="text-7xl md:text-8xl font-black text-brand-blue uppercase tracking-tighter mb-12 leading-none">
              Let's <br /> <span className="text-white">Chat.</span>
            </h1>
            
            <div className="space-y-12">
              <div className="bg-brand-blue text-brand-yellow p-8 rounded-[2.5rem] border-4 border-white shadow-2xl">
                <h3 className="font-black uppercase tracking-widest text-xs mb-4">Visit Our Booth</h3>
                <p className="text-xl font-bold leading-tight">
                  Living World Mall <br />
                  (In front of MM Juice) <br />
                  Denpasar, Bali
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={STORE_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white text-brand-blue border-4 border-brand-blue px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                  WhatsApp Support
                </a>
                <a href="#" className="bg-brand-blue text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-12 rounded-[3.5rem] border-8 border-brand-blue shadow-[20px_20px_0px_0px_#3F51B5]">
            <h2 className="text-4xl font-black text-brand-blue uppercase tracking-tighter mb-10">Direct Message</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-blue">Full Name</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-4 border-stone-100 focus:border-brand-yellow focus:bg-white focus:outline-none transition-all font-bold" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-blue">Email Address</label>
                <input type="email" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-4 border-stone-100 focus:border-brand-yellow focus:bg-white focus:outline-none transition-all font-bold" placeholder="hello@glow.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-blue">Message</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-4 border-stone-100 focus:border-brand-yellow focus:bg-white focus:outline-none transition-all font-bold" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full bg-brand-blue text-brand-yellow py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-yellow hover:text-brand-blue transition-all border-4 border-brand-blue">
                Send Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
