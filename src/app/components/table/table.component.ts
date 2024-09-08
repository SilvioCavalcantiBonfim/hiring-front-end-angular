import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@components/dialog/delete/delete-dialog.component';
import { UpdateDialogComponent } from '@components/dialog/update/update-dialog.component';
import { Collection } from '@interfaces/collection';
import { Employee } from '@interfaces/employee';
import { EmployeeService } from '@services/employee/employee.service';
import { PaginatorService } from '@services/paginator/paginator.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  protected readonly currentEmployee$: Observable<Collection<Employee>>;

  constructor(
    private employeeService: EmployeeService, 
    paginatorService: PaginatorService,
    private dialog: MatDialog, 
    private bottomSheet: MatBottomSheet
  ) { 
    this.currentEmployee$ = employeeService.read().pipe(paginatorService.applyPaginator());
  }


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
