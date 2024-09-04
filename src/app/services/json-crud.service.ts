import { Injectable } from '@angular/core';
import { IdentifierService } from './identifier/identifier.service';
import { Employee } from '../types/employee.type';
import { EmployeeInput } from '../types/employeeInput.type';

@Injectable({
  providedIn: 'root'
})
export class JsonCrudService {

  private data: Employee[] = [];

  constructor(private identifier: IdentifierService) { }

  create(employee: EmployeeInput) {
    const newEmployee = { id: this.identifier.getAndIncrement(), ...employee } as Employee;
    this.data.push(newEmployee);
  }
}
