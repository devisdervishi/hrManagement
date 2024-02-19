import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerMainPageComponent } from './manager-main-page/manager-main-page.component';


@NgModule({
  declarations: [
    ManagerMainPageComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
