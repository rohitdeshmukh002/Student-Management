import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddstuComponent } from './addstu/addstu.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { HeroComponent } from './hero/hero.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddStudentDialogComponent } from './addstudent-dialog/addstudent-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { AddTechnologiesDialogComponent } from './add-technologies-dialog/add-technologies-dialog.component';
import { DevelopersComponent } from './developers/developers.component';
import { ProjectsComponent } from './projects/projects.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddDeveloperDialogComponent } from './add-developer-dialog/add-developer-dialog.component';
import { MatChipsModule } from '@angular/material/chips'; // Add this import
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddstuComponent,
    DialogComponent,
    HeroComponent,
    DialogUpdateComponent,
    DialogDeleteComponent,
    AddStudentDialogComponent,
    EmployeeManagementComponent,
    AddTechnologiesDialogComponent,
    DevelopersComponent,
    ProjectsComponent,
    SidebarComponent,
    AddDeveloperDialogComponent,
    AddProjectDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatTooltipModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
