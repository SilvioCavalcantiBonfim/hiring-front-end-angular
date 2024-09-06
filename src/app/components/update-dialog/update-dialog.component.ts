import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Employee, EmployeeUpdateInput } from '@interfaces/employee';
import { DateService } from '@services/date/date.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
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
export class UpdateDialogComponent {

  private readonly id: number;
  protected readonly updateEmployeeForm;

  constructor(
    private readonly bottomSheetRef: MatBottomSheetRef<UpdateDialogComponent>,
    private readonly dateService: DateService,
    @Inject(MAT_BOTTOM_SHEET_DATA) { employee }: { employee: Employee },
    formBuilder: FormBuilder
  ) {

    this.id = employee.id;

    this.updateEmployeeForm = formBuilder.group({
      name: [employee.name, Validators.required],
      email: [employee.email, [Validators.email, Validators.required]],
      phone: [employee.phone, Validators.required],
      department: [employee.department, Validators.required],
      role: [employee.role, Validators.required],
      dateJoined: [employee.dateJoined, Validators.required]
    });
  }

  onSubmit() {
    if (this.updateEmployeeForm.valid) {
      const dateJoined = this.dateService.formatDateToISO(this.updateEmployeeForm.controls.dateJoined.value);
      this.bottomSheetRef.dismiss({
        id: this.id,
        updatedData: {
          ...this.updateEmployeeForm.value,
          dateJoined: dateJoined
        } as EmployeeUpdateInput
      });
    }
  }
}
