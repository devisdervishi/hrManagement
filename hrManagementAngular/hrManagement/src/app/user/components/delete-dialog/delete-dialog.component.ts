import { Component } from '@angular/core';
import { TimeSheet } from 'src/app/models/timesheet';
import { DeletedialogTslistSharedService } from 'src/app/services/componentsSharedServices/deletedialog-tslist-shared.service';
import { TimeSheetService } from 'src/app/services/time-sheet.service';
import { TimesheetDeletedialogSharedService } from 'src/app/services/componentsSharedServices/timesheet-deletedialog-shared.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    private timeSheetDeleteDialog: TimesheetDeletedialogSharedService,
    private tsService: TimeSheetService,
    private deleteDialogTsListShared: DeletedialogTslistSharedService
  ) {}
  timeSheet: TimeSheet = this.timeSheetDeleteDialog.timeSheet;

  deleteTimeSheet() {
    this.tsService.deleteTimeSheet(this.timeSheet.id).subscribe({
      next: () => {
        this.deleteDialogTsListShared.emitUpdateList('');
      },
    });
  }
}
