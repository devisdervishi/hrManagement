import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserRole } from 'src/app/models/enums/userRole.enum';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthserviceAllCompSharedService } from 'src/app/services/componentsSharedServices/authservice-all-comp-shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form!: FormGroup;
  userNotPresent: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private authAllComponents: AuthserviceAllCompSharedService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });
    let emailControl = this.form.get('email');
    let passwordControl = this.form.get('password');
    emailControl?.valueChanges
      .pipe(
        tap(() => {
          this.userNotPresent = false;
        })
      )
      .subscribe();
    passwordControl?.valueChanges
      .pipe(
        tap(() => {
          this.userNotPresent = false;
        })
      )
      .subscribe();
  }
  login() {
    let user: User;
    let formData = this.form.getRawValue();
    this.authService
      .getUserByEmailAndPassword(formData.username, formData.password)
      .pipe(
        tap((res) => {
          user = res;
          if (user) {
            this.userNotPresent = false;
            this.authAllComponents.password = formData.password;
            this.authService.login(user);
            if (user.role == UserRole.MANAGER) {
              this.router.navigate(['manager/main']);
            }
            if (user.role == UserRole.USER) {
              this.router.navigate(['user/main']);
            }
          } else this.userNotPresent = true;
        })
      )
      .subscribe();
  }
}
