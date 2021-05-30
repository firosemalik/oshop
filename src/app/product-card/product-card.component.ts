import { Component, Input } from '@angular/core';
import { Product } from '../model/product';


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

  constructor() { }

}
