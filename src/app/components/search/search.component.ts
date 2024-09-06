import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Employee } from '@interfaces/employee';
import { EmployeeService } from '@services/employee.service';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {


  constructor(private employeeService: EmployeeService) {
  }

  protected searchType = new FormControl('name');

  private dict: { [key: string]: { name: string, ico: string } } = {
    "name": { name: "nome", ico: "person" },
    "phone": { name: "Contato", ico: "phone" },
    "email": { name: "E-mail", ico: "mail" }
  }

  private type$ = this.searchType.valueChanges.pipe(
    startWith(this.searchType.value))

  protected currentType$ = this.type$.pipe(
    map((value: string | null) => this.dict[value || 'name']))

  protected options$ = combineLatest([
    this.employeeService.read(),
    this.type$
  ])
    .pipe(map(([{ data }, searchType]) => {
      return Array.from(new Set(data.map(emp => emp[searchType as keyof Employee])));
    }))
}
