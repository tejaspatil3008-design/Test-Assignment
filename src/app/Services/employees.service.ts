import { Injectable } from '@angular/core';
import { Country } from '../Model/country';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Model/employee';

const BASE = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }


  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${BASE}/country`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${BASE}/employee`);
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${BASE}/employee/${id}`);
  }

  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${BASE}/employee`, emp);
  }

  updateEmployee(id: string, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${BASE}/employee/${id}`, emp);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE}/employee/${id}`);
  }

}
