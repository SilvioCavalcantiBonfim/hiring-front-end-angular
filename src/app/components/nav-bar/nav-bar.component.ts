import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateDialogComponent } from '@components/dialog/create/create-dialog.component';
import { EmployeeInput } from '@interfaces/employee';
import { CsvService } from '@services/csv.service';
import { EmployeeService } from '@services/employee.service';
import { PaginatorService } from '@services/paginator.service';
import { fromEvent, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {

  @Input()
  title!: string;

  @ViewChild('download', { read: ElementRef }) 
  downloadButton!: ElementRef;

  constructor(
    private readonly dialog: MatDialog,
    private readonly employeeService: EmployeeService,
    private readonly csvService: CsvService,
    private readonly paginatorService: PaginatorService
  ){}

  ngAfterViewInit(): void {
    fromEvent(this.downloadButton.nativeElement, 'click')
    .pipe(
      withLatestFrom(
        this.employeeService.read()
        .pipe(this.paginatorService.applyPaginator()))
    )
    .subscribe((event) => {
      return this.csvService.download(event[1]);
    });
  }

  onCreate(): void{
    const createDialog = this.dialog.open(CreateDialogComponent);

    createDialog.afterClosed().subscribe((newEmployee: EmployeeInput) => {
      if(newEmployee) this.employeeService.create(newEmployee);
    });
  }
}
