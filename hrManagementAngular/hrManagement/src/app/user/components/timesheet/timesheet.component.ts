import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tap } from 'rxjs';
import { TimeSheet } from 'src/app/models/timesheet';
import { TimeSheetService } from 'src/app/services/time-sheet.service';

@Component({
  selector: 'user-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent {

  constructor(private tsService:TimeSheetService){

  }
  @Input('timeSheetToDisplay')
  timeSheet!:TimeSheet
  datePipe:DatePipe=new DatePipe('en-US')
  @Output("timeSheetWasDeleted")
  tsWasDeleted=new EventEmitter()

  deleteTimeSheet(){
    if (confirm("Are you sure you want to delete this time sheet request:\n"
    +this.datePipe.transform(this.timeSheet.fromDate,"yyyy:MM:dd")+"-"
    +this.datePipe.transform(this.timeSheet.toDate,"yyyy:MM:dd"))){
    this.tsService.deleteTimeSheet(this.timeSheet.id)
    .pipe(
      tap((res)=>{alert(res.message)})
    ).subscribe({
      next:()=>{
        this.tsWasDeleted.emit()
      }
    }
    )
  }
}
}
