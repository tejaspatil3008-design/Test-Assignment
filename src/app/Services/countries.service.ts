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


const apiUrl = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country';

@Injectable({
  providedIn: 'root'
})


export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(apiUrl);
  }
}
