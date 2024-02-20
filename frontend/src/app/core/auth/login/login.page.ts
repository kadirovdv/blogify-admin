import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, Validators } from "@angular/forms"; 

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"]
})

export class LoginPage implements OnInit {
    private formGroup: FormGroup;

    public setStyles(): any {
        let styles = {
            'background': 'url(./assets/images/login_bg.jpg)',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
        }

        return styles
    }

    constructor(private title: Title) {
        this.title.setTitle("Login | Blog");

        this.formGroup = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(10)]),
            password: new FormControl('', [Validators.required, Validators.minLength(20)])
        });
    }

    ngOnInit(): void {

    }
}
