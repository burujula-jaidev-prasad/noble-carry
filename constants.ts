
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // HANDBAGS
  {
    id: 'hb-daily',
    name: 'Daily Handbag',
    category: 'HANDBAGS',
    subCategory: 'Everyday / Casual',
    price: 7470, // ₹7,470 (was $90)
    image: '/noble-carry/images/products/hb-daily/main.png',
    gallery: [
      '/noble-carry/images/products/hb-daily/main.png',
      '/noble-carry/images/products/hb-daily/detail-1.png',
      '/noble-carry/images/products/hb-daily/detail-2.png',
      '/noble-carry/images/products/hb-daily/extra.png',
      '/noble-carry/images/products/hb-daily/extra-2.png',
      '/noble-carry/images/products/hb-daily/extra-3.png'
    ],
    description: 'Your daily companion. Compact, durable, and designed to replace hundreds of disposable bags. Carry what matters, nothing more.',
    impact: {
      wasteReduced: '1.8kg Textile Waste',
      lifespan: '12+ Years',
      materials: ['Reclaimed Canvas', 'Recycled Cotton Lining', 'Leather Accents']
    }
  },
  {
    id: 'hb-office',
    name: 'Office Handbag',
    category: 'HANDBAGS',
    subCategory: 'Corporate / Structured',
    price: 14940, // ₹14,940 (was $180)
    image: '/noble-carry/images/products/handbags/office.png',
    gallery: [
      '/noble-carry/images/products/handbags/office.png',
      '/noble-carry/images/products/handbags/of1.jpeg',
      '/noble-carry/images/products/handbags/of2.jpeg',
      '/noble-carry/images/products/handbags/of3.jpeg',
      '/noble-carry/images/products/handbags/of3_alt.jpeg'
    ],
    description: 'Professional elegance meets radical sustainability. Structured design, premium materials, and a statement that you care about more than just style.',
    impact: {
      wasteReduced: '2.9kg Premium Textiles',
      lifespan: '18+ Years',
      materials: ['Wax Canvas', 'Recycled Suede Lining', 'Brass Fixtures']
    }
  },
  {
    id: 'hb-minimal',
    name: 'Minimal Carry Bag',
    category: 'HANDBAGS',
    subCategory: 'Essentials / Night Out',
    price: 6225, // ₹6,225 (was $75)
    image: '/noble-carry/images/products/handbags/minimal.png',
    description: 'Less is more. A small, rugged pouch for your phone, keys, and cards. Designed for those who travel light.',
    impact: {
      wasteReduced: '0.8kg Fabric Scraps',
      lifespan: '12+ Years',
      materials: ['Reclaimed Canvas Scraps', 'Paracord Handle']
    }
  },
  {
    id: 'hb-tote',
    name: 'Market Tote',
    category: 'HANDBAGS',
    subCategory: 'Shopping / Beach',
    price: 4500,
    image: '/noble-carry/images/products/handbags/tote.png',
    description: 'The catch-all carry. Capacious, sturdy, and ready for whatever the day throws in.',
    impact: {
      wasteReduced: '1.2kg Cotton',
      lifespan: '10+ Years',
      materials: ['Organic Cotton', 'Hemp']
    }
  },
  {
    id: 'hb-satchel',
    name: 'Classic Satchel',
    category: 'HANDBAGS',
    subCategory: 'Vintage / Style',
    price: 8900,
    image: '/noble-carry/images/products/handbags/satchel.png',
    description: 'Timeless design meeting modern ethics. A nod to the past with a vision for the future.',
    impact: {
      wasteReduced: '2.0kg Leather Scraps',
      lifespan: '25+ Years',
      materials: ['Upcycled Leather', 'Brass']
    }
  },
  {
    id: 'hb-clutch',
    name: 'Evening Clutch',
    category: 'HANDBAGS',
    subCategory: 'Formal / Event',
    price: 5500,
    image: '/noble-carry/images/products/handbags/clutch.jpeg',
    description: 'Elegant, understated, and completely sustainable. Make a statement without saying a word.',
    impact: {
      wasteReduced: '0.5kg Silk Offcuts',
      lifespan: '15+ Years',
      materials: ['Recycled Silk', 'Bamboo Frame']
    }
  }
];

export const COLORS = {
  sand: '#f4f1ea',
  clay: '#d7bfa2',
  olive: '#556b2f',
  charcoal: '#333333',
  offwhite: '#faf9f6'
};
