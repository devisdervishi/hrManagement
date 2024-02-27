import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DeletedialogUserlistSharedService } from 'src/app/services/componentsSharedServices/deletedialog-userlist-shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'manager-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private deletedialogUserList: DeletedialogUserlistSharedService
  ) {
    deletedialogUserList.updateUserListEmitted$.subscribe((res) => {
      this.getAllUsers();
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
  sortOrder: number = 1;
  users!: User[] | any;
  search!: string;
  getAllUsers() {
    this.users = this.userService.getAllUsers();
  }
  changeSorting() {
    if (this.sortOrder == 0) {
      this.sortOrder = 1;
    } else {
      this.sortOrder = 0;
    }
  }
}
