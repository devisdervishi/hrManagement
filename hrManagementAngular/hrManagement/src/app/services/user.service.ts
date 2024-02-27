import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { UserSignUp } from '../models/userSignUp';
import { UpdateUser } from '../models/updateUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080/users';
  constructor(private http: HttpClient) {}

  loadUserByCredentials(username: string, password: string): Observable<User> {
    return this.http
      .get(`${this.url}/get?username=${username}&password=${password}`)
      .pipe(
        map((response: any) => response as User),
        map((response: User) => response)
      );
  }
  getUser(userId: number) {
    return this.http.get(this.url + '/get/' + userId).pipe(
      map((response: any) => response as User),
      map((response: User) => response)
    );
  }
  updateUser(managerId: number, userId: number, updateUser: UpdateUser) {
    return this.http.patch(
      this.url + '/update/' + userId + '/' + managerId,
      updateUser
    );
  }
  saveUser(userSignUp: UserSignUp): Observable<UserSignUp> {
    return this.http
      .post(this.url + '/save', userSignUp)
      .pipe(map((response: any) => response as UserSignUp));
  }
  deleteUser(userId: number) {
    return this.http.delete(this.url + '/delete/' + userId);
  }
  getAllUsers() {
    return this.http.get(this.url + '/getAll').pipe(
      map((res) => res as User[]),
      map((res: User[]) => res)
    );
  }
  usernameUnique(currentUsername: string | null, newUsername: string) {
    return this.http.get(
      `${this.url}/unique?currentUsername=${currentUsername}&newUsername=${newUsername}`
    );
  }
}
