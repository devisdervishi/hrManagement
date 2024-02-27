import { Injectable } from '@angular/core';
import { TimeSheet } from '../../models/timesheet';

@Injectable({
  providedIn: 'root',
})
export class TimesheetDeletedialogSharedService {
  constructor() {}
  timeSheet!: TimeSheet;
}
