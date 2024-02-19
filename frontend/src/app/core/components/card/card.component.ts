import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})

export class CardComponent implements OnInit {
    @Input() cardHeader: any;
    @Input() cardFooter: any;
     
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}