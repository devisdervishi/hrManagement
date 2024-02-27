import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerMainPageComponent } from './components/manager-main-page/manager-main-page.component';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimeSheetListComponent } from './components/time-sheet-list/time-sheet-list.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { UserFilterPipe } from '../pipes/user-filter.pipe';
import { UserSortPipe } from '../pipes/user-sort.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { ManagerinfoComponent } from './components/managerinfo/managerinfo.component';

@NgModule({
  declarations: [
    ManagerMainPageComponent,
    UserComponent,
    UserListComponent,
    EditUserComponent,
    TimeSheetListComponent,
    TimesheetComponent,
    UserFilterPipe,
    UserSortPipe,
    DeleteDialogComponent,
    ManagerinfoComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatInputModule,
    MatFormFieldModule,
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
export class ManagerModule {}
