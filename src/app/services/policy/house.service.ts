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
export class HouseService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) {
  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  housePolicyInquiry(policyNo: string, customerNo: string): Observable<any> {
    let housePolicyobj = {
      caRequestId: '01IHOU',
      caCustomerNum: customerNo,
      caPolicyRequest: { caPolicyNum: policyNo }
    }
    return this.httpClient.post<any>(environment.houseInquiry + EndPoints.HOUSE_ENQUIRY, JSON.stringify(housePolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  housePolicyDelete(policyNo: string, customerNo: string): Observable<any> {
    let housePolicyobj = {
      caRequestId: '01DHOU',
      caCustomerNum: customerNo,
      caPolicyRequest: { caPolicyNum: policyNo }
    }
    return this.httpClient.post<any>(environment.houseDelete + EndPoints.HOUSE_DELETE, JSON.stringify(housePolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  housePolicyAdd(housePolicyDetails): Observable<any> {
    let housePolicyobj = {
      caRequestId: '01AHOU',
      caCustomerNum: housePolicyDetails.caCustomerNum,
      caPolicyRequest: {
        caHouse: housePolicyDetails, caPolicyCommon: {
          "caBrokerid": 0,
          "caBrokersref": "",
          "caExpiryDate": housePolicyDetails.caExpiryDate,
          "caIssueDate": housePolicyDetails.caIssueDate,
          "caLastchanged": "",
          "caPayment": 0
        }
      }
    }
    return this.httpClient.post(environment.houseAdd + EndPoints.HOUSE_ADD, JSON.stringify(housePolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }

  housePolicyUpdate(housePolicyDetails, policyNo): Observable<any> {
    let housePolicyobj = {
      caRequestId: '01IHOU',
      caCustomerNum: housePolicyDetails.caCustomerNum,
      caPolicyRequest: {
        caHouse: housePolicyDetails, caPolicyNum: policyNo, caPolicyCommon: {
          "caBrokerid": 0,
          "caBrokersref": "",
          "caExpiryDate": housePolicyDetails.caExpiryDate,
          "caIssueDate": housePolicyDetails.caIssueDate,
          "caLastchanged": "",
          "caPayment": 0
        }
      }
    }
    return this.httpClient.post(environment.houseUpdate + EndPoints.HOUSE_UPDATE, JSON.stringify(housePolicyobj), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.commonService.processError)
      )
  }


}
