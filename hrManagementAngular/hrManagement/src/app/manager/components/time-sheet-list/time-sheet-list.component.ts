import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSheet } from 'src/app/models/timesheet';
import { TimeSheetService } from 'src/app/services/time-sheet.service';

@Component({
  selector: 'manager-time-sheet-list',
  templateUrl: './time-sheet-list.component.html',
  styleUrls: ['./time-sheet-list.component.scss'],
})
export class TimeSheetListComponent implements OnInit {
  constructor(
    private timeSheetService: TimeSheetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(this.myDecryptor(routeParams.get('userId')));
    this.userId = userIdFromRoute;
    this.getTimeSheets();
  }
  timeSheets!: TimeSheet[] | any;
  userId!: number;

  getTimeSheets() {
    this.timeSheets = this.timeSheetService.getTimeSheetsByUserId(this.userId);
  }
  myDecryptor(text: string | null) {
    text = text!.substring(21, text!.length - 22);
    let decrypted = '';
    for (let i = 0; i < text.length; i++) {
      let ascii = text.charCodeAt(i);
      ascii = ascii - 37;
      ascii = ascii / 5;
      decrypted += String.fromCharCode(ascii);
    }
    return decrypted;
  }
}
