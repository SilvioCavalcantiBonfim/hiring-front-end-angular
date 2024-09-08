import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateDialogComponent } from '@components/dialog/create/create-dialog.component';
import { Collection } from '@interfaces/collection';
import { Employee, EmployeeInput } from '@interfaces/employee';
import { CsvService } from '@services/csv/csv.service';
import { EmployeeService } from '@services/employee/employee.service';
import { PaginatorService } from '@services/paginator/paginator.service';
import { fromEvent, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {

  @Input()
  title!: string;

  @ViewChild('download', { read: ElementRef })
  downloadButton!: ElementRef;

  @ViewChild('upload', { read: ElementRef })
  uploadInput!: ElementRef;

  constructor(
    private readonly dialog: MatDialog,
    private readonly employeeService: EmployeeService,
    private readonly csvService: CsvService,
    private readonly paginatorService: PaginatorService
  ) { }

  ngAfterViewInit(): void {
    this.initializeDownloadButton();
    this.initializeUploadInput();
  }

  private initializeDownloadButton(): void {
    fromEvent(this.downloadButton.nativeElement, 'click')
      .pipe(
        withLatestFrom(
          this.employeeService.read().pipe(this.paginatorService.applyPaginator())
        )
      )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .subscribe(([_, employees]) => {
        this.csvService.download(employees);
      });
  }

  private initializeUploadInput(): void {
    fromEvent(this.uploadInput.nativeElement, 'change')
      .subscribe((event) => this.handleFileUpload(event as Event));
  }

  private handleFileUpload(event: Event): void {
    const input = (event.target as HTMLInputElement);
    if (input.files && input.files.length) {
      const selectedFile = input.files[0];
      this.readFile(selectedFile);
    }
  }

  private readFile(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        if (file.type === 'text/csv') {
          this.processCsvFile(reader.result as string);
        } else if (file.type === 'application/json') {
          this.processJsonFile(reader.result as string);
        } else {
          console.warn('Tipo de arquivo não suportado.');
        }
      } catch (error) {
        console.error('Erro ao processar o arquivo', error);
      }
    };

    reader.onerror = (error) => {
      console.error('Erro ao ler o arquivo', error);
    };

    reader.readAsText(file);
  }

  private processCsvFile(content: string): void {
    const rows = content.split('\n');
    rows.shift();

    rows.forEach(row => {
      const data = row.split(',');
      data.shift();
      if (data.length >= 6) {
        const employee: EmployeeInput = { 
          name: data[0], 
          email: data[1], 
          phone: data[2], 
          department: data[3], 
          role: data[4], 
          dateJoined: data[5] 
        };
        this.employeeService.create(employee);
      }
    });
  }

  private processJsonFile(content: string): void {
    try {
      const jsonData = JSON.parse(content) as Collection<Employee>;
      jsonData.data.forEach(e => {
        if (e.name && e.email && e.phone && e.department && e.role && e.dateJoined) {
          const employee: EmployeeInput = { 
            name: e.name, 
            email: e.email, 
            phone: e.phone, 
            department: e.department, 
            role: e.role, 
            dateJoined: e.dateJoined 
          };
          this.employeeService.create(employee);
        }
      });
    } catch (error) {
      console.error('Erro ao parsear o arquivo JSON', error);
    }
  }

  onCreate(): void {
    const createDialog = this.dialog.open(CreateDialogComponent);

    createDialog.afterClosed().subscribe((newEmployee: EmployeeInput) => {
      if (newEmployee) this.employeeService.create(newEmployee);
    });
  }
}
