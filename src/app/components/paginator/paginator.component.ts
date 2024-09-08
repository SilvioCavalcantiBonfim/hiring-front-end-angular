import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeService } from '@services/employee/employee.service';
import { PaginatorService } from '@services/paginator/paginator.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  enabledPaginator = new FormControl<boolean>(true);

  protected length$ = this.employeeService.read().pipe(map(collection => collection.data.length));

  constructor(
    private readonly employeeService: EmployeeService, 
    private readonly pagonatorService: PaginatorService
  ){}

  ngOnInit(): void {
    this.enabledPaginator.valueChanges.subscribe((status) => {
      if(status != null)
        this.pagonatorService.enabled(status);
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pagonatorService.setPageIndex(event.pageIndex);
  }

}
