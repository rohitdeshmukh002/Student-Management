import { Component } from '@angular/core';

// export interface Employee {
//   id: number;
//   fname: string;
//   lname: string;
//   gender: string;
//   salary: number;
// }


// const EMPLOYEE_DATA: Employee[] = [
//   { id: 1, fname: 'John', lname: 'Doe', gender: 'Male', salary: 50000 },
//   { id: 2, fname: 'Jane', lname: 'Smith', gender: 'Female', salary: 60000 },
//   { id: 3, fname: 'Mike', lname: 'Johnson', gender: 'Male', salary: 55000 },
//   { id: 4, fname: 'Emily', lname: 'Davis', gender: 'Female', salary: 62000 },
//   { id: 5, fname: 'Chris', lname: 'Brown', gender: 'Male', salary: 48000 },
// ];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  // displayedColumns: string[] = ['id', 'fname', 'lname', 'gender', 'salary', 'actions'];
  // dataSource = EMPLOYEE_DATA;

  // onUpdate(id: number): void {
  //   console.log('Update clicked for ID:', id);
  //   alert('Update clicked...');
  // }
  
  // onDelete(id: number): void {
  //   console.log('Delete clicked for ID:', id);
  //   alert('Delete clicked...')
  // }
  
}

