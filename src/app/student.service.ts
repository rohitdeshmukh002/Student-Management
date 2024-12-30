import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Student {
  _id?: string;  // Keeping the ID as a 
  fname: string;
  lname: string;
  gender: string;
  salary: number;  
}


@Injectable({
  providedIn: 'root'
})
export class StudentService {


    private apiurl1 = 'http://localhost:5038/api/student';

  constructor(private http: HttpClient) {}

  // Fetch all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiurl1);
  }

  // Fetch a student by ID
  getStudentById(_id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiurl1}/${_id}`);
  }
  // Add a new student (returns the updated student list)
  addStudent(student: Student): Observable<Student[]> {
    return this.http.post<Student[]>(`${this.apiurl1}/AddStudent`, student);
  }

  updateStudent(student: Student): Observable<Student[]> {
    console.log('Student ID:', student._id); // Log the ID to verify
    return this.http.put<Student[]>(`${this.apiurl1}/UpdateStudent/${student._id}`, student);
  }

  // Delete a student by ID (returns the updated student list)
  deleteStudent(_id: string): Observable<Student[]> {
    return this.http.delete<Student[]>(`${this.apiurl1}/${_id}`);
  }
}
