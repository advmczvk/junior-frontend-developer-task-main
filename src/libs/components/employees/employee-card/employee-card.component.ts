import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/libs/models';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {
  @Input() employee: Employee;
}
