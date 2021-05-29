import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './model/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private database: AngularFireDatabase) { }

  public create(product: any) {
    this.database.list('/products').push(product);
  }

  public getAll(): Observable<Product[]> {
    return this.database.list<Product>('/products').snapshotChanges()
      .pipe(map(changes => {
        return changes.map(p => ({ key: p.payload.key, ...p.payload.val() } as Product))
      }));
  }

  public get(id: string): Observable<Product> {
    return this.database.object<Product>('/products/' + id).snapshotChanges()
      .pipe(map(changes => {
        return { key: changes.payload.key, ...changes.payload.val() } as Product
      }))
  }

  public update(id: string, product: any) {
    this.database.object('/products/' + id).update(product).catch(e => console.log(e));

  }

  public delete(id: string) {
    this.database.object('/products/' + id).remove();
  }
}
