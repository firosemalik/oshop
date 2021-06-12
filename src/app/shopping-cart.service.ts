import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './model/product';
import { first } from 'rxjs/operators';
import { CartItem } from './model/CartItem';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  public async addToCart(product: Product) {
    const cartId = await this.getOrCreateCart();
    const items$ = this.db.object<CartItem>('/shopping-cart/' + cartId + '/items/' + product.key);

    items$.snapshotChanges().pipe(first()).subscribe(item => {
      const payload = item.payload.val();
      console.log(payload);
      if (item.key && payload) {
        items$.update({ quantity: payload.quantity + 1 });
      } else {

        items$.set({ product: product, quantity: 1 });
      }
    });
  }

  private async getOrCreateCart() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key ? result.key : '');
    return result.key;
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-cart/' + cartId).snapshotChanges();
  }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

}
