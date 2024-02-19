import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { TimeSheet } from 'src/app/models/timesheet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TimeSheetService } from 'src/app/services/time-sheet.service';

@Component({
  selector: 'app-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.scss']
})
export class UserMainPageComponent implements OnInit{
  constructor(private authService:AuthenticationService
    ,private router:Router
    ,private tshService:TimeSheetService){}
    firstName:string|null=localStorage.getItem('USER_FIRSTNAME')
    lastName:string|null=localStorage.getItem('USER_LASTNAME')
    timeSheets!:TimeSheet[]|any
    form!:FormGroup

    ngOnInit(): void {
      this.loadTimeSheets()
      
    }
  logout(){
    this.authService.logout()
    this.router.navigate(['login'])
  }
  loadTimeSheets(){
    this.timeSheets=this.tshService.getTimeSheetsByUserId(Number(localStorage.getItem("USER_ID")))
  }
}
