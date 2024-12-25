import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  addData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addData = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      gender: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.addData.valid) {
      alert("Form Submitted...");
      console.log('Form Submitted:', this.addData.value);
      this.resetForm();
    }
  }

  resetForm() {
    this.addData.reset();
  }
}
