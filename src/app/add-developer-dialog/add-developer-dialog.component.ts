import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeveloperService } from '../developer.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-developer-dialog',
  templateUrl: './add-developer-dialog.component.html',
  styleUrls: ['./add-developer-dialog.component.css']
})
export class AddDeveloperDialogComponent implements OnInit {
  developerForm: FormGroup;
  technologies: any[] = []; // List of technologies fetched from backend

  constructor(
    private fb: FormBuilder,
    private developerService: DeveloperService,
    private technologyService: EmployeeService,
    public dialogRef: MatDialogRef<AddDeveloperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { developer: any }
  ) {
    this.developerForm = this.fb.group({
      name: [this.data?.developer?.name || '', Validators.required],
      technologies: [this.data?.developer?.technologies || []]
    });
  }

  ngOnInit(): void {
    this.fetchTechnologies();
  }

  fetchTechnologies() {
    this.technologyService.getTechnologies().subscribe(
      (data) => (this.technologies = data),
      (error) => console.error('Error fetching technologies:', error)
    );
  }

  saveDeveloper() {
    const developerData = this.developerForm.value;

    if (this.data?.developer) {
      // Update existing developer
      this.developerService.updateDeveloper(this.data.developer._id, developerData).subscribe(
        () => this.dialogRef.close('updated'),
        (error) => console.error('Error updating developer:', error)
      );
    } else {
      // Add new developer
      this.developerService.addDeveloper(developerData).subscribe(
        () => this.dialogRef.close('added'),
        (error) => console.error('Error adding developer:', error)
      );
    }
  }
}
