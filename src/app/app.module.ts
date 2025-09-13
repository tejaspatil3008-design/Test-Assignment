import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EmployeeListComponent } from './Employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './Employee/employee-view/employee-view.component';

import { employeeFeatureKey, employeeReducer } from './Store/employee.reducer';
import { EmployeeEffects } from './Store/employee.effects';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeViewComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    StoreModule.forRoot({}),
    StoreModule.forFeature(employeeFeatureKey, employeeReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([EmployeeEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
