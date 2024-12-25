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

  displayedColumns: string[] = ['id', 'fname', 'lname', 'gender', 'salary', 'actions'];
  dataSource = new MatTableDataSource<Student>([]); // Use MatTableDataSource

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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Trim and convert to lowercase
  }

  onUpdate(id: number): void {
    this.router.navigate([`student/editstudent/${id}`]);
    console.log('Update clicked for ID:', id);
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStudent(id);
      } else {
        console.log('Deletion cancelled');
      }
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(student => student.id !== id); // Update the data source
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

  onEdit(id: number): void {
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add logic to refresh or fetch updated data if needed
        this.fetchStudents();
      } else {
        console.log('Edit cancelled');
      }
    });
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
    });
  }
}
