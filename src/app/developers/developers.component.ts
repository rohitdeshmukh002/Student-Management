import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeveloperService } from '../developer.service';
import { AddDeveloperDialogComponent } from '../add-developer-dialog/add-developer-dialog.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { Employee, EmployeeService } from '../employee.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {
  displayedColumns: string[] = ['srNo', 'name', 'technologies', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  technologiesMap: Map<string, string> = new Map(); // Maps technology ID to name

  pageSize: number = 8;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private developerService: DeveloperService, private technologyService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchDevelopers();
    this.fetchTechnologies();

  }

  fetchDevelopers() {
    this.developerService.getDevelopers().subscribe(
      (data: any[]) => {
        console.log('Developers fetched:', data); // Debugging
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching developers:', error);
      }
    );
  }
  

  fetchTechnologies() {
    this.technologyService.getTechnologies().subscribe((data: any[]) => {
      console.log('Technologies fetched:', data); // Debugging
      data.forEach(tech => {
        console.log('Mapping:', tech._id, tech.fname); // Debugging
        this.technologiesMap.set(tech._id, tech.fname);
      });
    });
  }

  getTechnologyNames(techIds: string[]): string[] {
    return techIds.map(id => this.technologiesMap.get(id) || 'Unknown');
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  onUpdate(_id: string): void {
    const developer = this.dataSource.data.find((d: any) => d._id === _id);
    if (developer) {
      const dialogRef = this.dialog.open(AddDeveloperDialogComponent, {
        width: '400px',
        data: { developer }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updated') {
          this.fetchDevelopers();
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
        this.developerService.deleteDeveloper(_id).subscribe(
          () => this.fetchDevelopers(),
          (error) => console.error('Error deleting developer:', error)
        );
      }
    });
  }

  openDialog(developer?: any): void {
    const dialogRef = this.dialog.open(AddDeveloperDialogComponent, {
      width: '400px',
      data: { developer }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added' || result === 'updated') {
        this.fetchDevelopers();
      }
    });
  }
  
}
