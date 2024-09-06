import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private readonly datePipe: DatePipe) { }

  formatDateToISO(date: string | null): string | null{
    if (!date) {
      return null;
    }

    const dateJoined = new Date(date);
    return this.datePipe.transform(dateJoined, 'yyyy-MM-dd');
  }
}
