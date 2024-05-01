import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
