export default interface ProductInterface {
  name: string;
  description: string;
  brand: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  specs?: {
    height?: number;
    width?: number;
    depth?: number;
  };
  discount?: number;
  isFeatured: boolean;
  views: number;
  isLive: boolean;
}
