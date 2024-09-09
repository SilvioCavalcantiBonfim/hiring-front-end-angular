import { Collection } from "@interfaces/collection";
import { Employee, EmployeeInput } from "@interfaces/employee";
import { OperatorFunction } from "rxjs";

export interface StorageService{
  loadDataStorage(): EmployeeInput[];
  updateStorage(): OperatorFunction<Collection<Employee>, Collection<Employee>>;
}