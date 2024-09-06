import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from '@components/update-dialog/update-dialog.component';
import { Employee } from '@interfaces/employee';
import { EmployeeService } from '@services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hiring-front-end-angular';

  constructor(
    protected employeeService: EmployeeService, 
    private dialog: MatDialog, 
    private bottomSheet: MatBottomSheet
  ) { }

  openDeleteDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { employee: employee }
    });

    dialogRef.afterClosed().subscribe(id => {
      if (id != null) this.employeeService.delete(id)
    });
  }

  openUpdateSheet(employee: Employee): void {

    const bottomSheetUpdate = this.bottomSheet.open(UpdateDialogComponent, { data: { employee: employee } });

    bottomSheetUpdate
      .afterDismissed()
      .subscribe(updateEmployee => {
        if(updateEmployee) this.employeeService.update(updateEmployee.id, updateEmployee.updatedData);
      });
  }
}
