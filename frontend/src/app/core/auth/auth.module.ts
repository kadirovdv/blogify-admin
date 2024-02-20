import { NgModule } from "@angular/core"
import { LoginPage } from "./login/login.page"
import { AuthRoutingModule } from "./auth.routing.module"
import { JustifyCenterComponent } from "../shared/components/justify-center/justify-center.component"
import { CommonModule } from "@angular/common"

@NgModule({
    declarations: [
        LoginPage,
        JustifyCenterComponent
    ],
    imports: [
        AuthRoutingModule,
        CommonModule
    ],
    exports: [],
    providers: [],
    bootstrap: []
})

export class AuthModule { }