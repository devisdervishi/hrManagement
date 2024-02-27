import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerMainPageComponent } from './components/manager-main-page/manager-main-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { ManagerRoleGuard } from '../guards/manager-role.guard';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'manager/main',
    component: ManagerMainPageComponent,
    canActivate: [AuthGuard, ManagerRoleGuard],
    data: { role: 'MANAGER' },
  },
  {
    path: 'manager/editUser/:userId',
    component: EditUserComponent,
    canActivate: [AuthGuard, ManagerRoleGuard],
    data: { role: 'MANAGER' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
