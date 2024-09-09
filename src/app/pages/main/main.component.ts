import { Component } from '@angular/core';
import { EmployeeService } from '@services/employee/employee.service';
import { distinct, map, Observable } from 'rxjs';

@Component({
  templateUrl: './main.component.html'
})
export class MainComponent {

  constructor(private readonly employeeService: EmployeeService){}

  enabled(): Observable<boolean>{
    return this.employeeService.rawRead().pipe(map(collection => collection.data.length == 0), distinct());
  }
}
