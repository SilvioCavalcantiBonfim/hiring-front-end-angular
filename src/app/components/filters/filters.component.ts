import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Collection } from '@interfaces/collection';
import { Employee } from '@interfaces/employee';
import { EmployeeService } from '@services/employee.service';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  protected departments = new FormControl('');
  protected roles = new FormControl('');

  private employees$ = this.employeeService.read().pipe(shareReplay(1));

  protected departmentList$ = this.employees$.pipe(map(this.extractDepartmentList));
  protected roleList$ = this.employees$.pipe(map(this.extractRoleList));

  constructor(private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.setupFormControlsSync();
  }

  private setupFormControlsSync(): void {
    this.departments.valueChanges.subscribe(this.setFormValue(this.roles));
    this.roles.valueChanges.subscribe(this.setFormValue(this.departments));
  }

  private setFormValue(formControl: FormControl<string | null>): (value: string | null) => void {
    return (value) => {
      if (value) {
        formControl.setValue('');
      }
    }
  }

  private extractDepartmentList(collection: Collection<Employee>): string[] {
    return Array.from(new Set(collection.data.map(e => e.department)));
  }

  private extractRoleList(collection: Collection<Employee>): string[] {
    return Array.from(new Set(collection.data.map(e => e.role)));
  }
}
