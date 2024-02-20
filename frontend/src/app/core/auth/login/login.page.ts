import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"]
})

export class LoginPage implements OnInit {

    public setStyles(): any {
        let styles = {
            'background': 'url(./assets/images/login_bg.jpg)',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
        }

        return styles
    }

    constructor(private title: Title) {
        this.title.setTitle("Login | Blog")
    }

    ngOnInit(): void {

    }
}
