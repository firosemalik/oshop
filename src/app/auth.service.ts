import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

  public login() {
    this.afAuth.signInWithRedirect(new GoogleAuthProvider()).then(() => console.log('login'));
  }

  public logout() {
    this.afAuth.signOut().then(() => console.log('logout'));
  }

}
