import { Injectable } from '@angular/core';
import { IdentifierService } from './identifier/identifier.service';
import { Employee } from '../types/employee.type';
import { EmployeeInput } from '../types/employeeInput.type';
import { Collection } from '../types/collection.type';

@Injectable({
  providedIn: 'root'
})
export class JsonCrudService {

  private employeeCollection: Collection<Employee> = { data: [] };

  constructor(private identifier: IdentifierService) { }

  create(employee: EmployeeInput): void {
    const newEmployee = { id: this.identifier.getAndIncrement(), ...employee } as Employee;
    this.employeeCollection.data.push(newEmployee);
  }

  show(): readonly Employee[]{
    return Object.freeze<Employee[]>(this.employeeCollection.data);
  }

  delete(id: number): boolean{
    const initialLength = this.employeeCollection.data.length;
    this.employeeCollection.data = this.employeeCollection.data.filter(employee => employee.id != id);
    return initialLength > this.employeeCollection.data.length;
  }


}
