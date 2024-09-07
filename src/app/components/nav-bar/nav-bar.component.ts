import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateDialogComponent } from '@components/create-dialog/create-dialog.component';
import { Collection } from '@interfaces/collection';
import { Employee, EmployeeInput } from '@interfaces/employee';
import { CsvService } from '@services/csv.service';
import { EmployeeService } from '@services/employee.service';
import { fromEvent, map, switchMap } from 'rxjs';

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

  protected readonly buttonStatus$ = this.employeeService.read().pipe(map((collection) => collection.data.length === 0));

  constructor(
    private readonly dialog: MatDialog,
    private readonly employeeService: EmployeeService,
    private readonly csvService: CsvService
  ){}

  ngAfterViewInit(): void {
    fromEvent(this.downloadButton.nativeElement, 'click')
    .pipe(switchMap(() => this.employeeService.read()))
    .subscribe((collection: Collection<Employee>) => {
      return this.csvService.download(collection);
    });
  }

  onCreate(): void{
    const createDialog = this.dialog.open(CreateDialogComponent);

    createDialog.afterClosed().subscribe((newEmployee: EmployeeInput) => {
      if(newEmployee) this.employeeService.create(newEmployee);
    });
  }
}
