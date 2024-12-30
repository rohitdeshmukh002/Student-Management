import { Component, OnInit, Inject } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-technologies-dialog',
  templateUrl: './add-technologies-dialog.component.html',
  styleUrls: ['./add-technologies-dialog.component.css']
})
export class AddTechnologiesDialogComponent implements OnInit {

  technologies: any[] = []; // List of technologies
  fname: string = ''; // Model for the new technology name

  _id?: string; 

  isUpdate: boolean = false;

  constructor(private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<AddTechnologiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject data for edit mode
    
  ) {}

  ngOnInit(): void {

    if (this.data && this.data.employee) {
      const { _id, fname } = this.data.employee;
      this._id = _id;
      this.fname = fname;

      this.isUpdate = true; 
    }
  }
  onSubmit(): void {

    if (!this.fname.trim()) {
     
      alert('Technology name cannot be empty.');
      return;
    }
    const employee: Employee = {
      _id: this._id, // For new students, id can be undefined
      fname: this.fname
    };

    const updatedTechnology: Employee = {
      _id: this._id, // Use the existing _id for updates
      fname: this.fname // Updated name
    };

   
     if (this.isUpdate && this._id) {
    // Update existing technology
    this.employeeService.updateTechnology(employee).subscribe(
      (response) => {
        console.log('Technology updated successfully:', response);
        this.dialogRef.close('updated');
        alert('Technology updated successfully');
        location.reload();
      },
      (error) => {
        console.error('Error updating technology:', error);
      }
    );
  } else {
    const newTechnology = { name: this.fname.trim() };
    console.log('New Technology being sent:', newTechnology); // Debugging
  
    this.employeeService.addTechnology(employee).subscribe(
      (technology) => {
        
        this.technologies.push(technology); // Add the newly added technology to the list
        this.fname = ''; // Reset input
        alert("Technology added successfully")
        console.log('Technology added successfully:', technology);

        location.reload();
      },
      (error) => {
        
        console.error('Error adding technology:', error);
      }
    );
  }
}
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}