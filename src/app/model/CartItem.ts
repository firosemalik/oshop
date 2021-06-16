import { Product } from './product';


export class CartItem {
  key?: string;
  product: Product = {};
  quantity: number = 0;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity
  }

  get totalPrice(): number {
    if (this.quantity > 0 && this.product && this.product.price) {
      return this.quantity * this.product.price;
    }
    return 0;
  }


}
