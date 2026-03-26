export interface Artwork {
  slug: string;
  title: string;
  medium: string;
  dimensions: string;
  year: number;
  price: number;
  currency: string;
  sold: boolean;
  featured: boolean;
  images: string[];
  description: string;
}
