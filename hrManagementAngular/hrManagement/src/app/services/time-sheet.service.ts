import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TimeSheet } from '../models/timesheet';
import { DeleteResponse } from '../models/deleteResponse';
import { TimeSheetSaveRequest } from '../models/timeSheetSaveRequest';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
url='http://localhost:8080/timeSheets'
constructor(private http:HttpClient){}

getTimeSheetsByUserId(userId:number|null){
  return this.http.get(this.url+"/user/"+userId)
  .pipe(
    map((res)=>res as TimeSheet[]),
    map((res:TimeSheet[])=>res)
  )
}

deleteTimeSheet(tsId:number){
  return this.http.delete(this.url+"/delete/"+tsId)
  .pipe(
    map((res)=>res as DeleteResponse),
    map((res:DeleteResponse)=>res)
  )
}
saveTimeSheet(tsRequest:TimeSheetSaveRequest,userId:number|null){
  return this.http.post(this.url+"/save/"+userId,tsRequest)
}

}
