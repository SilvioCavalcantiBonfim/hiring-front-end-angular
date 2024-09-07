import { Injectable } from '@angular/core';
import { Collection } from '@interfaces/collection';
import { Employee } from '@interfaces/employee';
import { Filter } from '@interfaces/filter';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private activeFilters$ = new BehaviorSubject<Filter>({});

  setFilter(filterName: string, value: string[], relative = true) {
    const currentFilters = this.activeFilters$.value;
    currentFilters[filterName] = {args: value, relative: relative};
    this.activeFilters$.next(currentFilters);
  }

  applyFiltersToCollection(observer: BehaviorSubject<Collection<Employee>>): Observable<Collection<Employee>> {
    return combineLatest([this.activeFilters$, observer]).pipe(
      map(([filter, collection]) => this.filterCollection(filter, collection))
    );
  }

  private filterCollection(filter: Filter, collection: Collection<Employee>): Collection<Employee> {
    const filteredData = collection.data.filter(employee => this.matchesFilter(employee, filter));
    return { ...collection, data: filteredData };
  }

  private matchesFilter(employee: Employee, filters: Filter): boolean {
    return Object.entries(filters).every(([filterKey, filterValues]) => {
      const employeeAttribute = employee[filterKey as keyof Employee];
      if (!employeeAttribute) return false;
      return this.matchesAnyFilterValue(filterValues.args, employeeAttribute as string, filterValues.relative);
    });
  }
  
  private matchesAnyFilterValue(filterValues: string[], employeeAttributeValue: string, relative: boolean): boolean {
    return filterValues.some(filterValue => {
      if(relative){
        return employeeAttributeValue.toLowerCase().includes(filterValue.toLowerCase());
      }else{
        return employeeAttributeValue.toLowerCase() === filterValue.toLowerCase();
      }
    }
    );
  }

  clearFilter(filterName: string): void {
    const currentFilters = this.activeFilters$.value;
    delete currentFilters[filterName];
    this.activeFilters$.next(currentFilters);
  }

}
