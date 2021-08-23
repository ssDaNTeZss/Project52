import {TechSpec} from "./techSpec.model";
import {Image} from "./image.model";

export interface Product {
  brand: string;
  category: string;
  config: string;
  description: string;
  id: number;
  img: string;
  name: string;
  popularity: number;
  price: number;
  rating: number;
  techSpec: TechSpec[];
  images: Image[];
}
