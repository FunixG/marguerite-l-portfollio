import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {AdminLoginComponent} from "./admin-login/admin-login.component";
import {AdminProjectManagerComponent} from "./admin-project-manager/admin-project-manager.component";
import {AdminProjectsListComponent} from "./admin-projects-list/admin-projects-list.component";

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminProjectManagerComponent,
    AdminProjectsListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
