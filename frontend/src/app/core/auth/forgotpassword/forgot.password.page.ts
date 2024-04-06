import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot.password.page.html",
    styleUrls: ["../styles/auth.styles.scss"]
})

export class ForgotPasswordPage {
    constructor(private title: Title) {
        this.title.setTitle("Password Reset | Blogify")
    }
}