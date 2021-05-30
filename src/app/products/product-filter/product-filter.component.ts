import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../model/category';
import { CategoryService } from '../../category.service';


@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  category$: Observable<Category[]>;

  @Input('category')
  activeCategory: string | null = null;

  constructor(private categoryService: CategoryService) {
    this.category$ = categoryService.getAll();
  }

  ngOnInit(): void {
  }

}
