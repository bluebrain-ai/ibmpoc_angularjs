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

}
