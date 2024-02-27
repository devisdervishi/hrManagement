import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeSheet } from 'src/app/models/timesheet';
import { TimeSheetService } from 'src/app/services/time-sheet.service';
import { TimesheetDeletedialogSharedService } from 'src/app/services/componentsSharedServices/timesheet-deletedialog-shared.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'user-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent {
  constructor(
    private tsService: TimeSheetService,
    private timeSheetDeleteDialog: TimesheetDeletedialogSharedService,
    public dialog: MatDialog
  ) {}
  @Input('timeSheetToDisplay')
  timeSheet!: TimeSheet;
  datePipe: DatePipe = new DatePipe('en-US');
  @Output('timeSheetWasDeleted')
  tsWasDeleted = new EventEmitter();
  @Output('updateTsClicked')
  updateTs = new EventEmitter();

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.timeSheetDeleteDialog.timeSheet = this.timeSheet;
    this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  sendTsToUpdate() {
    this.updateTs.emit(this.timeSheet);
  }
}
