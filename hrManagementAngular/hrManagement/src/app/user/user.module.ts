import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { NewTimeSheetFormComponent } from './components/new-time-sheet-form/new-time-sheet-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        UserMainPageComponent,
        TimesheetComponent,
        NewTimeSheetFormComponent,
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        MatInputModule,
        MatFormFieldModule,
         MatDatepickerModule, 
         FormsModule, 
         ReactiveFormsModule, 
         MatNativeDateModule
    ]
})
export class UserModule { }
