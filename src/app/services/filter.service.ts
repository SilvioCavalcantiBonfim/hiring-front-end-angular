import { Injectable } from '@angular/core';
import { Collection } from '@interfaces/collection';
import { Employee } from '@interfaces/employee';
import { Filter } from '@interfaces/filter';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private currentFilter$ = new BehaviorSubject<Filter>({key: 'name', value: ''});

  addFilter(key: string, value: string) {
    this.currentFilter$.next({ key, value });
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
    const attributeValue = employee[filter.key as keyof Employee];
    return attributeValue
      ? attributeValue.toString().toLowerCase().includes(filter.value.toLowerCase())
      : false;
  }
}
