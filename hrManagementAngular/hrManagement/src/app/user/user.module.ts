import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { NewTimeSheetFormComponent } from './components/new-time-sheet-form/new-time-sheet-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { UpdateTimeSheetFormComponent } from './components/update-time-sheet-form/update-time-sheet-form.component';
import { OneErrorPipe } from '../pipes/one-error.pipe';
import { TimesheetListComponent } from './components/timesheet-list/timesheet-list.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { EmptyPipe } from '../pipes/empty.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    UserMainPageComponent,
    TimesheetComponent,
    NewTimeSheetFormComponent,
    UpdateTimeSheetFormComponent,
    OneErrorPipe,
    EmptyPipe,
    TimesheetListComponent,
    UserinfoComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
})
export class UserModule {}
