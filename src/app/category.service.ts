import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Category } from './model/category';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private database: AngularFireDatabase) { }

  public getCategories(): Observable<Category[]> {
    return this.database.list<Category>('/categories', ref => {
      return ref.orderByValue()
    }).valueChanges();
  }
}
