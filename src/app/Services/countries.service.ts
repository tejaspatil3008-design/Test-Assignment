import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Model/employee';
import { Country } from '../Model/country';


const CountryAPi = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/"
const EmployeeList = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/"
const EmployeeById = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/"
const EmployeeAdd = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/"
const EmployeeUpdate = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/"
const EmployeeDelete = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/:id"
@Injectable({
  providedIn: 'root'
})


export class CountriesService {

  constructor(private http: HttpClient) { }



  getCounrtyData(): Observable<Country> {
    return this.http.get<Country>(CountryAPi + '/country')
  }

  getEmployeeList(): Observable<Employee> {
    return this.http.get<Employee>(EmployeeList + '/employee')
  }

  getEmployeeListById(id: any): Observable<Employee> {
    return this.http.get<Employee>(EmployeeById + id)
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(EmployeeAdd, employee);
  }


  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${EmployeeUpdate}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${EmployeeDelete}/${id}`);
  }
}
