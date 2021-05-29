import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './model/user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  public login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new GoogleAuthProvider()).then(() => console.log('login'));
  }

  public logout() {
    this.afAuth.signOut().then(() => console.log('logout'));
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return of(null);
      }));
  }

}
