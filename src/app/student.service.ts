import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  fname: string;
  lname: string;
  gender: string;
  salary: number;  
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // private apiUrl = 'https://gist.githubusercontent.com/Harshwardhan-Rajapure/e42a01dbf44a4786d1086893e7c25410/raw/59952110ab0cb6987688d6d978f41844e88a5d5b/StudentData.txt';

  private apiUrl = 'http://localhost:3000/students';
  constructor(private http: HttpClient) {}

  // Method to fetch student data
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student); // `id` can be `undefined` or `number`
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
