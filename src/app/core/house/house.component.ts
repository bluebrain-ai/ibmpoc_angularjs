import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IHousePolicy } from 'src/app/model/house';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { HouseService } from 'src/app/services/policy/house.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
})
export class HouseComponent implements OnInit {
  houseForm: FormGroup;
  submitted = false;
  noCustomerNo = false;
  noPolicyNo = false;
  isPolicyUpdate = false;
  constructor(private formBuilder: FormBuilder, private _houseService: HouseService, private alertService: AlertService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.houseForm = this.formBuilder.group({
      policyNumber: [
        ''
      ],
      customerNumber: [
        ''
      ],
      issueDate: [
        ''
      ],
      expiryDate: [
        ''
      ],
      propertyType: [''],

      bedRooms: [
        ''
      ],

      HouseValue: [
        ''
      ],
      houseName: [''],
      houseNumber: [''],
      postCode: [''],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.houseForm.controls;
  }

  // entire screen reset
  onReset(): void {
    this.submitted = false;
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    this.isPolicyUpdate = false;
    this.houseForm.reset();
    this.commonService.scrollUpPage();

  }
  // Reset validation before on any button click
  resetValidation() {
    this.submitted = false;
    this.noCustomerNo = false;
    this.noPolicyNo = false;
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

    if (this.noCustomerNo != true && this.noPolicyNo != true) {
      this.submitted = false
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
    if (this.noCustomerNo != true && this.noPolicyNo != true) {
      return true;
    }
    return false;

  }
  policyInquiry(inquiryType: string = ''): void {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.houseForm.value;
    if (this.validation(formValue)) {
      this.noCustomerNo = false;
      this.noPolicyNo = false;
      // Motor Policy Inquiry
      this._houseService.housePolicyInquiry(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: any) => {

        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'House', 'INQUIRY');
          return;
        }
        this.houseForm.patchValue({
          issueDate: this.commonService.convertDatetime(res.caPolicyRequest.caPolicyCommon.caIssueDate),
          expiryDate: this.commonService.convertDatetime(res.caPolicyRequest.caPolicyCommon.caExpiryDate),
          propertyType: res.caPolicyRequest.caHouse.caHPropertyType,
          bedRooms: res.caPolicyRequest.caHouse.caHBedrooms,
          HouseValue: res.caPolicyRequest.caHouse.caHValue,
          houseName: res.caPolicyRequest.caHouse.caHHouseName,
          houseNumber: res.caPolicyRequest.caHouse.caHHouseNumber,
          postCode: res.caPolicyRequest.caHouse.caHPostcode
        });
        if (inquiryType == "updateEnquiry") {
          this.isPolicyUpdate = true;
        }
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
    let formValue = this.houseForm.value;
    if (this.validation(formValue)) {
      this._houseService.housePolicyDelete(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: any) => {
        //Call alert to show notification
        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'House', 'DELETE');
          return;
        }
        this.onReset();
        this.alertService.success("House Policy " + res.caPolicyRequest.caPolicyNum + " Deleted", false);
      })
      this.commonService.scrollUpPage();

    }
  }
  policyAdd() {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.houseForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    let housePolicyAddObj: IHousePolicy = {
      // caRequestId: '01AHOU',
      caCustomerNum: formValue['customerNumber'],
      caPayment: "0",
      caBrokerid: "0",
      caBrokersref: '        ',
      caIssueDate: this.commonService.WithoutTime(formValue['issueDate']),
      caExpiryDate: this.commonService.WithoutTime(formValue['expiryDate']),
      caHPropertyType: formValue['propertyType'],
      caHBedrooms: formValue['bedRooms'],
      caHValue: formValue['HouseValue'],
      caHHouseName: formValue['houseName'],
      caHHouseNumber: formValue['houseNumber'],
      caHPostcode: formValue['postCode']
    }
    this._houseService.housePolicyAdd(housePolicyAddObj).subscribe((res: any) => {
      //Call alert to show notification
      if (res.caReturnCode !== 0) {
        this.commonService.showRequestCode(res.caReturnCode, 'House', 'ADD');
        return;
      }
      this.onReset();
      // Add created Policy no to textbox 
      this.houseForm.patchValue({
        policyNumber: res.caPolicyRequest.caPolicyNum
      });
      this.alertService.success("New House Policy " + res.caPolicyRequest.caPolicyNum + " Inserted", false);
    });
    this.commonService.scrollUpPage();


  }

  policyUpdate() {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.houseForm.value;
    if (this.validation(formValue)) {
      // for update first Call Enquiry and populate the form and once the data changes then recall the Update 
      if (this.isPolicyUpdate == false) {
        this.policyInquiry('updateEnquiry');
        this.isPolicyUpdate = true;
      }
      else {
        //Update functionality
        let housePolicyAddObj: IHousePolicy = {
          // caRequestId: '01UHOU',
          caCustomerNum: formValue['customerNumber'],
          caPayment: "0",
          caBrokerid: "0",
          caBrokersref: '        ',
          caIssueDate: this.commonService.WithoutTime(formValue['issueDate']),
          caExpiryDate: this.commonService.WithoutTime(formValue['expiryDate']),
          caHPropertyType: formValue['propertyType'],
          caHBedrooms: formValue['bedRooms'],
          caHValue: formValue['HouseValue'],
          caHHouseName: formValue['houseName'],
          caHHouseNumber: formValue['houseNumber'],
          caHPostcode: formValue['postCode']
        }
        this._houseService.housePolicyUpdate(housePolicyAddObj, formValue['policyNumber']).subscribe((res: any) => {
          //Call alert to show notification
          if (res.caReturnCode !== 0) {
            this.commonService.showRequestCode(res.caReturnCode, 'House', 'UPDATE');
            return;
          }
          this.isPolicyUpdate = false;
          this.onReset();
          this.alertService.success("House Policy " + res.caPolicyRequest.caPolicyNum + " Updated", false);

        })
        this.commonService.scrollUpPage();
      }

    }

  }
}
