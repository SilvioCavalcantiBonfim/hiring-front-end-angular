import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateDialogComponent } from '@components/create-dialog/create-dialog.component';
import { EmployeeInput } from '@interfaces/employee';
import { EmployeeService } from '@services/employee.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  @Input()
  title!: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly employeeService: EmployeeService
  ){}

  onCreate(): void{
    const createDialog = this.dialog.open(CreateDialogComponent);

    createDialog.afterClosed().subscribe((newEmployee: EmployeeInput) => {
      if(newEmployee) this.employeeService.create(newEmployee);
    });
  }
}
