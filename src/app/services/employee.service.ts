import { Injectable } from '@angular/core';
import { BehaviorSubject, distinct, Observable } from 'rxjs';

import { Employee, EmployeeInput, EmployeeUpdateInput } from '@interfaces/employee';
import { IdentifierService } from '@services/identifier/identifier.service';
import { Collection } from '@interfaces/collection';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeCollection$ = new BehaviorSubject({ "data": [] } as Collection<Employee>);

  constructor(private readonly identifier: IdentifierService) { }

  create(employee: EmployeeInput): void {
    const currentCollection = this.employeeCollection$.value;
    const newEmployee: Employee = { id: this.identifier.getAndIncrement(), ...employee };
  
    const updatedCollection = {
      ...currentCollection,
      data: [...currentCollection.data, newEmployee]
    };
  
    this.employeeCollection$.next(updatedCollection);
  }
  

  read(): Observable<Collection<Employee>> {
    return this.employeeCollection$.asObservable().pipe(distinct());
  }

  update(id: number, updatedData: EmployeeUpdateInput): void {
    const currentCollection = this.employeeCollection$.value;
    const employeeIndex = currentCollection.data.findIndex(emp => emp.id === id);
  
    if (employeeIndex === -1) return;
  
    const updatedEmployee = { ...currentCollection.data[employeeIndex], ...updatedData };
    const updatedDataArray = [
      ...currentCollection.data.slice(0, employeeIndex),
      updatedEmployee,
      ...currentCollection.data.slice(employeeIndex + 1)
    ];
  
    this.employeeCollection$.next({ ...currentCollection, data: updatedDataArray });
  }

  delete(id: number): void {
    const currentCollection = this.employeeCollection$.value;

    const updatedCollection = {
      data: currentCollection.data.filter(employee => employee.id != id)
    };

    this.employeeCollection$.next(updatedCollection);
  }

}
