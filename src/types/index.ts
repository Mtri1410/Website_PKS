export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  nameVi?: string;
  category: string;
  categoryVi?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  image: string;
  description: string;
  descriptionVi?: string;
  sizes: string[];
  colors: ColorOption[];
  tags?: string[];
  features?: string[];
  featuresVi?: string[];
  howToUse?: string;
  howToUseVi?: string;
  ingredients?: string;
  ingredientsVi?: string;
  material?: string;
  materialVi?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ColorOption;
  quantity: number;
}
