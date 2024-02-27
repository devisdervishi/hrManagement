import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeSheetSatus } from 'src/app/models/enums/tsStatus.enum';
import { TimeSheetUpdateManagerRequest } from 'src/app/models/timeSheetManagerUpdateRequest';
import { TimeSheet } from 'src/app/models/timesheet';
import { AuthserviceAllCompSharedService } from 'src/app/services/componentsSharedServices/authservice-all-comp-shared.service';
import { TimeSheetService } from 'src/app/services/time-sheet.service';

@Component({
  selector: 'manager-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent {
  constructor(
    private timeSheetService: TimeSheetService,
    private authServiceAllComp: AuthserviceAllCompSharedService
  ) {}
  @Input()
  timeSheet!: TimeSheet;
  @Output('tsWasEdited')
  tsWasEdited = new EventEmitter();
  editTimeSheetStatus(status: string) {
    let updateTsManager: TimeSheetUpdateManagerRequest =
      new TimeSheetUpdateManagerRequest();
    if (status == 'APPROVED') {
      updateTsManager.status = TimeSheetSatus.APPROVED;
    } else if (status == 'REJECTED') {
      updateTsManager.status = TimeSheetSatus.REJECTED;
    }
    updateTsManager.modifiedBy = this.authServiceAllComp.username;
    this.timeSheetService
      .updateTimeSheetManager(updateTsManager, this.timeSheet.id)
      .subscribe({
        next: () => {
          this.tsWasEdited.emit();
        },
      });
  }
}
