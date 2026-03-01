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
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {AdminTextModuleComponent} from "./admin-project-manager/modules/admin-text-module/admin-text-module.component";
import {
  AdminImageAndImageModuleComponent
} from "./admin-project-manager/modules/admin-image-and-image-module/admin-image-and-image-module.component";
import {
  AdminImageAndTextModuleComponent
} from "./admin-project-manager/modules/admin-image-and-text-module/admin-image-and-text-module.component";
import {
  AdminTextAndImageModuleComponent
} from "./admin-project-manager/modules/admin-text-and-image-module/admin-text-and-image-module.component";
import {
  AdminVideoModuleComponent
} from "./admin-project-manager/modules/admin-video-module/admin-video-module.component";
import {ProjectTitleComponent} from "./admin-project-manager/project-title/project-title.component";
import {ProjectDescriptionComponent} from "./admin-project-manager/project-description/project-description.component";
import {ProjectCoverImageComponent} from "./admin-project-manager/project-cover-image/project-cover-image.component";
import {FormsModule} from "@angular/forms";
import {ModulesManagerComponent} from "./admin-project-manager/modules-manager/modules-manager.component";
import {ImagePreviewComponent} from "./admin-project-manager/previews/image-preview/image-preview.component";
import {TextPreviewComponent} from "./admin-project-manager/previews/text-preview/text-preview.component";
import {VideoPreviewComponent} from "./admin-project-manager/previews/video-preview/video-preview.component";

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminProjectManagerComponent,
    AdminProjectsListComponent,
    PasswordComponent,
    AdminTextModuleComponent,
    AdminImageAndImageModuleComponent,
    AdminImageAndTextModuleComponent,
    AdminTextAndImageModuleComponent,
    AdminVideoModuleComponent,
    ProjectTitleComponent,
    ProjectDescriptionComponent,
    ProjectCoverImageComponent,
    ModulesManagerComponent,
    ImagePreviewComponent,
    TextPreviewComponent,
    VideoPreviewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ButtonComponent,
    InputTextComponent,
    LoaderComponent,
    ButtonComponent,
    CdkDrag,
    CdkDropList,
    FormsModule
  ]
})
export class AdminModule { }
