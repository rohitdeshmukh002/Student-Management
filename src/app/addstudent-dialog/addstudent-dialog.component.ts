import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-addstudent-dialog',
  templateUrl: './addstudent-dialog.component.html',
  styleUrls: ['./addstudent-dialog.component.css']
})
export class AddStudentDialogComponent {
  
  fname: string = '';
  lname: string = '';
  gender: string = '';
  salary: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    private studentService: StudentService,
    private router: Router
  ) {}

  // Method to handle form submission
  onSubmit(): void {
    if (this.fname && this.lname && this.gender && this.salary && this.salary > 0) {
      const newStudent = {
        fname: this.fname,
        lname: this.lname,
        gender: this.gender,
        salary: this.salary,
      };

      // Use student service to add the student
      this.studentService.addStudent(newStudent).subscribe(
        (response) => {
          this.router.navigate(['']);  // Navigate back to the student list
          console.log('Student added successfully:', response);
          this.dialogRef.close('Success');
          location.reload();
        },
        (error) => {
          console.error('Error adding student:', error);
        }
      );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();

  }
}
