import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>('/api/admin');
  }

  getAdminById(id: string): Observable<any> {
    return this.http.get(`/api/admin/${id}`);
  }

  blockAdmin(id: any): Observable<any> {
    return this.http.patch('/api/admin/block', { id });
  }

  createAdmin(admin: any): Observable<any> {
    return this.http.post('/api/admin/create', admin);
  }

  deleteAdminById(id: string): Observable<any> {
    return this.http.delete(`/api/admin/delete/${id}`);
  }

  deleteAdminByRole(role: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        role: role,
      },
    };
    return this.http.delete('/api/admin/delete/byrole', options);
  }

  // Blog Posts

  getPosts() {
    return this.http.get('/api/blog-post');
  }
}
