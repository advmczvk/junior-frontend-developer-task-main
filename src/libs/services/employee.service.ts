import { Injectable, inject } from "@angular/core";
import { EmployeesApiClient } from "../api/clients/employees";
import { Observable, map } from "rxjs";
import { Employee } from "../models";

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    private readonly employeeApiClient = inject(EmployeesApiClient);

    getEmployees(): Observable<Employee[]> {
       return this.employeeApiClient.getEmployees();
    }

    getEmployee(id: string): Observable<Employee | null> {
        return this.employeeApiClient.getEmployee().pipe(
            map((data: Employee) => this.findEmployeeHierarchy(data, id))
          );
    }

    private findEmployeeHierarchy(employee: Employee, employeeId: string): Employee | null{
        if (employee.id === employeeId) {
            return employee;
          }
        
          for (const subordinate of employee.subordinates) {
            const hierarchy = this.findEmployeeHierarchy(subordinate, employeeId);
            if (hierarchy) {
              return hierarchy;
            }
          }
        
          return null;
      }
}