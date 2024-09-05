import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { JsonCrudService } from '@services/json-crud.service';
import { Employee } from '@interfaces/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hiring-front-end-angular';

  constructor(protected JsonCrud: JsonCrudService, private dialog: MatDialog) { }

  openDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { employee: employee }
    });

    dialogRef.afterClosed().subscribe(id => {
      if(id) this.JsonCrud.delete(id)
    });
  }
}
