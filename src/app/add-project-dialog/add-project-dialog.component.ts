import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeveloperService } from '../developer.service'; // Import the developer service to fetch developers
import { ProjectService } from '../project.service'; // Import the project service to save project data
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {
  developers: any[] = []; // Array to hold the list of developers
  project: any = {
    projectName: '',
    developers: [] // List of selected developer IDs
  };

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private developerService: DeveloperService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // Fetch developers from the backend when the dialog is opened
    this.fetchDevelopers();

    // If there is data passed for editing an existing project, populate the form
    if (this.data?.project) {
      this.project = { ...this.data.project };
    }
  }

  fetchDevelopers(): void {
    this.developerService.getDevelopers().subscribe(
      (developers: any[]) => {
        this.developers = developers;
      },
      (error) => {
        console.error('Error fetching developers:', error);
      }
    );
  }

  saveProject(): void {
    if (this.project.projectName && this.project.developers.length > 0) {
      if (this.data?.project) {
        // Update existing project
        this.projectService.updateProject(this.project).subscribe(
          (response) => {
            this.dialogRef.close('updated'); // Close dialog with a signal that project was updated
          },
          (error) => {
            console.error('Error updating project:', error);
          }
        );
      } else {
        // Add new project
        this.projectService.addProject(this.project).subscribe(
          (response) => {
            this.dialogRef.close('added'); // Close dialog with a signal that project was added
          },
          (error) => {
            console.error('Error adding project:', error);
          }
        );
      }
    } else {
      alert('Please fill all the required fields.');
    }
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog without any changes
  }
}
