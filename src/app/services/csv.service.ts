import { Injectable } from '@angular/core';
import { Collection } from '@interfaces/collection';
import { Employee } from '@interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  private convertToStringCSV(collection: Collection<Employee>): string{
  
    const { data } = collection;

    const headers = Object.keys(data[0]);

    const body = data.map((employee) => {
      const row = headers.map(header => employee[header as keyof Employee].toString()).join(',');
      console.log(row)
      return row;
    })

    const csv = `${headers.join(',')}\n${body.join('\n')}`

    return csv;
  }

  download(collection: Collection<Employee>){
    const csvString = this.convertToStringCSV(collection);

    const blob: Blob = new Blob([csvString], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'employee.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }
}
