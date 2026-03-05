import {RouterModule, Routes} from '@angular/router';
import {ProjectPageComponent} from "./project-page/project-page.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: ':project',
        component: ProjectPageComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabledBlocking'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }