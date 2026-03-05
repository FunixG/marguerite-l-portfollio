import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppComponent} from "./app.component";
import {ProjectPageComponent} from "./project-page/project-page.component";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {HomeComponent} from "./home/home.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProjectPageComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
