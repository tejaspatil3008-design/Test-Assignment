import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './Employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './Employee/employee-view/employee-view.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeListComponent },
  { path: 'employee/:id', component: EmployeeViewComponent },

  { path: 'createEmp', component: AddEmployeeComponent },
  { path: '', redirectTo: '/employee', pathMatch: 'full' }


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
