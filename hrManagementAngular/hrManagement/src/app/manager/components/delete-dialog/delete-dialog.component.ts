import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { DeletedialogUserlistSharedService } from 'src/app/services/componentsSharedServices/deletedialog-userlist-shared.service';
import { UserDeletedialogSharedService } from 'src/app/services/componentsSharedServices/user-deletedialog-shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    private deletedialogUserList: DeletedialogUserlistSharedService,
    private userDeleteDialog: UserDeletedialogSharedService,
    private userService: UserService
  ) {}
  user: User = this.userDeleteDialog.user;

  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe({
      next: (res) => {
        this.deletedialogUserList.emitUpdateList('');
      },
    });
  }
}
