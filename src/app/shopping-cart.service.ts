import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './model/product';
import { first, map } from 'rxjs/operators';
import { CartItem } from './model/CartItem';
import { ShoppingCart } from './model/shopping-cart';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  public async addToCart(product: Product) {
    this.updateItem(product, +1);
  }

  public async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCart();
    console.log(cartId, product)
    if (cartId && product && product.key) {
      const items$ = this.getItem(cartId, product.key);
      items$.snapshotChanges().pipe(first()).subscribe(item => {
        const payload = item.payload.val();
        if (item.key && payload) {
          items$.update({ quantity: payload.quantity + change });
        } else {
          console.log('adding');
          items$.set(new CartItem(product, 1));
        }
      });
    }
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

  public async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCart();
    return this.db.object<ShoppingCart>('/shopping-cart/' + cartId).valueChanges()
      .pipe(map(changes => new ShoppingCart(changes?.items, changes?.dateCreated)));
  };

  private getItem(cartId: string, productKey: string) {
    return this.db.object<CartItem>('/shopping-cart/' + cartId + '/items/' + productKey);
  }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

}
