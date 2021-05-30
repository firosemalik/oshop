import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  activeCategory: string | null = null;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute) {
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
}
