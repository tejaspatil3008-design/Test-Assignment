import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Model/employee';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  employeeId!: string;
  employeeForm!: FormGroup;
  employee!: Employee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadEmployee();
  }

  initForm() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  loadEmployee() {
    this.empService.getEmployee(this.employeeId).subscribe(emp => {
      this.employee = emp;
      this.employeeForm.patchValue(emp);
    });
  }

  updateEmployee() {
    if (this.employeeForm.valid) {
      this.empService.updateEmployee(this.employeeId, this.employeeForm.value)
        .subscribe(() => {
          alert('Employee updated successfully!');
          this.router.navigate(['/employees']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/employee']);
  }

}
