import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeInput } from '@interfaces/employee';
import { JsonCrudService } from '@services/json-crud.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent {

  createEmployeeForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', Validators.required],
    department: ['', Validators.required],
    role: ['', Validators.required],
    dateJoined: ['', Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    private jsonCrud: JsonCrudService,
    private formBuilder: FormBuilder
  ) { }

  onSubmit() {
    this.jsonCrud.create(this.createEmployeeForm.value as EmployeeInput)
    this.dialogRef.close();
  }
}
