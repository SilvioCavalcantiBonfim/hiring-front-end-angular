import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { Employee } from '@interfaces/employee';
import { EmployeeService } from '@services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hiring-front-end-angular';

  constructor(protected employeeService: EmployeeService, private dialog: MatDialog) { }

  openDeleteDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { employee: employee }
    });

    dialogRef.afterClosed().subscribe(id => {
      if(id) this.employeeService.delete(id)
    });
  }
}
