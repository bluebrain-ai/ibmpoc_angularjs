import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IcustomerInquiryResponse } from 'src/app/model/customer';
import { EndPoints } from 'src/app/constants/endPoints';
import { NGXLogger } from "ngx-logger";
import { CommonService } from '../common.service';
import { LoaderService } from '../loader.service';
@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private httpClient: HttpClient, private logger: NGXLogger, private commonService: CommonService) {
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  claimInquiry(customerNo): Observable<any> {
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

  claimAdd(customerDetails): Observable<any> {
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

  claimUpdate(customerDetails): Observable<any> {

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
