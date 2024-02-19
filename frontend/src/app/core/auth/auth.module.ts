import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { LoginPage } from './login/login.page'
import { CardComponent } from '../components/card/card.component'

@NgModule({
    declarations: [
        LoginPage,
        CardComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: LoginPage
            }
        ])
    ],
    exports: [RouterModule],
    providers: [],
    bootstrap: []
})

export class AuthModule { }