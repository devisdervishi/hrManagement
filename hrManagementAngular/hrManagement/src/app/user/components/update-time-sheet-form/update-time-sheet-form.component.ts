import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TimeSheetUpdateUserRequest } from 'src/app/models/timeSheetUserUpdateRequest';
import { TimeSheet } from 'src/app/models/timesheet';
import { TimeSheetService } from 'src/app/services/time-sheet.service';
import { UpdatetsUserListSharedService } from 'src/app/services/componentsSharedServices/updatets-userlist-shared.service';
import { EditedTsExceed } from 'src/app/validations/editedTsExceedDaysOff.validator';
import { EditedTsOverlap } from 'src/app/validations/editedTsOverlap.validator';

@Component({
  selector: 'user-update-time-sheet-form',
  templateUrl: './update-time-sheet-form.component.html',
  styleUrls: ['./update-time-sheet-form.component.scss'],
})
export class UpdateTimeSheetFormComponent {
  constructor(
    private tshService: TimeSheetService,
    private fb: FormBuilder,
    private editedTsOverlap: EditedTsOverlap,
    private editedTsExceed: EditedTsExceed,
    private updateTs_userListService: UpdatetsUserListSharedService
  ) {
    let currentDate = new Date();
    currentDate.setDate(new Date().getDate() + 1);
    this.minDate = currentDate;
    this.maxDate = new Date(new Date().getFullYear(), 11, 31);
    updateTs_userListService.updateTsEmitted$.subscribe((timeSheet) => {
      this.timeSheetToBeUpdated = timeSheet;
      this.fillUpdateTsForm();
    });
  }
  minDate: Date;
  maxDate: Date;
  form: FormGroup = this.fb.group({
    fromDate: [],
    toDate: [],
    note: [],
    modifiedBy: [],
    id: [],
  });
  timeSheetToBeUpdated!: TimeSheet | null;
  fillUpdateTsForm() {
    let toDate = new FormControl(this.timeSheetToBeUpdated!.toDate, {
      validators: [Validators.required],
    });
    this.form = this.fb.group({
      fromDate: [
        this.timeSheetToBeUpdated!.fromDate,
        { validators: [Validators.required] },
      ],
      note: [this.timeSheetToBeUpdated!.note],
      modifiedBy: [localStorage.getItem('USER_USERNAME')],
      id: [this.timeSheetToBeUpdated?.id],
    });
    this.form.addControl('toDate', toDate);
    toDate.addAsyncValidators(
      this.editedTsOverlap.validate.bind(this.editedTsOverlap)
    );
    toDate.addAsyncValidators(
      this.editedTsExceed.validate.bind(this.editedTsExceed)
    );
  }

  updateTimeSheet() {
    let tsUpdateUserReq: TimeSheetUpdateUserRequest = this.form.getRawValue();
    this.tshService
      .updateTimeSheetUser(tsUpdateUserReq, this.timeSheetToBeUpdated?.id)
      .subscribe({
        next: () => {
          {
            this.updateTs_userListService.emitUpdateList('');
            this.hideUpdateTsForm();
          }
        },
      });
  }
  hideUpdateTsForm() {
    this.timeSheetToBeUpdated = null;
  }
}
