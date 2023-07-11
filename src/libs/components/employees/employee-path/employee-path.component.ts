import { Component, Input } from '@angular/core';
import { Employee } from 'src/libs/models';

@Component({
  selector: 'app-employee-path',
  templateUrl: './employee-path.component.html',
  styleUrls: ['./employee-path.component.css'],
})
export class EmployeePathComponent {
  @Input() path: Employee[];
}
