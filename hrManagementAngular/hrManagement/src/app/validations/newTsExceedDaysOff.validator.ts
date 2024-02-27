import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { NewTsOverlapRequest } from "../models/newTsOverlap";
import { TimeSheetService } from "../services/time-sheet.service";
import { AuthserviceAllCompSharedService } from "../services/componentsSharedServices/authservice-all-comp-shared.service";

@Injectable({ providedIn: 'root' })
export class NewTsExceed implements AsyncValidator {
    constructor(private tsService:TimeSheetService
        ,private authServiceAllComp:AuthserviceAllCompSharedService){}
    validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const parent = control && control.parent;
        const fromDate = parent!.get('fromDate');
       let newTsOverlap:NewTsOverlapRequest=new NewTsOverlapRequest
        newTsOverlap.fromDate= fromDate?.value
        newTsOverlap.toDate= control.value,
        newTsOverlap.userId= Number(this.authServiceAllComp.id)
        return this.tsService.checkForNewTsExceed(newTsOverlap).pipe(
                map(exceeds => (exceeds ? { exceeds: true } : null))
            )
    }
}