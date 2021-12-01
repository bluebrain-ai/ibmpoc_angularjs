import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICommercialPolicy } from 'src/app/model/commercialPolicy';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { CommercialService } from 'src/app/services/policy/commercial.service';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css'],
})
export class CommercialComponent implements OnInit {
  commercialForm: FormGroup;
  submitted = false;
  noCustomerNo = false;
  noPolicyNo = false;
  noPostalCode = false;
  constructor(private formBuilder: FormBuilder, private _commercialService: CommercialService, private alertService: AlertService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.commercialForm = this.formBuilder.group({
      policyNumber: [
        ''
      ],
      customerNumber: [
        ''
      ],
      startDate: [
        ''
      ],
      expiryDate: [
        ''
      ],
      address: [''],
      postalCode: [
        ''
      ],
      latitude: [''],

      longitude: [''],
      customerName: [''],
      propType: [''],


      firePeril: [''],
      firePrem: [''],

      crimePeril: [''],
      crimePrem: [''],
      floodPeril: [''],
      floodPrem: [''],

      weatherPeril: [''],
      weatherPrem: [''],

      status: [''],
      rejectReason: [''],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.commercialForm.controls;
  }

  // entire screen reset
  onReset(): void {
    this.submitted = false;
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    this.noPostalCode = false;

    this.commercialForm.reset();
    this.commonService.scrollUpPage();

  }

  // Reset validation before on any button click
  resetValidation() {
    this.submitted = false;
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    this.noPostalCode = false;

  }
  // Hide the validation error notification on keyup
  requiredFieldKeyUp(inputName) {
    //Disable Error
    if (inputName == "CustomerNo") {
      this.noCustomerNo = false;
    }
    if (inputName == "PolicyNo") {
      this.noPolicyNo = false;
    }

    if (inputName == "PostalCode") {
      this.noPostalCode = false;
    }
    if (this.noCustomerNo != true && this.noPolicyNo != true && this.noPostalCode != true) {
      this.submitted = false
    }
    // Disable all validation if we got any one required fields
    if (this.noCustomerNo == false || this.noPolicyNo == false || this.noPostalCode == false) {
      this.submitted = false
      this.noCustomerNo = false;
      this.noPolicyNo = false;
      this.noPostalCode = false;


    }
  }
  // Validate the required feilds
  validation(formValue): boolean {
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
    }
    else {
      this.noCustomerNo = false;
    }
    if (formValue['policyNumber'] == null || formValue['policyNumber'] == "") {
      this.noPolicyNo = true;
    }
    else {
      this.noPolicyNo = false;
    }
    if (formValue['postalCode'] == null || formValue['postalCode'] == "") {
      this.noPostalCode = true;
    }
    else {
      this.noPostalCode = false;
    }
    // if any one required fields present then clear all valdation and proceed for inquiry
    if (this.noCustomerNo != true || this.noPolicyNo != true || this.noPostalCode != true) {
      this.noCustomerNo = false;
      this.noPolicyNo = false;
      this.noPostalCode = false;
      this.submitted = false;
      return true;
    }
    return false;

  }
  policyInquiry(): void {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.commercialForm.value;
    if (this.validation(formValue)) {
      this.noCustomerNo = false;
      this.noPolicyNo = false;
      // Commercial Policy Inquiry
      let commercialInquiryObj = this.prepareInquiryObj(formValue);
      this._commercialService.commercialPolicyInquiry(commercialInquiryObj).subscribe((res: any) => {
        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'Commercial', 'INQUIRY');
          return;
        }

        this.commercialForm.patchValue({
          policyNumber: res.caPolicyRequest.caPolicyNum,
          customerNumber: res.caCustomerNum,
          startDate: this.commonService.convertDatetime(res.caPolicyRequest.caPolicyCommon.caIssueDate),
          expiryDate: this.commonService.convertDatetime(res.caPolicyRequest.caPolicyCommon.caExpiryDate),
          address: res.caPolicyRequest.caCommercial.caBAddress,
          postalCode: res.caPolicyRequest.caCommercial.caBPostcode,
          latitude: res.caPolicyRequest.caCommercial.caBLatitude,
          longitude: res.caPolicyRequest.caCommercial.caBLongitude,
          customerName: res.caPolicyRequest.caCommercial.caBCustomer,
          propType: res.caPolicyRequest.caCommercial.caBProptype,
          firePeril: res.caPolicyRequest.caCommercial.caBFireperil,
          firePrem: res.caPolicyRequest.caCommercial.caBFirepremium,
          crimePeril: res.caPolicyRequest.caCommercial.caBCrimeperil,
          crimePrem: res.caPolicyRequest.caCommercial.caBCrimepremium,
          floodPeril: res.caPolicyRequest.caCommercial.caBFloodperil,
          floodPrem: res.caPolicyRequest.caCommercial.caBFloodpremium,
          weatherPeril: res.caPolicyRequest.caCommercial.caBWeatherperil,
          weatherPrem: res.caPolicyRequest.caCommercial.caBWeatherpremium,
          status: res.caPolicyRequest.caCommercial.caBStatus,
          rejectReason: res.caPolicyRequest.caCommercial.caBRejectreason
        });
      })
      this.commonService.scrollUpPage();

    }
    else {
      //Empty Else
    }
  }

  policyDelete(): void {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.commercialForm.value;
    if (this.validationCustPolicy(formValue)) {
      this._commercialService.commercialPolicyDelete(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: any) => {
        //Call alert to show notification
        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'Commercial', 'DELETE');
          return;
        }
        console.log(res, 'Res for delete Motor')
        this.onReset();
        this.alertService.success("Commercial Policy " + res.caPolicyRequest.caPolicyNum + " Deleted", false);
      })
      this.commonService.scrollUpPage();

    }
  }
  policyAdd() {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.commercialForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    let commercialPolicyAddObj: ICommercialPolicy = {
      // caRequestId: '01AEND',
      caCustomerNum: formValue['customerNumber'],
      caIssueDate: this.commonService.WithoutTime(formValue['startDate']),
      caExpiryDate: this.commonService.WithoutTime(formValue['expiryDate']),
      caBAddress: formValue['address'],
      caBPostcode: formValue['postalCode'],
      caBLatitude: formValue['latitude'],
      caBLongitude: formValue['longitude'],
      caBCustomer: formValue['customerName'],
      caBProptype: formValue['propType'],
      caBFirePeril: formValue['firePeril'],
      caBFirePremium: formValue['firePrem'],
      caBCrimePeril: formValue['crimePeril'],
      caBCrimePremium: formValue['crimePrem'],
      caBFloodPeril: formValue['floodPeril'],
      caBFloodPremium: formValue['floodPrem'],
      caBWeatherPeril: formValue['weatherPeril'],
      caBWeatherPremium: formValue['weatherPrem'],
      caBStatus: formValue['status'],
      caBRejectReason: formValue['rejectReason'],


    }
    this._commercialService.commercialPolicyAdd(commercialPolicyAddObj).subscribe((res: any) => {
      //Call alert to show notification
      if (res.caReturnCode !== 0) {
        this.commonService.showRequestCode(res.caReturnCode, 'Commercial', 'ADD');
        return;
      }
      console.log(res, 'Res for add claim')
      this.onReset();
      // Add created Policy no to textbox 
      this.commercialForm.patchValue({
        policyNumber: res.caPolicyRequest.caPolicyNum
      });
      this.alertService.success("New Commercial Policy " + res.caPolicyRequest.caPolicyNum + " Inserted", false);
    });
    this.commonService.scrollUpPage();


  }

  prepareInquiryObj(formValue) {
    let commercialInquiryObj: any
    if ((formValue['customerNumber'] != null && formValue['customerNumber'] != "") && (formValue['policyNumber'] != null && formValue['policyNumber'] != "")) {
      commercialInquiryObj = {
        caRequestId: '01ICOM',
        caCustomerNum: formValue['customerNumber'],
        caPolicyRequest: {
          caPolicyNum: formValue['policyNumber'],
          caCommercial: { caBPostcode: '' }
        }
      }
    }
    else if (formValue['policyNumber'] != null && formValue['policyNumber'] != "") {
      commercialInquiryObj = {
        caRequestId: '02ICOM',
        caCustomerNum: 0,
        caPolicyRequest: {
          caPolicyNum: formValue['policyNumber'],
          caCommercial: { caBPostcode: '' }
        }
      }
    }
    else if (formValue['customerNumber'] != null && formValue['customerNumber'] != "") {
      commercialInquiryObj = {
        caRequestId: '03ICOM',
        caCustomerNum: formValue['customerNumber'],
        caPolicyRequest: {
          caPolicyNum: 0,
          caCommercial: { caBPostcode: '' }
        }
      }
    }
    else if (formValue['postalCode'] != null && formValue['postalCode'] != "") {
      commercialInquiryObj = {
        caRequestId: '05ICOM',
        caCustomerNum: 0,
        caPolicyRequest: {
          caPolicyNum: 0,
          caCommercial: { caBPostCode: formValue['postalCode'] }
        }
      }
    }
    else {
      // commercialInquiryObj = {
      //   caRequestId: 'DUMMY',
      //   caBPostCode: 0,
      //   caCustomerNum: formValue['customerNumber'],
      //   caPolicyNum: formValue['policyNumber']
      // }
    }


    return commercialInquiryObj;
  }


  // Validate the required feilds
  validationCustPolicy(formValue): boolean {
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
    }
    else {
      this.noCustomerNo = false;
    }
    if (formValue['policyNumber'] == null || formValue['policyNumber'] == "") {
      this.noPolicyNo = true;
    }
    else {
      this.noPolicyNo = false;
    }
    if (this.noCustomerNo != true && this.noPolicyNo != true) {
      return true;
    }
    return false;

  }


}
