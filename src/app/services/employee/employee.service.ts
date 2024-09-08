import { Injectable } from '@angular/core';
import { BehaviorSubject, distinct, Observable } from 'rxjs';

import { Employee, EmployeeInput, EmployeeUpdateInput } from '@interfaces/employee';
import { IdentifierService } from '@services/identifier/identifier.service';
import { Collection } from '@interfaces/collection';
import { FilterService } from '../filter/filter.service';
import { SorterService } from '../sorter/sorter.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeCollection$ = new BehaviorSubject<Collection<Employee>>({
    data: [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1 555-555-5555",
        "department": "Sales",
        "role": "Sales Manager",
        "dateJoined": "2022-01-15"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "phone": "+1 555-123-4567",
        "department": "Engineering",
        "role": "Software Engineer",
        "dateJoined": "2023-03-22"
      },
      {
        "id": 3,
        "name": "Michael Brown",
        "email": "michael.brown@example.com",
        "phone": "+1 555-987-6543",
        "department": "Marketing",
        "role": "Marketing Coordinator",
        "dateJoined": "2021-07-30"
      },
      {
        "id": 4,
        "name": "Emily Davis",
        "email": "emily.davis@example.com",
        "phone": "+1 555-654-3210",
        "department": "Human Resources",
        "role": "HR Specialist",
        "dateJoined": "2020-11-05"
      },
      {
        "id": 5,
        "name": "William Johnson",
        "email": "william.johnson@example.com",
        "phone": "+1 555-321-4321",
        "department": "Finance",
        "role": "Financial Analyst",
        "dateJoined": "2019-02-19"
      },
      {
        "id": 6,
        "name": "Olivia Taylor",
        "email": "olivia.taylor@example.com",
        "phone": "+1 555-789-1234",
        "department": "Customer Support",
        "role": "Support Specialist",
        "dateJoined": "2021-05-18"
      },
      {
        "id": 7,
        "name": "James Wilson",
        "email": "james.wilson@example.com",
        "phone": "+1 555-456-7890",
        "department": "IT",
        "role": "System Administrator",
        "dateJoined": "2022-09-12"
      },
      {
        "id": 8,
        "name": "Sophia Martinez",
        "email": "sophia.martinez@example.com",
        "phone": "+1 555-654-9876",
        "department": "Legal",
        "role": "Legal Advisor",
        "dateJoined": "2020-02-24"
      },
      {
        "id": 9,
        "name": "David Lee",
        "email": "david.lee@example.com",
        "phone": "+1 555-321-8765",
        "department": "Operations",
        "role": "Operations Manager",
        "dateJoined": "2018-08-03"
      },
      {
        "id": 10,
        "name": "Ava White",
        "email": "ava.white@example.com",
        "phone": "+1 555-654-4321",
        "department": "Product",
        "role": "Product Manager",
        "dateJoined": "2023-01-10"
      }]});

  constructor(
    private readonly identifier: IdentifierService, 
    private readonly filterService: FilterService,
    private readonly sortedService: SorterService
  ) { 
    const maxIndex = Math.max(...this.employeeCollection$.value.data.map(e => e.id));

    identifier.set(maxIndex+1);
  }

  create(employee: EmployeeInput): void {
    const currentCollection = this.employeeCollection$.value;
    const newEmployee: Employee = { id: this.identifier.getAndIncrement(), ...employee };
  
    const updatedCollection = {
      ...currentCollection,
      data: [...currentCollection.data, newEmployee]
    };
  
    this.employeeCollection$.next(updatedCollection);
  }

  rawRead(): Observable<Collection<Employee>> {
    return this.employeeCollection$.pipe(distinct());
  }

  read(): Observable<Collection<Employee>> {
    return this.employeeCollection$.pipe(
      distinct(), 
      this.filterService.applyFilters(),
      this.sortedService.applySort()
    );
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
