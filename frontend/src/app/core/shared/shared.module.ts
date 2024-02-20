import { NgModule } from "@angular/core";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { NotFoundPage } from "../pages/notfound/notfound.page";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        NgbToastModule,
        CommonModule
    ],
    declarations: [
        NotFoundPage
    ],
    exports: [
        NotFoundPage,
        CommonModule
    ],
    providers: []
})

export class SharedModule { }