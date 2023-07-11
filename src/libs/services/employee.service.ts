import { Injectable, inject } from '@angular/core';
import { EmployeesApiClient } from '../api/clients/employees';
import { Observable, map } from 'rxjs';
import { Employee } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly employeeApiClient = inject(EmployeesApiClient);

  getEmployees(): Observable<Employee[]> {
    return this.employeeApiClient.getEmployees();
  }

  getEmployeeSubordinates(id: string): Observable<Employee | null> {
    return this.employeeApiClient
      .getEmployeeStructure()
      .pipe(map((emp: Employee) => this.findSubordinates(emp, id)));
  }

  getEmployeeInHierarchy(id: string): Observable<Employee[]> {
    return this.employeeApiClient
      .getEmployeeStructure()
      .pipe(map((emp: Employee) => this.getFullPath(emp, id)));
  }

  private findSubordinates(
    employee: Employee,
    employeeId: string
  ): Employee | null {
    if (employee.id === employeeId) {
      return employee;
    }

    for (const subordinate of employee.subordinates) {
      const hierarchy = this.findSubordinates(subordinate, employeeId);
      if (hierarchy) {
        return hierarchy;
      }
    }

    return null;
  }

  private findEmployee(
    hierarchy: Employee,
    employeeId: string
  ): Employee | null {
    if (
      hierarchy.subordinates.find(
        (subordinate) => subordinate.id === employeeId
      )
    ) {
      return hierarchy;
    }

    for (const subordinate of hierarchy.subordinates) {
      return this.findEmployee(subordinate, employeeId);
    }

    return null;
  }

  private getFullPath(
    employee: Employee,
    selectedId: string,
    path: Employee[] = []
  ): Employee[] {
    // Add current employee to the path
    path.push(employee);

    // If the selected employee is found, return the path
    if (employee.id === selectedId) {
      return path;
    }

    // Recursively search through subordinates
    for (const subordinate of employee.subordinates) {
      const fullPath = this.getFullPath(subordinate, selectedId, path);

      // If the selected employee is found in the subordinate's path, return the path
      if (fullPath.length > 0) {
        return fullPath;
      }
    }

    // Remove current employee from the path if selected employee not found in this branch
    path.pop();

    return [];
  }
}
