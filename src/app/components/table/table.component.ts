import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from '@components/update-dialog/update-dialog.component';
import { Employee } from '@interfaces/employee';
import { EmployeeService } from '@services/employee.service';
import { PaginatorService } from '@services/paginator.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  constructor(
    private employeeService: EmployeeService, 
    private paginatorService: PaginatorService,
    private dialog: MatDialog, 
    private bottomSheet: MatBottomSheet
  ) { }

  protected currentEmployee$ = this.paginatorService.applyPaginatorToCollection(this.employeeService.read());

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
