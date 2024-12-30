import { Component, OnInit, ViewChild } from '@angular/core';
import { Student, StudentService } from '../student.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';  // Import DialogComponent
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';  // Import DialogUpdateComponent
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';  // Import DialogDeleteComponent
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddStudentDialogComponent } from '../addstudent-dialog/addstudent-dialog.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  displayedColumns: string[] = ['srNo', 'fname', 'lname', 'gender', 'salary', 'actions'];
  dataSource = new MatTableDataSource<Student>([]); // Use MatTableDataSource

  pageSize: number = 10;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog // Inject MatDialog into the constructor
  ) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
  
        // Custom filter logic
        this.dataSource.filterPredicate = (data: Student, filter: string) => {
          const searchTerm = filter.trim().toLowerCase();
          return (
            data.fname.toLowerCase().includes(searchTerm) ||
            data.lname.toLowerCase().includes(searchTerm) ||
            data.gender.toLowerCase().includes(searchTerm) ||
            data.salary.toString().includes(searchTerm)
          );
        };
      },
      (error) => {
        console.error('Error fetching student data', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Trim and convert to lowercase
  }

  onDelete(_id: string): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      data: { _id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStudent(_id);
      } else {
        console.log('Deletion cancelled');
      }
    });
  }

  deleteStudent(_id: string): void {
    this.studentService.deleteStudent(_id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(student => student._id !== _id); // Update the data source
        console.log('Student deleted successfully');
      },
      (error) => {
        console.error('Error deleting student', error);
      }
    );
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add logic to refresh or fetch new data if needed
        this.fetchStudents();
        this.router.navigate(['']);
        

      } else {
        console.log('Add cancelled');
      }
    });
  }

  onUpdate(_id: string): void {
    const student = this.dataSource.data.find((s: any) => s._id === _id); // Find the student by ID
    if (student) {
      console.log('Student data passed to dialog:', student); // Check if student data is correct

      const dialogRef = this.dialog.open(AddStudentDialogComponent, {
        width: '400px',
        data: { student }, // Pass student data for editing
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'updated') {
          location.reload();
          this.fetchStudents(); // Refresh the student list
        }
      });
    }
  }
  
  fetchStudents(): void {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching updated student data', error);
      }
    );
  }
  // -------------------------Dialog-----------------------
  openDialog(): void {
    const dialogRef = this.dialog.open(AddStudentDialogComponent, {
      width: '400px', // You can adjust the width of the dialog
      data: {} // Pass any data you want to send to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Dialog result:', result); // Use the result if the dialog returns data
      location.reload();
    });
  }
}
