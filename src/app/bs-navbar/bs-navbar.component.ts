import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../model/user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../model/shopping-cart';
import { Observable } from 'rxjs';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser | null = null;
  cartChanges$: Observable<ShoppingCart | null> | undefined;

  constructor(private authService: AuthService,
              private cartService: ShoppingCartService) {}

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    const cart$ = await this.cartService.getCart();
    this.cartChanges$ = cart$
  }

}
