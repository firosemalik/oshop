import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../model/user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appUser: AppUser | null = null;

  constructor(private authService: AuthService) {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser)
  }

  logout() {
    this.authService.logout();
  }
}
