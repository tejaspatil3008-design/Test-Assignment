import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Country } from 'src/app/Model/country';
import { CountriesService } from 'src/app/Services/countries.service';
import * as EmpActions from '../../Store/employee.actions';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  countries: Country[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private countryService: CountriesService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      'name': ['', Validators.required],
      'emailId': ['', [Validators.required, Validators.email]],
      'mobile': ['', Validators.required],
      'country': ['', Validators.required],
    });

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

onSubmit() {
  console.log("Entered in emp form");

  if (this.employeeForm.valid) {
    console.log("call save method");
    this.store.dispatch(EmpActions.addEmployee({ employee: this.employeeForm.value }));
    alert('Employee created successfully!');
    this.router.navigate(['/employee']); 
  }
}


  onCancel() {
    console.log("Navigate word");
    this.router.navigate(['/employee']);
  }
}
