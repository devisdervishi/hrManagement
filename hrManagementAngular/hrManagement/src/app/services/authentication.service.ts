import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private userService:UserService) {}
  
  login(user: User) {
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('USER_ROLE', user.role);
    localStorage.setItem('USER_ID',user.id+"");
    localStorage.setItem('USER_USERNAME',user.username)
    localStorage.setItem('USER_FIRSTNAME',user.firstName)
    localStorage.setItem('USER_LASTNAME',user.lastName)
  }
  logout() {
    localStorage.clear()
  }
  isLoggedIn() {
    return localStorage.getItem('STATE');
  }
  getRole() {
    return localStorage.getItem('USER_ROLE')!;
  }
  getUserByEmailAndPassword(username:string,password:string):Observable<User>{
    return this.userService.loadUserByCredentials(username,password)  
  }
}
