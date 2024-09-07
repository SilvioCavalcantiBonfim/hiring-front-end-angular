import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Collection } from '@interfaces/collection';
import { Employee } from '@interfaces/employee';
import { EmployeeService } from '@services/employee.service';
import { FilterService } from '@services/filter.service';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  protected departments = new FormControl<string[]>([]);
  protected roles = new FormControl<string[]>([]);

  private employees$: Observable<Collection<Employee>> = this.employeeService.read();

  protected departmentList$: Observable<string[]> = this.employees$.pipe(map(this.extractList('department')));
  protected roleList$: Observable<string[]> = this.employees$.pipe(map(this.extractList('role')));

  private subscriptions: Subscription = new Subscription();

  constructor(private readonly employeeService: EmployeeService, private readonly filterService: FilterService) { }

  private extractList(key: keyof Employee): (collection: Collection<Employee>) => string[] {
    return (collection: Collection<Employee>) => 
      Array.from(new Set(collection.data.map(e => e[key] as string)));
  }

  ngOnInit(): void {
    this.setupFormControlsSync();
  }

  
  private setupFormControlsSync(): void {
    const syncDepartments = this.syncFilterControl(this.departments, 'department');
    const syncRoles = this.syncFilterControl(this.roles, 'role');
    
    this.subscriptions.add(syncDepartments);
    this.subscriptions.add(syncRoles);
  }
  

  private syncFilterControl(
    sourceControl: FormControl<string[] | null>, 
    filterKey: string
  ): Subscription {
    return sourceControl.valueChanges.subscribe(this.applyFilter(filterKey));
  }
  
  private applyFilter(attribute: string){
    return (value: string[] | null) => {
      if (value && value.length > 0) {
        this.filterService.setFilter(attribute, value);
      } else {
        this.filterService.clearFilter(attribute);
      }
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
