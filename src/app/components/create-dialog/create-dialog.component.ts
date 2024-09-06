import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeInput } from '@interfaces/employee';
import { DateService } from '@services/date/date.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class CreateDialogComponent {


  protected readonly createEmployeeForm;

  constructor(
    private readonly dialogRef: MatDialogRef<CreateDialogComponent>,
    private readonly dateService: DateService,
    formBuilder: FormBuilder
  ) {
    this.createEmployeeForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      dateJoined: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createEmployeeForm.valid) {
      const dateJoined = this.dateService.formatDateToISO(this.createEmployeeForm.controls.dateJoined.value);
      this.dialogRef.close({ ...this.createEmployeeForm.value, dateJoined: dateJoined } as EmployeeInput);
    }
  }
}
