import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoints } from 'src/app/constants/endPoints';
import { NGXLogger } from "ngx-logger";
import { CommonService } from '../common.service';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) {
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  customerInquiry(customerNo): Observable<any> {
    let customerObj = {
      caRequestId: '01ICUS',
      caCustomerNum: customerNo
    }
    // this.loaderService.showloader();
    return this.httpClient.post<any>(environment.customerPolicyInquiry + EndPoints.CLAIM_ENQUIRY, JSON.stringify(customerObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  customerAdd(customerDetails): Observable<any> {
    let customerObj = {
      caRequestId: '01ACUS',
      caCustomerRequest: customerDetails,
      caCustomerNum: customerDetails.caCustomerNum
    }

    return this.httpClient.post(environment.customerPolicyAdd + EndPoints.CLAIM_ADD, JSON.stringify(customerObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  customerUpdate(customerDetails): Observable<any> {

    let customerObj = {
      caRequestId: '01UCUS',
      caCustomerRequest: customerDetails,
      caCustomerNum: customerDetails.caCustomerNum

    }
    return this.httpClient.post(environment.customerPolicyUpdate + EndPoints.CLAIM_UPDATE, JSON.stringify(customerObj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }




}
