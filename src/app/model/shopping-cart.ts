import { CartItem } from './CartItem';


export class ShoppingCart {
  dateCreated?: string;
  items?: { [key: string]: CartItem };
  itemArr: CartItem[] = [];

  constructor(items: { [key: string]: CartItem } | undefined, dateCreated: string | undefined) {
    this.items = items;
    this.dateCreated = dateCreated;

    for (let productId in this.items) {
      const cartItem = this.items[productId];
      this.itemArr.push(new CartItem(cartItem.product, cartItem.quantity));
    }

  }

  get totalCount(): number {
    let numberOfItem = 0;
    for (let p in this.items) {
      // @ts-ignore
      const cartItem = this.items[p];
      numberOfItem = numberOfItem + cartItem.quantity
    }
    return numberOfItem;
  }

  get totalPrice(): number {
    let sum = 0;
    if (this.items) {
      this.itemArr.forEach(i => sum += i.totalPrice)
    }
    return sum;
  }

}
