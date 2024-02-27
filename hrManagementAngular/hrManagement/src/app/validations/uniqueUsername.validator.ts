import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { UserService } from "../services/user.service";
import { AuthserviceAllCompSharedService } from "../services/componentsSharedServices/authservice-all-comp-shared.service";

@Injectable({ providedIn: 'root' })

export class UniqueUsername implements AsyncValidator {
  constructor(private userService: UserService
    ,private authServiceAllComp:AuthserviceAllCompSharedService) {}
    
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.usernameUnique(this.authServiceAllComp.usernameToUpdate,control.value).pipe(
      map((isUnique) => (isUnique ? { unique: true } : null)),
      catchError(() => of(null)),
    );
  }
}