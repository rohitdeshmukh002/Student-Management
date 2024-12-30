import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../project.service'; // You need to create ProjectService
import { DeveloperService } from '../developer.service';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component'; // Dialog component for adding projects
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component'; // Dialog component for delete confirmation
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = ['srNo', 'projectName', 'developers', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  // developersMap: Map<string, string> = new Map(); // Maps developer ID to name
  developersMap: Map<string, { name: string, technologies: string[] }> = new Map(); // Maps developer ID to name and technologies

  pageSize: number = 8;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTooltip) tooltip!: MatTooltip; // Inject MatTooltip


  constructor(
    private projectService: ProjectService,
    private developerService: DeveloperService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchProjects();
    this.fetchDevelopers();
  }

  fetchProjects() {
    this.projectService.getProjects().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.cdRef.detectChanges(); 
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  
  showTooltip() {
    this.tooltip.show(); // Manually trigger tooltip
  }

  // fetchDevelopers() {
  //   this.developerService.getDevelopers().subscribe((data: any[]) => {
  //     data.forEach(dev => this.developersMap.set(dev._id, dev.name));
  //   });
  // }
  fetchDevelopers() {
    this.developerService.getDevelopers().subscribe((data: any[]) => {
      data.forEach(dev => {
        // Store developer name and technologies in the map
        this.developersMap.set(dev._id, { name: dev.name, technologies: dev.technologies });
      });
    });
  }


  // getDeveloperNames(devIds: string[]): string[] {
  //   return devIds.map(id => this.developersMap.get(id) || 'Unknown');
  // }

  getDeveloperNames(devIds: string[]): { name: string, technologies: string[] }[] {
    return devIds.map(id => {
      const dev = this.developersMap.get(id);
      console.log('Developer Data:', dev); // Add this log to check developer data
      return dev ? { name: dev.name, technologies: dev.technologies } : { name: 'Unknown', technologies: [] };
    });
  }

  logDeveloper(developer: any) {
    console.log('Hovered Developer:', developer); // Log the developer data on hover
  }
  

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  onUpdate(projectId: string): void {
    const project = this.dataSource.data.find((p: any) => p._id === projectId);
    if (project) {
      const dialogRef = this.dialog.open(AddProjectDialogComponent, {
        width: '400px',
        data: { project }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updated') {
          this.fetchProjects();
        }
      });
    }
  }

  onDelete(projectId: string): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300px',
      data: { projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(projectId).subscribe(
          () => this.fetchProjects(),
          (error) => console.error('Error deleting project:', error)
        );
      }
    });
  }

  openDialog(project?: any): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '400px',
      data: { project }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added' || result === 'updated') {
        this.fetchProjects();
      }
    });
  }
}
