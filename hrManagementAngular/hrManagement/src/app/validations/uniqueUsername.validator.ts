import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: 'root' })

export class UniqueUsername implements AsyncValidator {
  constructor(private userService: UserService) {}
    
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.usernameUnique(localStorage.getItem('USERTOUPDATE_USERNAME'),control.value).pipe(
      map((isUnique) => (isUnique ? { unique: true } : null)),
      catchError(() => of(null)),
    );
  }
}