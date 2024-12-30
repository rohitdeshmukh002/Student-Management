import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../student.service';
import { Student } from '../student.service'; // Ensure you import the Student interface/type


@Component({
  selector: 'app-addstudent-dialog',
  templateUrl: './addstudent-dialog.component.html',
  styleUrls: ['./addstudent-dialog.component.css'],
})
export class AddStudentDialogComponent implements OnInit {
  fname: string = '';
  lname: string = '';
  gender: string = '';
  salary!: number; // Default to 0 to avoid `null`
  _id?: string; // Include ID for editing
  isUpdate: boolean = false;

  constructor(private studentService: StudentService,
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject data for edit mode
    
  ) {}

  ngOnInit(): void {
    // Populate form fields if data is passed (edit mode)
    if (this.data && this.data.student) {
      const { _id, fname, lname, gender, salary } = this.data.student;
      this._id = _id;
      this.fname = fname;
      this.lname = lname;
      this.gender = gender;
      this.salary = salary || 0; // Ensure salary is a number
      this.isUpdate = true; 
    }
  }

  onSubmit(): void {
    const student: Student = {
      _id: this._id, // For new students, `id` can be `undefined`
      fname: this.fname,
      lname: this.lname,
      gender: this.gender,
      salary: this.salary, // Ensure salary is always a number
    };

    if (this.isUpdate && this._id) {
      // Update existing student
      this.studentService.updateStudent(student).subscribe(
        (response) => {
          console.log('Student updated successfully:', response);
          // location.reload();
          this.dialogRef.close('updated');
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    } else {
      
      // Add new student
      this.studentService.addStudent(student).subscribe(
        (response) => {
          console.log('Student added successfully:', response);
          location.reload();
          this.dialogRef.close('added');
          

        },
        (error) => {
          console.error('Error adding student:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
