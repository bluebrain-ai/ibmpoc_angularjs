import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/app/constants/endPoints';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) {
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  motorPolicyInquiry(policyNo: string, customerNo: string): Observable<any> {
    let motoyPolicyObj = {
      caRequestId: '01IMOT',
      caCustomerNum: customerNo,
      caPolicyRequest: { caPolicyNum: policyNo }
    }
    return this.httpClient.post<any>(environment.motorInquiry + EndPoints.MOTOR_ENQUIRY, JSON.stringify(motoyPolicyObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  motorPolicyDelete(policyNo: string, customerNo: string): Observable<any> {
    let motoyPolicyObj = {
      caRequestId: '01DMOT',
      caCustomerNum: customerNo,
      caPolicyRequest: { caPolicyNum: policyNo }
    }
    return this.httpClient.post<any>(environment.motorDelete + EndPoints.MOTOR_DELETE, JSON.stringify(motoyPolicyObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  motorPolicyAdd(motorPolicyDetails): Observable<any> {

    let motoyPolicyObj = {
      caRequestId: '01AMOT',
      caCustomerNum: motorPolicyDetails.caCustomerNum,
      caPolicyRequest: {
        caMotor: motorPolicyDetails, caPolicyCommon: {
          "caBrokerid": motorPolicyDetails.caBrokerid,
          "caBrokersref": motorPolicyDetails.caBrokersref,
          "caExpiryDate": motorPolicyDetails.caExpiryDate,
          "caIssueDate": motorPolicyDetails.caIssueDate,
          "caLastchanged": "",
          "caPayment": 0
        }
      }

    }
    return this.httpClient.post(environment.motorAdd + EndPoints.MOTOR_ADD, JSON.stringify(motoyPolicyObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  motorPolicyUpdate(motorPolicyDetails, policyNo): Observable<any> {
    let motoyPolicyObj = {
      caRequestId: '01UMOT',
      caCustomerNum: motorPolicyDetails.caCustomerNum,
      caPolicyRequest: {
        caMotor: motorPolicyDetails, caPolicyNum: policyNo, caPolicyCommon: {
          "caBrokerid": motorPolicyDetails.caBrokerid,
          "caBrokersref": motorPolicyDetails.caBrokersref,
          "caExpiryDate": motorPolicyDetails.caExpiryDate,
          "caIssueDate": motorPolicyDetails.caIssueDate,
          "caLastchanged": "",
          "caPayment": 0
        }
      }
    }
    return this.httpClient.post(environment.motorUpdate + EndPoints.MOTOR_UPDATE, JSON.stringify(motoyPolicyObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }



}
