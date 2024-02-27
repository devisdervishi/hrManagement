import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'user/main',
    component: UserMainPageComponent,
    canActivate: [AuthGuard, UserRoleGuard],
    data: { role: 'USER' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
