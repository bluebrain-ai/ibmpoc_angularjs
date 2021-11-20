import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/app/constants/endPoints';
import { IMotorInquiryResponse } from 'src/app/model/motorPolicy';

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  motorPolicyEndpoint = environment.customerPolicy
  constructor(private httpClient: HttpClient) {
    console.log(environment.customerPolicy);
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  motorPolicyInquiry(policyNo: string, customerNo: string): Observable<IMotorInquiryResponse> {
    let motoyPolicyObj = {
      caRequestId: '01IMOT',
      caCustomerNum: customerNo,
      caPolicyNum: policyNo
    }
    return this.httpClient.post<IMotorInquiryResponse>(this.motorPolicyEndpoint + EndPoints.MOTOR_ENQUIRY, JSON.stringify(motoyPolicyObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  motorPolicyDelete(policyNo: string, customerNo: string): Observable<any> {
    let motoyPolicyObj = {
      caRequestId: '01DMOT',
      caCustomerNum: customerNo,
      caPolicyNum: policyNo
    }
    return this.httpClient.post<any>(this.motorPolicyEndpoint + EndPoints.MOTOR_DELETE, JSON.stringify(motoyPolicyObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  motorPolicyAdd(motorPolicyDetails): Observable<any> {

    return this.httpClient.post(this.motorPolicyEndpoint + EndPoints.MOTOR_ADD, JSON.stringify(motorPolicyDetails), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.processError)
      )
  }

  motorPolicyUpdate(motorPolicyDetails): Observable<any> {

    return this.httpClient.post(this.motorPolicyEndpoint + EndPoints.MOTOR_UPDATE, JSON.stringify(motorPolicyDetails), this.httpHeader)
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
