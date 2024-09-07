import { Injectable } from '@angular/core';
import { Collection } from '@interfaces/collection';
import { Employee } from '@interfaces/employee';
import { Filter, NULL_FILTER } from '@interfaces/filter';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private currentFilter$ = new BehaviorSubject<Filter>(NULL_FILTER);

  addFilter(attribute: string, value: string[]) {
    this.currentFilter$.next({ attribute, value });
  }

  applyIn(observer: BehaviorSubject<Collection<Employee>>): Observable<Collection<Employee>> {
    return combineLatest([this.currentFilter$, observer]).pipe(
      map(([filter, collection]) => this.filterCollection(filter, collection))
    );
  }

  private filterCollection(filter: Filter, collection: Collection<Employee>): Collection<Employee> {
    const filteredData = collection.data.filter(employee => this.matchesFilter(employee, filter));
    return { ...collection, data: filteredData };
  }

  private matchesFilter(employee: Employee, filter: Filter): boolean {
    const attributeValue = employee[filter.attribute as keyof Employee];
    return attributeValue
      ? filter.value.some((value) => this.matchesFilterValue(value, attributeValue as string))
      : false;
  }
  
  private matchesFilterValue(filterValue: string, attributeValue: string): boolean {
    return attributeValue.toLowerCase().includes(filterValue.toLowerCase());
  }
  
}
