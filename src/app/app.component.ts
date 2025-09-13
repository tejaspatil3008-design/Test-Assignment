import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/Services/countries.service';
import { Country } from './Model/country';
import { Employee } from './Model/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Input() employeeData?: Employee;  
  c: Country[] = [];
  employeeForm!: FormGroup;
  selectedEmployee?: Employee;


  constructor(private service: CountriesService, private route: ActivatedRoute, private build: FormBuilder,) { }

  ngOnInit(): void {
    this.getCountryList();
    this.employeeList();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getEmployeeByid(parseInt(id));
    }

  }

  storeCountryData: any;
  employeeListData:any;

  //IntializeForm For add and update employee

  intializeFormGroup(){
      this.employeeForm = this.build.group({
      'name': [this.employeeData?.name],
      'email': [this.employeeData?.emailId ],
      'mobile': [this.employeeData?.mobile ],
      'country': [this.employeeData?.country ],
      'state': [this.employeeData?.state ],
      'district': [this.employeeData?.district],
    });

    this.service.getCounrtyData().subscribe((data) => {
      this.storeCountryData = data;
    });

  }

  //get Country list 

  getCountryList() {
    this.service.getCounrtyData().subscribe({
      next: (data: any) => {
        this.storeCountryData = data;
        console.log("Country Data", this.storeCountryData);
      }
    })
  }

    //get Employee list 

  employeeList() {
    this.service.getEmployeeList().subscribe({
      next: (data: any) => {
        this.employeeListData = data;
        console.log("Employee List", this.employeeListData);
      }
    })
  }

    //get Employee data by id 

  getDataByid:any
  getEmployeeByid(id:any) {
    this.service.getEmployeeListById(id).subscribe(
      data => {
        this.getDataByid =data;
        console.log("Get Data", this.getDataByid);
        
      })
  }

      //add and upadate Employee data by id 

  createdEmployee: any;
  updatedEmployee: any;
  onSubmit() {
    if (this.employeeForm.invalid) return;
    const emp: Employee = this.employeeForm.value;

    if (this.selectedEmployee) {
      this.service.updateEmployee(this.selectedEmployee.id!, emp).subscribe({
        next: () => {
          console.log("Employee Updated cchck");
          
          alert('Employee updated successfully');
          this.employeeList();
          this.resetForm();
        },
      });
    } else {
      
      this.service.addEmployee(emp).subscribe({
        next: () => {
          console.log("Employee Created");
          
          alert('Employee created successfully');
          this.employeeList();
          this.resetForm();
        },
      });
    }
  }

  onEdit(emp: Employee) {
    this.selectedEmployee = emp;
    this.employeeForm.patchValue(emp);
  }

  onDelete(id: string) {
    if (confirm('Do you want to delete?'))
       {
      this.service.deleteEmployee(id).subscribe({
        next: () =>
           {
          alert('Employee deleted successfullyy');
          this.employeeList();
        },
      });
    }
  }

  resetForm() {
    this.selectedEmployee = undefined;

    this.employeeForm.reset();
  }
}







