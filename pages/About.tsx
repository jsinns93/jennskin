
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Editorial Intro */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <span className="text-[10px] font-black tracking-[0.5em] text-brand-blue/30 uppercase block">Our DNA</span>
              <h1 className="text-7xl md:text-9xl font-black text-brand-blue uppercase tracking-tighter leading-[0.8]">True <br /> <span className="text-brand-yellow drop-shadow-[4px_4px_0px_#3F51B5]">Natural</span> <br /> Heritage.</h1>
              <div className="space-y-8 text-slate-500 font-bold text-lg leading-tight">
                <p>
                  Jennskin Naturals was founded in 2020 by Jennifer Coppen with a clear vision: to bring high-performance natural skincare to the modern Indonesian woman.
                </p>
                <p>
                  We believe that beauty should never come at the cost of your health. That's why every drop is free from alcohol, parabens, and harsh synthetics.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-2 border-brand-blue neo-shadow relative z-10">
                <img src="https://images.unsplash.com/photo-1570172619992-23136208665c?q=80&w=1200&auto=format&fit=crop" alt="Skin Care Ingredients" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-yellow border-2 border-brand-blue p-10 rounded-[2.5rem] shadow-2xl z-20 max-w-xs">
                <p className="text-brand-blue font-black text-xl uppercase tracking-tighter italic leading-none">"We don't follow trends; we nurture real skin."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Grids */}
      <section className="py-32 bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { title: 'Source', desc: 'Ethically harvested Indonesian botanicals.' },
              { title: 'Science', desc: 'BPOM certified safe and gentle formulas.' },
              { title: 'Soul', desc: 'Designed for confidence and self-care daily.' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-5xl font-black text-brand-yellow tracking-tighter uppercase leading-none">{item.title}</h3>
                <p className="text-white/60 font-bold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
