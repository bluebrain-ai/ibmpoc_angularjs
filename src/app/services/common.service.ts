import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private alertService: AlertService) { }
  processError = (err) => {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      // message = `Error Code: ${err.status}\nMessage: ${err.message}`;
      message = `Error Code: ${err.status}\nMessage: ${err.error}`;

    }
    this.alertService.error(message);
    console.log(message);
    this.scrollUpPage();
    return throwError(message);
  }

  scrollUpPage() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  WithoutTime(dateTime) {
    if (dateTime != null && dateTime != '') {
      var date = new Date(dateTime);
      var year = date.getFullYear();
      var month = Number(date.getMonth()) + Number(1);
      var day = date.getDate()
      return year + '-' + month + '-' + day;
    }
    else {
      return null;
    }
  }
}
