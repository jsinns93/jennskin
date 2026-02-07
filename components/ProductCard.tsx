
import React from 'react';

interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  image_url: string;
  scents?: string[] | null;
  best_seller: boolean;
}

interface Props {
  product: Product;
  storeLinks: { shopee: string; tokopedia: string; whatsapp: string };
}

const ProductCard: React.FC<Props> = ({ product, storeLinks }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden border-2 border-brand-blue transition-all duration-300 flex flex-col h-full neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_#3F51B5]">
      <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-brand-blue">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.best_seller && (
          <div className="absolute top-5 left-5 bg-brand-yellow text-brand-blue text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border-2 border-brand-blue z-10">
            Best Seller
          </div>
        )}
      </div>

      <div className="p-8 flex-grow flex flex-col bg-white">
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-blue font-black mb-2 block opacity-60">{product.category}</span>
          <h3 className="text-3xl font-black uppercase text-brand-blue leading-[0.9] tracking-tighter">{product.name}</h3>
        </div>
        
        <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {product.scents && product.scents.length > 0 && (
          <div className="mb-8">
            <p className="text-[9px] font-black text-brand-blue/40 uppercase tracking-widest mb-3">Available in</p>
            <div className="flex flex-wrap gap-2">
              {product.scents.map(s => (
                <span key={s} className="text-[10px] font-black bg-brand-yellow text-brand-blue px-3 py-1 rounded-md border border-brand-blue/20 uppercase tracking-tighter">{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10 flex-grow">
          <ul className="space-y-3">
            {(product.benefits || []).slice(0, 3).map((benefit, i) => (
              <li key={i} className="text-[11px] font-bold text-brand-blue flex items-center uppercase tracking-tight">
                <span className="w-1.5 h-1.5 bg-brand-yellow border border-brand-blue rounded-full mr-3 shrink-0"></span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <a 
            href={storeLinks.shopee} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-brand-blue text-brand-yellow py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-yellow hover:text-brand-blue transition-all border-2 border-brand-blue"
          >
            Shopee
          </a>
          <a 
            href={storeLinks.tokopedia} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white text-brand-blue py-4 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-brand-blue hover:bg-brand-blue hover:text-white transition-all"
          >
            Tokopedia
          </a>
          <a 
            href={storeLinks.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="col-span-2 flex items-center justify-center bg-brand-yellow text-brand-blue py-4 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-brand-blue hover:bg-brand-blue hover:text-white transition-all mt-1"
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
