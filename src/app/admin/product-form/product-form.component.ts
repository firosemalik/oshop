import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Observable } from 'rxjs';
import { Category } from '../../model/category';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../../model/product';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;
  product: Product = {};
  id = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();

    if (this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  ngOnInit(): void {
  }

  save(product: any) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are you sure ?')) return;

    if (this.id) {
      this.productService.delete(this.id);
    }
    this.router.navigate(['/admin/products']);
  }
}
