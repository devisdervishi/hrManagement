import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceAllCompSharedService {
  constructor() {}
  username!: string | null;
  password!: string | null;
  state!: boolean;
  id!: number | null;
  role!: string | null;
  firstname!: string | null;
  lastname!: string | null;
  daysoff!: number | null;
  usernameToUpdate!: string | null;

  clearData() {
    this.username = null;
    this.password = null;
    this.state = false;
    this.id = null;
    this.role = null;
    this.firstname = null;
    this.lastname = null;
    this.daysoff = null;
    this.usernameToUpdate = null;
  }
}
