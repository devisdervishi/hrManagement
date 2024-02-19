import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { UserSignUp } from '../models/userSignUp';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url='http://localhost:8080/users'
  constructor(private http:HttpClient) { }

  loadUserByCredentials(username:string,password:string):Observable<User>{
    return this.http.get(`${this.url}/get?username=${username}&password=${password}`)
     .pipe(
      map((response: any) => response as User),
      map((response: User) => response)
     )
  }
  saveUser(userSignUp:UserSignUp):Observable<UserSignUp>{
    return this.http.post(this.url+"/save",userSignUp)
    .pipe(
      map((response: any) => response as UserSignUp)
    )
  }
  usernameUnique(currentUsername:string|null,newUsername:string){
    return this.http.get(`${this.url}/unique?currentUsername=${currentUsername}&newUsername=${newUsername}`)
  }
}
