import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { NewTsOverlapRequest } from "../models/newTsOverlap";
import { TimeSheetService } from "../services/time-sheet.service";
import { EditedTsOverlapRequest } from "../models/editedTsOverlap";
import { Injectable } from "@angular/core";
import { AuthserviceAllCompSharedService } from "../services/componentsSharedServices/authservice-all-comp-shared.service";

@Injectable({ providedIn: 'root' })
export class EditedTsOverlap implements AsyncValidator {
    constructor(private tsService:TimeSheetService
        ,private authServiceAllComp:AuthserviceAllCompSharedService){}
    validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const parent = control && control.parent;
        const fromDate = parent!.get('fromDate');
        const tsId=parent!.get('id');
       let editedTsOverlap:EditedTsOverlapRequest=new EditedTsOverlapRequest
        editedTsOverlap.fromDate= fromDate?.value
        editedTsOverlap.toDate= control.value,
        editedTsOverlap.userId= Number(this.authServiceAllComp.id)
        editedTsOverlap.tsId=Number(tsId!.value)
        return this.tsService.checkForEditedTsOverlap(editedTsOverlap).pipe(
                map(overlaps => (overlaps ? { overlaps: true } : null))
            )
    }
}
