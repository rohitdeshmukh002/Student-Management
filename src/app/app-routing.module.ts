import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddStudentComponent } from './add-student/add-student.component';
import { AddstuComponent } from './addstu/addstu.component';
import { HeroComponent } from './hero/hero.component';
import { DevelopersComponent } from './developers/developers.component';
import { ProjectsComponent } from './projects/projects.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';

const routes: Routes = [
  // {
  //   path: '', component: HeroComponent
  // },
  {
    path: 'student/Addstudent', component: AddstuComponent
  },
  {
    path: 'student/editstudent/:_id', component: AddstuComponent
  },
  {
    path: 'developers', component: DevelopersComponent
  },
  {
    path: 'projects', component: ProjectsComponent
  },
  {
    path: 'technologies', component: EmployeeManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
