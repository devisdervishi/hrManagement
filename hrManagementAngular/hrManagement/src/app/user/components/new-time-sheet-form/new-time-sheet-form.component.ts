import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TimeSheetSaveRequest } from 'src/app/models/timeSheetSaveRequest';
import { TimeSheetService } from 'src/app/services/time-sheet.service';

@Component({
  selector: 'user-new-time-sheet-form',
  templateUrl: './new-time-sheet-form.component.html',
  styleUrls: ['./new-time-sheet-form.component.scss'],
})

export class NewTimeSheetFormComponent {
  minDate:Date
  maxDate:Date
  constructor(private fb:FormBuilder,private timeSheetService:TimeSheetService){
    this.minDate=new Date()
    this.maxDate=new Date(new Date().getFullYear(),11,31)
  }
  
  form =this.fb.group(
    {
      fromDate: [,{validators:[Validators.required]}],
      toDate: [,{validators:[Validators.required]}],
      note: [],
      createdBy:[localStorage.getItem('USER_USERNAME')]
    }
  )
  
  makeTimeSheetRequest(){
    let tsToBeRequested:TimeSheetSaveRequest=this.form.getRawValue()
    this.timeSheetService.saveTimeSheet(tsToBeRequested,Number(localStorage.getItem('USER_ID')))
    .subscribe()
  }
}
