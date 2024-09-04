import { Injectable } from '@angular/core';
import { IdentifierService } from './identifier/identifier.service';
import { Collection } from '../interfaces/collection';
import { Employee, EmployeeInput, EmployeeUpdateInput } from '../interfaces/employee';

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
  
  update(id: number, updatedData: EmployeeUpdateInput) {
    throw new Error('Method not implemented.');
  }

}
