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
    console.log('error----', err)
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      // message = `Error Code: ${err.status}\nMessage: ${err.message}`;
      // message = `Error Code: ${err.status}\nMessage: ${err.error}`;
      message = `Error Code: 500 \n Message: Interal Server Error`;
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
      var month = (Number(date.getMonth()) + Number(1)).toString();
      let checkMonthLength = month.toString().length;
      if (checkMonthLength == 1) {
        month = ('0' + month).toString()
      }
      var day = date.getDate().toString();
      let checkDateLength = day.length;
      if (checkDateLength == 1) {
        day = ('0' + day).toString()
      }
      return year + '-' + month + '-' + day;
    }
    else {
      return null;
    }
  }


  showRequestCode(requestCode) {
    let reqCode = Number(requestCode);
    if (reqCode > 0 && reqCode <= 10) {
      this.alertService.error(`No Record Found`);
    }
    else {
      this.alertService.error(`Error Code : ${requestCode} Message : Please try again..`);
    }
    this.scrollUpPage();

  }

  convertDatetime(dateValue) {
    var date_regex = /\d{4}-\d{2}-\d{2}/;
    if (date_regex.test(dateValue)) {
      return new Date(dateValue.split('-'));
    }
    else {
      return ''
    }
  }


}
