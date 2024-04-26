import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  constructor(private http: HttpClient) {}

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
  }
}
