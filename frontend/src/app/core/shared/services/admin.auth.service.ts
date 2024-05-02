import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const JWT = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  constructor(private http: HttpClient, private router: Router) {}
  username: string = '';

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

  // Getters

  getUsername(): string {
    if (this.getToken()) {
      try {
        return JWT.decodeToken(this.getToken() || '').username;
      } catch (error) {
        return '';
      }
    }
    return '';
  }

  getRole(): string {
    if (this.getToken()) {
      try {
        return JWT.decodeToken(this.getToken() || '').role;
      } catch (error) {
        return '';
      }
    }
    return '';
  }
}
