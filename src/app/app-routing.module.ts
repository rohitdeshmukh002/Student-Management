import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { AddStudentComponent } from './add-student/add-student.component';
import { AddstuComponent } from './addstu/addstu.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
  {
    path: '', component: HeroComponent
  },
  {
    path: 'student/addstudent', component: AddstuComponent
  },
  {
    path: 'student/editstudent/:id', component: AddstuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
