import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { AppUser } from './model/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private database: AngularFireDatabase) { }

  public save(user: firebase.User) {
    this.database.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  public get(uid: String): Observable<AppUser | null> {
    return this.database.object<AppUser>('/users/' + uid).valueChanges();
  }
}
