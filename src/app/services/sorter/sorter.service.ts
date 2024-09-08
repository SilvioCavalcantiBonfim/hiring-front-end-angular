import { Injectable } from '@angular/core';
import { Collection } from '@interfaces/collection';
import { Employee } from '@interfaces/employee';
import { BehaviorSubject, combineLatest, map, Observable, OperatorFunction } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SorterService {

  private sorted$ = new BehaviorSubject({ column: 'id', type: true });

  setSort(column: string): void {
    const currentSort = this.sorted$.value;
    const newSort = { column, type: currentSort.column != column || !currentSort.type }
    this.sorted$.next(newSort);
  }

  getColumn(): string {
    const currentSort = this.sorted$.value;
    return currentSort.column;
  }

  getSort(): boolean {
    const currentSort = this.sorted$.value;
    return currentSort.type;
  }

  applySort(): OperatorFunction<Collection<Employee>, Collection<Employee>> {
    return (source: Observable<Collection<Employee>>) =>
      combineLatest([this.sorted$, source]).pipe(
        map(([sort, collection]) => {

          let sortedData = [...collection.data].sort((a, b) => {
            const first = a[sort.column as keyof Employee];
            const last = b[sort.column as keyof Employee];

            if (first == null || last == null) return 0;

            if (typeof first === 'string' && typeof last === 'string') {
              return first.localeCompare(last, undefined, { sensitivity: 'base' });
            }

            if (typeof first === 'number' && typeof last === 'number') {
              return first - last;
            }
            return 0;
          });

          if(!sort.type){
            sortedData = sortedData.reverse();
          }

          return { data: sortedData };
        })
      );
  }
}
