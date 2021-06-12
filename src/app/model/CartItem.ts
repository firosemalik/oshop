import { Product } from './product';


export interface CartItem {
  key?: string;
  product: Product;
  quantity: number
}
