import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service';
import { AddTechnologiesDialogComponent } from '../add-technologies-dialog/add-technologies-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
  _id?: string;
  displayedColumns: string[] = ['srNo', 'name', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]); // Use MatTableDataSource

  pageSize: number = 7;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchTechnologies();
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  fetchTechnologies() {
    this.employeeService.getTechnologies().subscribe(
      (data: Employee[]) => {
        this.dataSource.data = data; // Store technologies from the backend
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        console.error('Error fetching technologies:', error);
      }
    );
  }

onUpdate(_id: string): void {
  const employee = this.dataSource.data.find((s: any) => s._id === _id); // Find the student by ID
  if (employee) {
    console.log('Technology data passed to dialog:', employee); // Check if student data is correct

    const dialogRef = this.dialog.open(AddTechnologiesDialogComponent, {
      width: '400px',
      data: { employee }, // Pass student data for editing
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        location.reload();
        this.fetchTechnologies(); // Refresh the student list
      }
    });
  }
}

onDelete(_id: string): void {
  const dialogRef = this.dialog.open(DialogDeleteComponent, {
    width: '300px',
    data: { _id }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.deleteTech(_id);
    } else {
      console.log('Deletion cancelled');
    }
  });
}

deleteTech(_id: string): void {
  this.employeeService.deleteTechnology(_id).subscribe(
    () => {
      this.dataSource.data = this.dataSource.data.filter(student => student._id !== _id); // Update the data source
      console.log('Student deleted successfully');
    },
    (error) => {
      console.error('Error deleting student', error);
    }
  );
}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTechnologiesDialogComponent, {
      width: '400px', // You can adjust the width of the dialog
      data: {} // Pass any data you want to send to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Dialog result:', result); // Use the result if the dialog returns data
      // location.reload();
    });
  }
  
}