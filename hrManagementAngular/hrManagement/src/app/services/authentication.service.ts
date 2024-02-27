import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthserviceAllCompSharedService } from './componentsSharedServices/authservice-all-comp-shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private authservice_AllComp: AuthserviceAllCompSharedService
  ) {}

  login(user: User) {
    this.authservice_AllComp.state = true;
    this.authservice_AllComp.role = user.role;
    this.authservice_AllComp.id = user.id;
    this.authservice_AllComp.username = user.username;
    this.authservice_AllComp.firstname = user.firstName;
    this.authservice_AllComp.lastname = user.lastName;
    this.authservice_AllComp.daysoff = user.daysOff;
  }
  logout() {
    this.authservice_AllComp.clearData();
  }
  isLoggedIn() {
    return this.authservice_AllComp.state;
  }
  getRole() {
    return this.authservice_AllComp.role;
  }
  getUserByEmailAndPassword(username: string,password: string): Observable<User> {
    return this.userService.loadUserByCredentials(username, password);
  }
}
