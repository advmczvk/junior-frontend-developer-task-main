import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/libs/models';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiClient {
  constructor(protected http: HttpClient) {}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('assets/data/employees.json');
  }

  public getEmployeeStructure(): Observable<Employee> {
    return this.http.get<Employee>('assets/data/employee-structure.json');
  }
}
