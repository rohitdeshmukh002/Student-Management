import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  _id?: string;  
  fname: string; 
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:6038/api/employee';


  constructor(private http: HttpClient) {}

  // Get all technologies from the backend
  getTechnologies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // getTechnologyById(_id: string): Observable<Employee> {
  //   return this.http.get<Employee>(`${this.apiUrl}/${_id}`);
  // }
  // Add a new technology (example)
  addTechnology(technology: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, technology);
  }

  // Update a technology (example)
  updateTechnology(employee: Employee): Observable<any> {
    console.log('Technology ID:', employee._id); // Log the ID to verify

    return this.http.put<any>(`${this.apiUrl}/${employee._id}`, employee);
  }

  // Delete a technology
  deleteTechnology(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${_id}`);
  }

  // getTechnologies(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
}