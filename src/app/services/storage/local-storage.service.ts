import { Injectable } from '@angular/core';
import { Collection } from '@interfaces/collection';
import { Employee, EmployeeInput } from '@interfaces/employee';
import { StorageService } from './storage.service';
import { Observable, OperatorFunction, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageService {

  updateStorage(): OperatorFunction<Collection<Employee>, Collection<Employee>> {
    return (source: Observable<Collection<Employee>>) => source.pipe(tap(collection => this.localUpdateStorage(collection)));
  }

  loadDataStorage(): EmployeeInput[]{
    console.log("flags")
    const item = localStorage.getItem('data');
    if(item == null) return[];

    const itemConvert = JSON.parse(item) as Employee[];

    return itemConvert.map(employee => ({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      role: employee.role,
      dateJoined: employee.dateJoined
    }));
  }

  private localUpdateStorage(collection: Collection<Employee>){
    if (!collection.data || !Array.isArray(collection.data)) return
    localStorage.setItem('data', JSON.stringify(collection.data));
  }
}

