import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    authService.user$.subscribe(user => {
      const url = localStorage.getItem('returnUrl') || '';
      if (user) {
        this.userService.save(user);
        this.router.navigateByUrl(url);
      }
    })
  }


}
