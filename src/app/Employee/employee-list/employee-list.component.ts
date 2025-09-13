import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Employee } from 'src/app/Model/employee';
import { Country } from 'src/app/Model/country';
import * as EmpActions from 'src/app/Store/employee.actions';
import { selectAllEmployees } from 'src/app/Store/employee/employee.selectors.selectors';
import { CountriesService } from 'src/app/Services/countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]> = this.store.select(selectAllEmployees);
  filteredEmployees$: Observable<Employee[]> | undefined;
  searchId = '';
  countries: Country[] = [];
  selectedCountry = ''; // for UI only

  constructor(
    private store: Store,
    private countryService: CountriesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(EmpActions.loadEmployees());
    this.loadCountries();

    this.filteredEmployees$ = this.employees$; // initial full list
  }

  loadCountries() {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  onSearchIdChange() {
    this.filteredEmployees$ = this.employees$.pipe(
      map((emps) =>
        !this.searchId
          ? emps
          : emps.filter((emp) =>
              emp.id.toString().includes(this.searchId)
            )
      )
    );
  }

  viewEmployee(id: any) {
    this.router.navigate(['employee/' + id]);
  }

  addEmployee() {
    this.router.navigate(['/createEmp']);
  }

  onDelete(id: string) {
    if (confirm('Delete employee?')) {
      this.store.dispatch(EmpActions.deleteEmployee({ id }));
    }
  }
}
