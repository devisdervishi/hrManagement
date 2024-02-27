import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-manager-main-page',
  templateUrl: './manager-main-page.component.html',
  styleUrls: ['./manager-main-page.component.scss'],
})
export class ManagerMainPageComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
