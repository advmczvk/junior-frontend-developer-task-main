import { Component, OnInit, inject } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Employee } from 'src/libs/models';
import { EmployeeService } from 'src/libs/services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  readonly employeeService = inject(EmployeeService);
  employees: Employee[] = [];
  selectedEmp: Employee | null = null;
  hierarchy: Employee | null = null;
  path: Employee[] = [];

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  loadStructure(event: any): void {
    if (this.selectedEmp) {
      this.employeeService
        .getEmployeeSubordinates(this.selectedEmp.id)
        .subscribe((employees) => {
          this.hierarchy = employees;
        });

      this.employeeService
        .getEmployeeInHierarchy(this.selectedEmp.id)
        .subscribe((employees) => {
          this.path = employees;
        });
    }
  }
}
