import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserDeletedialogSharedService {
  constructor() {}
  user!: User;
}
