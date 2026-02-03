
import { Product, StoreLinks } from './types';

export const STORE_LINKS: StoreLinks = {
  shopee: 'https://shopee.co.id',
  tokopedia: 'https://tokopedia.com',
  lazada: 'https://lazada.co.id',
  tiktok: 'https://tiktok.com',
  whatsapp: 'https://wa.me/6281234567890'
};

export const PRODUCTS: Product[] = [
  {
    id: 'deodorant-spray',
    name: 'Deodorant Spray',
    category: 'Deodorant',
    description: 'Natural alum deodorant designed to control odor and sweat effectively while being gentle on your skin.',
    benefits: ['Natural alum protection', 'Controls odor and sweat', 'Brightens underarms', 'Non-sticky and fast drying'],
    ingredients: ['Natural Alum', 'Purified Water', 'Fragrance'],
    scents: ['Vanilla', 'Jasmine', 'Bubblegum', 'Baby Fresh', 'Sakura'],
    image: 'https://picsum.photos/seed/deo/600/800',
    bestSeller: true
  },
  {
    id: 'green-apple-serum',
    name: 'Green Apple Serum',
    category: 'Serum',
    description: 'A potent brightening serum that helps reduce acne and scars with the power of botanical extracts.',
    benefits: ['Intense brightening', 'Fades acne scars', 'Improves skin texture', 'Antioxidant protection'],
    ingredients: ['Apple Extract', 'Niacinamide', 'Ceramide', 'Vitamin C'],
    image: 'https://picsum.photos/seed/serum/600/800',
    bestSeller: true
  },
  {
    id: 'honey-moisturizer',
    name: 'Honey Moisturizer',
    category: 'Moisturizer',
    description: 'Deeply hydrating moisturizer that calms redness and provides long-lasting moisture.',
    benefits: ['Deep hydration', 'Soothes redness', 'Repair skin barrier', 'Dewy finish'],
    ingredients: ['Honey', 'Centella Asiatica', 'Chamomile', 'Squalane'],
    image: 'https://picsum.photos/seed/honey/600/800',
    bestSeller: true
  },
  {
    id: 'calendula-facial-wash',
    name: 'Calendula Facial Wash',
    category: 'Cleanser',
    description: 'A gentle cleanser that removes impurities without stripping your skin of its natural oils.',
    benefits: ['Gentle cleansing', 'Calms inflammation', 'Keeps skin supple', 'Safe for sensitive skin'],
    ingredients: ['Calendula', 'Jojoba Oil', 'Niacinamide', 'Aloe Vera'],
    image: 'https://picsum.photos/seed/wash/600/800'
  },
  {
    id: 'gotu-kola-toner',
    name: 'Gotu Kola Toner',
    category: 'Toner',
    description: 'Hydrating and calming toner that balances skin pH and prepares skin for further treatment.',
    benefits: ['Hydrating', 'Calming effect', 'Balances pH', 'Reduces redness'],
    ingredients: ['Centella Asiatica (Gotu Kola)', 'Cucumber Extract', 'Hyaluronic Acid'],
    image: 'https://picsum.photos/seed/toner/600/800'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah K.',
    text: 'The Deodorant Spray is a game changer! No more sticky feeling and it smells amazing.',
    role: 'Loyal Customer'
  },
  {
    id: 2,
    name: 'Aditya R.',
    text: 'My acne scars started fading in just two weeks with the Green Apple Serum. Highly recommend!',
    role: 'Student'
  },
  {
    id: 3,
    name: 'Maya S.',
    text: 'Finally found a moisturizer that doesn\'t break me out. The Honey Moisturizer is magic.',
    role: 'Working Professional'
  }
];
