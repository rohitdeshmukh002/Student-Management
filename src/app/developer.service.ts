import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private apiUrl = 'http://localhost:7038/api/developer';
  
  constructor(private http: HttpClient) {}

  getDevelopers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDeveloper(developer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, developer);
  }

  updateDeveloper(_id: string, developer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${_id}`, developer);
  }

  deleteDeveloper(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${_id}`);
  }
}
