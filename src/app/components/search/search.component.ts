import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dictionary } from '@interfaces/dictionary';
import { Employee } from '@interfaces/employee';
import { EmployeeService } from '@services/employee/employee.service';
import { FilterService } from '@services/filter/filter.service';
import { combineLatest, debounceTime, map, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  constructor(private readonly employeeService: EmployeeService, private readonly filterService: FilterService){}

  private subs$: Subscription[] = [];

  protected searchType = new FormControl('name');
  protected search = new FormControl('');

  private dict: Dictionary = {
    name: { name: "nome", ico: "person" },
    phone: { name: "Contato", ico: "phone" },
    email: { name: "E-mail", ico: "mail" }
  };

  private type$ = this.searchType.valueChanges.pipe(
    startWith(this.searchType.value)
  );

  protected currentType$ = this.type$.pipe(
    map(value => this.dict[value || 'name'])
  );

  protected options$ = combineLatest([
    this.employeeService.read(),
    this.type$,
    this.search.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([response, searchType, searchFilter]) => this.getFilteredOptions(response, searchType || 'name', searchFilter || ''))
  );

  private getFilteredOptions(response: { data: Employee[] }, searchType: string, searchFilter: string) {
    const data = response.data;
    const filterText = searchFilter.toLowerCase();

    return Array.from(
      new Set(
        data
          .map(emp => emp[searchType as keyof Employee])
          .filter(attribute => this.matchesFilter(attribute, filterText))
      )
    );
  }

  private matchesFilter(attribute: string | number, filterText: string): boolean {
    if (typeof attribute === 'string') {
      return attribute.toLowerCase().includes(filterText);
    }
    return false;
  }

  isEmpty(): boolean {
    const value = this.search.value;
    return value === null || value === '' || value === undefined;
  }

  ngOnInit(): void {
    
    this.subs$.push(this.searchType.valueChanges.subscribe(() => this.search.reset('')));

    this.subs$.push(combineLatest([
      this.type$, 
      this.search.valueChanges.pipe(startWith(''), debounceTime(300))
    ])
    .subscribe(([key, value]) => this.filterService.setFilter(key || 'name', [value || ''])));
  }
    
  ngOnDestroy(): void {
    this.subs$.forEach(sub$ => sub$.unsubscribe());
  }
}
