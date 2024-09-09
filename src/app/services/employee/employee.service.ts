import { Injectable } from '@angular/core';
import { BehaviorSubject, distinct, Observable } from 'rxjs';

import { Employee, EmployeeInput, EmployeeUpdateInput } from '@interfaces/employee';
import { IdentifierService } from '@services/identifier/identifier.service';
import { Collection } from '@interfaces/collection';
import { FilterService } from '../filter/filter.service';
import { SorterService } from '../sorter/sorter.service';
import { LocalStorageService } from '@services/storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly employeeCollection$: BehaviorSubject<Collection<Employee>>;

  constructor(
    private readonly identifier: IdentifierService, 
    private readonly filterService: FilterService,
    private readonly sortedService: SorterService,
    private readonly storageService: LocalStorageService
  ) { 
    this.employeeCollection$ = new BehaviorSubject<Collection<Employee>>({
      data: []});
    storageService.loadDataStorage().forEach(employee => this.create(employee));
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
    return this.employeeCollection$.pipe(distinct(), this.storageService.updateStorage());
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
