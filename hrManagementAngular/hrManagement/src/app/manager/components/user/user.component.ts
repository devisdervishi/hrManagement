import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { TimeSheetSatus } from 'src/app/models/enums/tsStatus.enum';
import { User } from 'src/app/models/user';
import { AuthserviceAllCompSharedService } from 'src/app/services/componentsSharedServices/authservice-all-comp-shared.service';
import { TimeSheetService } from 'src/app/services/time-sheet.service';
import { UserDeletedialogSharedService } from 'src/app/services/componentsSharedServices/user-deletedialog-shared.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'manager-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private timeSheetService: TimeSheetService,
    private userDeleteDialog: UserDeletedialogSharedService,
    private authServiceAllComp: AuthserviceAllCompSharedService,
    public dialog: MatDialog
  ) {}

  @Input()
  user!: User;
  isPendingData!: boolean;
  @Output('userDeleted')
  userDeleted = new EventEmitter();
  managerId: number = Number(this.authServiceAllComp.id);
  ngOnInit(): void {
    this.timeSheetService
      .getTimeSheetsByUserId(this.user.id)
      .pipe(
        tap((res) => {
          let index = res.findIndex(
            (ts) => ts.status == TimeSheetSatus.PENDING
          );
          if(res.length!=0){
          let latestTs = res.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
              return -1;
            } else if (a.createdAt < b.createdAt) {
              return 1;
            } else return 0;
          })[0].createdAt;
          this.user.latestTimeSheet = latestTs;
        }
          if (index == -1) {
            this.isPendingData = false;
          } else {
            this.isPendingData = true;
          }
        })
      )
      .subscribe();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.userDeleteDialog.user = this.user;
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  myEncryptor(text: string) {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
      let ascii = text.charCodeAt(i);
      ascii = ascii * 5 + 37;
      encrypted += String.fromCharCode(ascii);
    }
    return 'i3EZUpMYrWhpjMZnhdgNdg' + encrypted + 'HOr7AbPiDPTuac1SEigleA';
  }
}
