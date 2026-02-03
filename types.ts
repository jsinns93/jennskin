
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  image: string;
  price?: string;
  scents?: string[];
  bestSeller?: boolean;
}

export interface StoreLinks {
  shopee: string;
  tokopedia: string;
  lazada: string;
  tiktok: string;
  whatsapp: string;
}

export type Category = 'All' | 'Serum' | 'Moisturizer' | 'Deodorant' | 'Cleanser' | 'Toner';
