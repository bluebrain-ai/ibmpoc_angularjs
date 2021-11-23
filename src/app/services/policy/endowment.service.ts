import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/app/constants/endPoints';
import { IEndowmentInquiryResponse } from 'src/app/model/endowmentPolicy';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class EndowmentService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) {
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  motorPolicyInquiry(policyNo: string, customerNo: string): Observable<any> {
    let endowmentPolicyobj = {
      caRequestId: '01IEND',
      caCustomerNum: customerNo,
      caPolicyNum: policyNo
    }
    return this.httpClient.post<any>(environment.endowmentInquiry + EndPoints.ENDOWMENT_ENQUIRY, JSON.stringify(endowmentPolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  motorPolicyDelete(policyNo: string, customerNo: string): Observable<any> {
    let endowmentPolicyobj = {
      caRequestId: '01DEND',
      caCustomerNum: customerNo,
      caPolicyNum: policyNo
    }
    return this.httpClient.post<any>(environment.endowmentDelete + EndPoints.ENDOWMENT_DELETE, JSON.stringify(endowmentPolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  motorPolicyAdd(endowmentPolicyDetails): Observable<any> {
    let endowmentPolicyobj = {
      caRequestId: '01AEND',
      caCustomerNum: endowmentPolicyDetails.caCustomerNum,
      caEndowment: endowmentPolicyDetails
    }
    return this.httpClient.post(environment.endowmentAdd + EndPoints.ENDOWMENT_ADD, JSON.stringify(endowmentPolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  motorPolicyUpdate(endowmentPolicyDetails): Observable<any> {
    let endowmentPolicyobj = {
      caRequestId: '01UEND',
      caCustomerNum: endowmentPolicyDetails.caCustomerNum,
      caEndowment: endowmentPolicyDetails
    }
    return this.httpClient.post(environment.endowmentUpdate + EndPoints.ENDOWMENT_UPDATE, JSON.stringify(endowmentPolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }




}
