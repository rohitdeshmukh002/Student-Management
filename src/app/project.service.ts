import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8038/api/project'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, project);
  }

  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${project._id}`, project);
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${projectId}`);
  }
}
