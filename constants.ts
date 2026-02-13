
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // HANDBAGS
  {
    id: 'hb-daily',
    name: 'Bamboo',
    category: 'HANDBAGS',
    subCategory: 'Everyday / Casual',
    price: 13850, // ₹13,850
    image: '/noble-carry/images/products/handbags/daily_final.png',
    gallery: [
      '/noble-carry/images/products/handbags/daily_final.png'
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
    name: 'Galleria',
    category: 'HANDBAGS',
    subCategory: 'Corporate / Structured',
    price: 15400, // ₹15,400
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
    price: 13200, // ₹13,200
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
    price: 14500, // ₹14,500
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
    name: 'Kelly',
    category: 'HANDBAGS',
    subCategory: 'Vintage / Style',
    price: 15100, // ₹15,100
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
    price: 13600, // ₹13,600
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
