import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { UpdateUser } from 'src/app/models/updateUser';
import { User } from 'src/app/models/user';
import { AuthserviceAllCompSharedService } from 'src/app/services/componentsSharedServices/authservice-all-comp-shared.service';
import { UserService } from 'src/app/services/user.service';
import { UniqueUsername } from 'src/app/validations/uniqueUsername.validator';

@Component({
  selector: 'manager-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;
  user!: User;
  constructor(
    private fb: FormBuilder,
    private uniqueUsername: UniqueUsername,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authServAllComp: AuthserviceAllCompSharedService
  ) {}
  ngOnInit(): void {
    this.initForm();
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = routeParams.get('userId');
    this.userService
      .getUser(Number(this.myDecryptor(userIdFromRoute)))
      .pipe(
        tap((res) => {
          this.user = res;
        })
      )
      .subscribe({
        next: () => {
          this.setForm();
          this.authServAllComp.usernameToUpdate = this.user.username;
        },
      });
  }
  initForm() {
    this.form = this.fb.group({
      firstName: [],
      lastName: [],
      username: [],
    });
  }
  setForm() {
    this.form = this.fb.group({
      firstName: [
        this.user.firstName,
        {
          validators: [Validators.required, Validators.maxLength(45)],
        },
      ],
      lastName: [
        this.user.lastName,
        [Validators.required, Validators.maxLength(45)],
      ],

      username: [
        this.user.username,
        {
          validators: [Validators.required, Validators.maxLength(45)],
          asyncValidators: [
            this.uniqueUsername.validate.bind(this.uniqueUsername),
          ],
        },
      ],
    });
  }
  editUser() {
    const data = this.form.getRawValue();
    let userUpdate: UpdateUser = data;
    let managerId = Number(this.authServAllComp.id);
    this.userService.updateUser(managerId, this.user.id, userUpdate).subscribe({
      next: () => {
        if (this.user.id == managerId) {
          this.authServAllComp.firstname = data.firstName;
          this.authServAllComp.lastname = data.lastName;
          this.authServAllComp.username = data.username;
          this.authServAllComp.usernameToUpdate = data.username;
        }
        this.router.navigate(['manager/main']);
      },
    });
  }
  myDecryptor(text: string | null) {
    text = text!.substring(21, text!.length - 22);
    let decrypted = '';
    for (let i = 0; i < text.length; i++) {
      let ascii = text.charCodeAt(i);
      ascii = ascii - 37;
      ascii = ascii / 5;
      decrypted += String.fromCharCode(ascii);
    }
    return decrypted;
  }
}
