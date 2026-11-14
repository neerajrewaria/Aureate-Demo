/*
  AUREATE — Centralized Product Data
  ====================================
  Contains specifications, pricing, imagery, and helper functions for AUREATE.
  
  Contains strictly the three confirmed products with authentic supplied photography:
  1. Magnesium Complex (02_Magnesium_Complex_Product.jpg)
  2. Omega-3 (03_Omega3_Product.jpg)
  3. Daily Wellness Greens (04_Daily_Wellness_Greens_Box.jpg)
  
  INTERNAL DEVELOPER NOTE (NOT FOR PUBLIC UI):
  The physical label on the supplied photographic bottles reads "Aurite" as a
  pre-production printing reference. Confirmed website brand is "Aureate".
  Source product images are slated for artwork alignment before public commercial launch.
*/

import type { Product, ProductCategory } from '@/types';

// Authentic supplied product photography
import magnesiumImg from '@/assets/brand/02_Magnesium_Complex_Product.jpg';
import omega3Img from '@/assets/brand/03_Omega3_Product.jpg';
import greensImg from '@/assets/brand/04_Daily_Wellness_Greens_Box.jpg';

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'all', label: 'All Formulations' },
  { value: 'supplements', label: 'Supplements & Minerals' },
];

export const PRODUCTS: Product[] = [
  // ── 1. Magnesium Complex ──
  {
    id: 'prod-magnesium',
    name: 'Magnesium Complex',
    slug: 'magnesium-complex',
    category: 'supplements',
    price: 899,
    shortDescription:
      'A multi-form magnesium complex formulated to support muscle relaxation and evening calm.',
    description:
      'Aureate Magnesium Complex is formulated to support everyday muscle relaxation and calm evening routines. Mindfully composed using quality mineral forms with transparent ingredient selection.',
    ingredients: ['Magnesium Glycinate', 'Magnesium Malate', 'Vegetable Capsule'],
    benefits: [
      'Supports everyday muscle relaxation',
      'Encourages calm evening routines',
      'Gentle, well-tolerated formulation',
      'Free from artificial colors or fillers',
    ],
    usageInstructions: 'Take 2 capsules daily with water, preferably in the evening.',
    servingSize: '60 Vegetarian Capsules',
    images: [magnesiumImg],
    inStock: true,
    stockCount: 150,
    sku: 'AUR-NUT-001',
    tags: ['magnesium', 'relaxation', 'calm'],
  },

  // ── 2. Omega-3 ──
  {
    id: 'prod-omega3',
    name: 'Omega-3',
    slug: 'omega-3',
    category: 'supplements',
    price: 1099,
    shortDescription:
      'Essential fatty acid formulation delivering concentrated EPA and DHA for everyday vitality.',
    description:
      'Aureate Omega-3 delivers essential fatty acids (EPA and DHA) in balanced proportions to support daily cognitive vitality, heart nourishment, and joint comfort.',
    ingredients: ['Purified Marine Oil Concentrate (EPA/DHA)', 'Natural Mixed Tocopherols'],
    benefits: [
      'Provides essential EPA and DHA fatty acids',
      'Supports cognitive clarity and daily focus',
      'Nourishes joint comfort and vitality',
      'Quality tested for purity and freshness',
    ],
    usageInstructions: 'Take 1 to 2 softgels daily with a meal.',
    servingSize: '60 Concentrated Softgels',
    images: [omega3Img],
    inStock: true,
    stockCount: 120,
    sku: 'AUR-NUT-002',
    tags: ['omega3', 'dha', 'epa', 'heart', 'brain'],
  },

  // ── 3. Daily Wellness Greens ──
  {
    id: 'prod-greens',
    name: 'Daily Wellness Greens',
    slug: 'daily-wellness-greens',
    category: 'supplements',
    price: 1299,
    shortDescription:
      'Whole-food superfood greens blend combining spirulina, chlorella, and young wheatgrass.',
    description:
      'Aureate Daily Wellness Greens combines whole cereal grasses and microalgae into a smooth, refreshing morning drink. A straightforward foundation for everyday vitality.',
    ingredients: ['Spirulina Powder', 'Chlorella Powder', 'Wheatgrass Juice Powder', 'Barley Grass', 'Moringa Leaf'],
    benefits: [
      'Whole-food botanical superfoods',
      'Nutrient-dense daily morning ritual',
      'Naturally rich in chlorophyll',
      'Clean, gentle botanical taste',
    ],
    usageInstructions: 'Mix 1 scoop into 250ml of water or your morning smoothie.',
    servingSize: '200g Powder (30 Servings)',
    images: [greensImg],
    inStock: true,
    stockCount: 95,
    sku: 'AUR-NUT-003',
    tags: ['greens', 'superfoods', 'spirulina', 'vitality'],
  },
];

// Helper: find product by URL slug
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

// Helper: get related products (excluding current)
export function getRelatedProducts(currentProductId: string, _category?: string, limit = 2): Product[] {
  return PRODUCTS.filter((p) => p.id !== currentProductId).slice(0, limit);
}

// Helper: get all 3 products for featured showcases
export function getFeaturedProducts(): Product[] {
  return PRODUCTS;
}
