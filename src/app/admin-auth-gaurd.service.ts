import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from './model/user';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService implements CanActivate {

  constructor(private authService: AuthService, private route: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.appUser$.pipe(
      map((appUser) => {
        if (appUser) {
          const user = appUser as AppUser;
          return user.isAdmin;
        }
        return false;
      })
    );
  }
}
