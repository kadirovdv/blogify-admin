import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MainLayout } from "./core/layout/main/main.layout";
import { SharedModule } from "./core/shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    MainLayout,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
