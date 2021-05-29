import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../model/product';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[] | undefined;
  filteredProducts: Product[] | undefined;
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
    })
  }

  ngOnInit(): void {
  }

  filter(query: string) {
    this.filteredProducts = (query) ? this.products?.filter(
      p => p.title?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase())) : this.products

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
