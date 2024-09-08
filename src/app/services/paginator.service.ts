import { Injectable } from '@angular/core';
import { Collection } from '@interfaces/collection';
import { Employee } from '@interfaces/employee';
import { BehaviorSubject, combineLatest, map, Observable, OperatorFunction } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  private paginatorStatus$ = new BehaviorSubject<{ index: number, enabled: boolean }>({ index: 0, enabled: true });

  enabled(status = true): void {
    const currentStatus = this.paginatorStatus$.value;
    this.paginatorStatus$.next({ ...currentStatus, enabled: status });
  }

  setPageIndex(index: number) {
    const currentStatus = this.paginatorStatus$.value;
    this.paginatorStatus$.next({ ...currentStatus, index: index });
  }

  applyPaginator(): OperatorFunction<Collection<Employee>, Collection<Employee>> {
    return (source: Observable<Collection<Employee>>) =>
      combineLatest([this.paginatorStatus$, source]).pipe(
        map(([status, collection]) => {
          const start = status.index * 5;
          const end = (status.index + 1) * 5;
          return { ...collection, data: status.enabled ? collection.data.slice(start, end) : collection.data };
        })
      )
  }
}
