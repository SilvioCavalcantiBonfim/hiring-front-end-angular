import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDateToISO(date: string | null): string | null{
    if (!date) {
      return null;
    }

    const dateJoined = moment(date).utc().format('YYYY-MM-DD');
    return dateJoined;
  }
}
