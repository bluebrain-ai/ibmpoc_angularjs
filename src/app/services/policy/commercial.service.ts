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
export class CommercialService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) {
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  commercialPolicyInquiry(commercialPolicyobj): Observable<any> {

    return this.httpClient.post<any>(environment.commercialInquiry + EndPoints.COMMERCIAL_ENQUIRY, JSON.stringify(commercialPolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  commercialPolicyDelete(policyNo: string, customerNo: string): Observable<any> {
    let commercialPolicyobj = {
      caRequestId: '01DCOM',
      caCustomerNum: customerNo,
      caPolicyRequest: { caPolicyNum: policyNo }
    }
    return this.httpClient.post<any>(environment.commercialDelete + EndPoints.COMMERCIAL_DELETE, JSON.stringify(commercialPolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  commercialPolicyAdd(commercialPolicyDetails): Observable<any> {
    let commercialPolicyobj = {
      caRequestId: '01ACOM',
      caCustomerNum: commercialPolicyDetails.caCustomerNum,
      caPolicyRequest: {
        caCommercial: commercialPolicyDetails,
        caPolicyCommon: {
          "caBrokerid": 0,
          "caBrokersref": "",
          "caExpiryDate": commercialPolicyDetails.caExpiryDate,
          "caIssueDate": commercialPolicyDetails.caIssueDate,
          "caLastchanged": "",
          "caPayment": 0
        }
      }
    }
    return this.httpClient.post(environment.commercialAdd + EndPoints.COMMERCIAL_ADD, JSON.stringify(commercialPolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }



}
