import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  activeCategory: string | null = null;
  cart: any;
  subscription: Subscription | undefined;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private cartService: ShoppingCartService) {
    productService.getAll().pipe(
      switchMap(product => {
        this.products = product;
        return this.activatedRoute.queryParamMap;
      })
    ).subscribe((params) => {
      this.activeCategory = params.get('category');
      if (this.products) {
        this.filteredProducts = this.activeCategory ? this.products
          .filter(p => p.category === this.activeCategory) : this.products;
      }
    });

  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(
      c => {
        this.cart = c;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
