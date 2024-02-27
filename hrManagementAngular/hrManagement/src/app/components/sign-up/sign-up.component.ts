import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignUp } from 'src/app/models/userSignUp';
import { UserService } from 'src/app/services/user.service';
import { UniqueUsername } from 'src/app/validations/uniqueUsername.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private uniqueUsername: UniqueUsername,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(45)],
        },
      ],
      lastName: ['', [Validators.required, Validators.maxLength(45)]],

      username: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(45)],
          asyncValidators: [
            this.uniqueUsername.validate.bind(this.uniqueUsername),
          ],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(45)],
        },
      ],
    });
  }

  signUp() {
    const data = this.form.getRawValue();
    let userSignUp: UserSignUp = data;
    this.userService.saveUser(userSignUp).subscribe();
    this.form.reset();
    this.router.navigate(['/login']);
  }
}
