import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-center",
    templateUrl: "./justify-center.component.html",
    styleUrls: ["./justify-content.component.scss"]
})

export class JustifyCenterComponent implements OnInit { 
    @Input() styles: any;

    constructor() { }
    ngOnInit() { }
}
