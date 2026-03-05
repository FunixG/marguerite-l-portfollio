import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AdminProjectManagerComponent} from "./admin-project-manager/admin-project-manager.component";
import {PasswordComponent} from "./password/password.component";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent
    },
    {
        path: 'password',
        component: PasswordComponent
    },
    {
        path: 'projects/:project',
        component: AdminProjectManagerComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
