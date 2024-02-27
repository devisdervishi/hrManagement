import { Component, OnInit } from '@angular/core';
import { TimeSheet } from 'src/app/models/timesheet';
import { AuthserviceAllCompSharedService } from 'src/app/services/componentsSharedServices/authservice-all-comp-shared.service';
import { DeletedialogTslistSharedService } from 'src/app/services/componentsSharedServices/deletedialog-tslist-shared.service';
import { NewtsUserlistSharedService } from 'src/app/services/componentsSharedServices/newts-userlist-shared.service';
import { TimeSheetService } from 'src/app/services/time-sheet.service';
import { UpdatetsUserListSharedService } from 'src/app/services/componentsSharedServices/updatets-userlist-shared.service';

@Component({
  selector: 'user-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss'],
})
export class TimesheetListComponent implements OnInit {
  constructor(
    private tshService: TimeSheetService,
    private updateTs_userListService: UpdatetsUserListSharedService,
    private newTs_userListService: NewtsUserlistSharedService,
    private authServiceAllComp: AuthserviceAllCompSharedService,
    private deleteDialogTsListShared: DeletedialogTslistSharedService
  ) {
    updateTs_userListService.updateTsListEmitted$.subscribe((res) => {
      this.loadTimeSheets();
    });
    this.newTs_userListService.updateTsListEmitted$.subscribe((res) => {
      this.loadTimeSheets();
    });
    deleteDialogTsListShared.updateTsListEmitted$.subscribe((res) => {
      this.loadTimeSheets();
    });
  }
  timeSheets!: TimeSheet[] | any;
  timeSheetToBeUpdated!: TimeSheet | null;

  loadTimeSheets() {
    this.timeSheets = this.tshService.getTimeSheetsByUserId(
      Number(this.authServiceAllComp.id)
    );
  }
  ngOnInit(): void {
    this.loadTimeSheets();
  }
  getTimeSheetToBeUpdated(event: TimeSheet) {
    this.timeSheetToBeUpdated = event;
    this.updateTs_userListService.emitUpdate(this.timeSheetToBeUpdated);
  }
}
