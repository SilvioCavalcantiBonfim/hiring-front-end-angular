import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JsonCrudService } from 'src/app/services/json-crud.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    private jsonCrud: JsonCrudService
  ){}
}
