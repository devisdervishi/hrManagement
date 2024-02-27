import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TimeSheetSaveRequest } from 'src/app/models/timeSheetSaveRequest';
import { AuthserviceAllCompSharedService } from 'src/app/services/componentsSharedServices/authservice-all-comp-shared.service';
import { NewtsUserlistSharedService } from 'src/app/services/componentsSharedServices/newts-userlist-shared.service';
import { TimeSheetService } from 'src/app/services/time-sheet.service';
import { NewTsExceed } from 'src/app/validations/newTsExceedDaysOff.validator';
import { NewTsOverlap } from 'src/app/validations/newTsOverlap.validator';

@Component({
  selector: 'user-new-time-sheet-form',
  templateUrl: './new-time-sheet-form.component.html',
  styleUrls: ['./new-time-sheet-form.component.scss'],
})
export class NewTimeSheetFormComponent {
  minDate: Date;
  maxDate: Date;
  form!: FormGroup;
  @Output('newTsAdded')
  newTsAdded = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private timeSheetService: TimeSheetService,
    private newTsOverlaps: NewTsOverlap,
    private newTsExceeds: NewTsExceed,
    private newTs_userListService: NewtsUserlistSharedService,
    private authServiceAllComp: AuthserviceAllCompSharedService
  ) {
    let currentDate = new Date();
    currentDate.setDate(new Date().getDate() + 1);
    this.minDate = currentDate;
    this.maxDate = new Date(new Date().getFullYear(), 11, 31);
    this.form = this.fb.group({
      fromDate: [, { validators: [Validators.required] }],
      toDate: [
        ,
        {
          validators: [Validators.required],
          asyncValidators: [
            this.newTsOverlaps.validate.bind(this.newTsOverlaps),
            this.newTsExceeds.validate.bind(this.newTsExceeds),
          ],
        },
      ],
      note: [],
      createdBy: [authServiceAllComp.username],
    });
  }

  makeTimeSheetRequest() {
    let tsToBeRequested: TimeSheetSaveRequest = this.form.getRawValue();
    this.timeSheetService
      .saveTimeSheet(tsToBeRequested, Number(this.authServiceAllComp.id))
      .subscribe({
        next: () => {
          this.form.reset();
          this.newTsAdded.emit();
          this.newTs_userListService.emitUpdateList('');
        },
        error(err) {
          console.log(err);
        },
      });
  }
}
