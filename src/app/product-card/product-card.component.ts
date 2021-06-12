import { Component, Input } from '@angular/core';
import { Product } from '../model/product';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product')
  product: Product = {};

  @Input('showActions')
  showActions: boolean = true;

  @Input('shopping-cart')
  shoppingCart: any;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity() {
    let item;
    if (this.shoppingCart && this.product && this.product.key) {
      item = this.shoppingCart.items[this.product.key];
    }
    return item ? item.quantity : 0;

  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
