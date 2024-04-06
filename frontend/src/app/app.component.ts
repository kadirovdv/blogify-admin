import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.http.get('/api/dashboard').subscribe(res => {
  //     console.log(res);
  //   });
  // }
}
