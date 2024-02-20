import { Component, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
    selector: "app-notfound",
    templateUrl: "./notfound.page.html",
    styleUrls: ["./notfound.page.scss"],
})

export class NotFoundPage implements OnInit, OnDestroy {
    show = true;
    public counter = Number(0);
    intervalID: any;

    constructor(private location: Location) {
    }

    ngOnInit(): void {
        this.countDown(9);
    }

    countDown(seconds: number): void {
        this.counter = seconds;
        this.intervalID = setInterval(() => {
            if (this.counter <= 1) {
                this.location
                .go("/")
            }
            if (this.counter > 0) {
                this.counter--;
            } else {
                clearInterval(this.intervalID);
            }
        }, 1000)
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalID);
    }

}
