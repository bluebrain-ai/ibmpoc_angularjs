import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/app/constants/endPoints';
import { IEndowmentInquiryResponse } from 'src/app/model/endowmentPolicy';

@Injectable({
  providedIn: 'root'
})
export class EndowmentService {

  endowmentPolicyEndpoint = environment.customerPolicy
  constructor(private httpClient: HttpClient) {
    console.log(environment.customerPolicy);
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  motorPolicyInquiry(policyNo: string, customerNo: string): Observable<IEndowmentInquiryResponse> {
    let motoyPolicyObj = {
      caRequestId: '01IEND',
      caCustomerNum: customerNo,
      caPolicyNum: policyNo
    }
    return this.httpClient.post<IEndowmentInquiryResponse>(this.endowmentPolicyEndpoint + EndPoints.ENDOWMENT_ENQUIRY, JSON.stringify(motoyPolicyObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  motorPolicyDelete(policyNo: string, customerNo: string): Observable<any> {
    let motoyPolicyObj = {
      caRequestId: '01DEND',
      caCustomerNum: customerNo,
      caPolicyNum: policyNo
    }
    return this.httpClient.post<any>(this.endowmentPolicyEndpoint + EndPoints.ENDOWMENT_DELETE, JSON.stringify(motoyPolicyObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  motorPolicyAdd(endowmentPolicyDetails): Observable<any> {

    return this.httpClient.post(this.endowmentPolicyEndpoint + EndPoints.ENDOWMENT_ADD, JSON.stringify(endowmentPolicyDetails), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  motorPolicyUpdate(endowmentPolicyDetails): Observable<any> {

    return this.httpClient.post(this.endowmentPolicyEndpoint + EndPoints.ENDOWMENT_UPDATE, JSON.stringify(endowmentPolicyDetails), this.httpHeader)
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
