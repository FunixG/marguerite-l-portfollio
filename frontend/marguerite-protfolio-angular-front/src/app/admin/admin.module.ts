import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {AdminLoginComponent} from "./admin-login/admin-login.component";
import {AdminProjectManagerComponent} from "./admin-project-manager/admin-project-manager.component";
import {AdminProjectsListComponent} from "./admin-projects-list/admin-projects-list.component";
import {ButtonComponent} from "../components/button/button.component";
import {InputTextComponent} from "../components/inputs/input-text/input-text.component";
import {LoaderComponent} from "../components/loader/loader.component";
import {PasswordComponent} from "./password/password.component";

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminProjectManagerComponent,
    AdminProjectsListComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ButtonComponent,
    InputTextComponent,
    LoaderComponent,
    ButtonComponent
  ]
})
export class AdminModule { }
