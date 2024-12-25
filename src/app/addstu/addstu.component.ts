import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component'; // For adding new student
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component'; // For updating existing student
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service'; // Import the service

@Component({
  selector: 'app-addstu',
  templateUrl: './addstu.component.html',
  styleUrls: ['./addstu.component.css']
})
export class AddstuComponent implements OnInit {
  fname: string = '';
  lname: string = '';
  gender: string = '';
  salary: number | null = null;
  isEditing: boolean = false; // Flag to check if we're editing an existing student
  studentId: number | null = null;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    // Check if we have a student ID from the route
    const studentId = this.route.snapshot.paramMap.get('id');
if (studentId) {
  this.studentId = +studentId; // Convert to number
  if (isNaN(this.studentId)) {
    console.error('Invalid student ID:', studentId);
    // Handle the case where the ID is invalid (perhaps redirect to a 404 page)
    this.router.navigate(['/404']);
  } else {
    this.isEditing = true;
    this.fetchStudentData(this.studentId); // Fetch the student data for editing
  }
}

  }

  fetchStudentData(id: number): void {
    this.studentService.getStudentById(id).subscribe(
      (student) => {
        this.fname = student.fname;
        this.lname = student.lname;
        this.gender = student.gender;
        this.salary = student.salary;
      },
      (error) => {
        console.error('Error fetching student data', error);
      }
    );
  }

  onSubmit() {
    // Ensure salary is a valid number (default to 0 if null)
    const validSalary = this.salary !== null && this.salary > 0 ? this.salary : 0;

    if (this.fname && this.lname && this.gender && validSalary > 0) {
      this.openDialog();
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  openDialog(): void {
    // Decide which dialog to open based on whether we're adding or editing a student
    const dialogRef = this.isEditing 
      ? this.dialog.open(DialogUpdateComponent, {
          data: { fname: this.fname, lname: this.lname, gender: this.gender, salary: this.salary } // Pass the existing student data for update
        })
      : this.dialog.open(DialogComponent, {
          data: { fname: this.fname, lname: this.lname, gender: this.gender, salary: this.salary } // Pass the new student data for adding
        });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the OK click (e.g., submit form)
        this.router.navigate(['']);  // Navigate back to the student list

        if (this.isEditing && this.studentId !== null) {
          this.updateStudent();  // If editing, update student
        } else {
          this.addStudent();  // If adding, add student
        }
      } else {
        // Handle the Cancel click
        alert('Submission Cancelled');
        this.resetForm();
      }
    });
  }

  addStudent() {
    // Ensure salary is always a number (default to 0 if null)
    const newStudent = {
      fname: this.fname,
      lname: this.lname,
      gender: this.gender,
      salary: this.salary ?? 0,  // Ensure salary is valid (default to 0 if null)
    };

    this.studentService.addStudent(newStudent).subscribe(
      (response) => {
        console.log('Student added successfully:', response);
        // alert('Student added successfully');
        this.router.navigate(['']);  // Navigate back to the student list
        this.resetForm();
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  updateStudent() {
    // Ensure salary is always a number (default to 0 if null)
    const updatedStudent = {
      id: this.studentId ?? undefined, // Convert null to undefined for ID
      fname: this.fname,
      lname: this.lname,
      gender: this.gender,
      salary: this.salary ?? 0,  // Ensure salary is valid (default to 0 if null)
    };

    this.studentService.updateStudent(updatedStudent).subscribe(
      (response) => {
        console.log('Student updated successfully:', response);
        // alert('Student updated successfully');
        this.router.navigate(['/']);  // Navigate back to the student list
        this.resetForm();
      },
      (error) => {
        console.error('Error updating student:', error);
      }
    );
  }

  resetForm() {
    this.fname = '';
    this.lname = '';
    this.gender = '';
    this.salary = null;
  }
}
