import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  constructor(private http: HttpClient, private router: Router) {}
  username: string = '';

  get name(): any {
    return this.username;
  }

  set name(name: string) {
    this.username = sessionStorage.;
  }


  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getCurrentAdmin(id: any): Observable<any> {
    return this.http.get<boolean>(`/admin/availability/${id}`);
  }

  login(admin: any): Observable<any> {
    return this.http.post('/api/admin/login', admin);
  }

  signup(admin: any): Observable<any> {
    return this.http.post('/api/admin/signup', admin);
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('adminID');
    return this.router.navigate(['/auth/login'])
  }
}
