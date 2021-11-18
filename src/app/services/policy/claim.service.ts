import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IcustomerInquiryResponse } from 'src/app/model/customer';
import { EndPoints } from 'src/app/constants/endPoints';
@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  claimInquiryEndpoint = environment.customerPolicy
  constructor(private httpClient: HttpClient) {
    console.log(environment.customerPolicy);
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



  claimInquiry(customerNo): Observable<IcustomerInquiryResponse> {
    let customerObj = {
      caRequestId: '01ICUS',
      caCustomerNum: customerNo
    }
    return this.httpClient.post<IcustomerInquiryResponse>(this.claimInquiryEndpoint + EndPoints.CLAIM_ENQUIRY, JSON.stringify(customerObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  claimAdd(customerDetails): Observable<any> {

    return this.httpClient.post(this.claimInquiryEndpoint + EndPoints.CLAIM_ADD, JSON.stringify(customerDetails), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  claimUpdate(customerDetails): Observable<any> {

    return this.httpClient.post(this.claimInquiryEndpoint + EndPoints.CLAIM_UPDATE, JSON.stringify(customerDetails), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }



  processError(err) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}
