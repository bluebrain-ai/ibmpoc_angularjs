import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IMotorInquiryResponse, IMotorPolicy } from 'src/app/model/motorPolicy';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { MotorService } from 'src/app/services/policy/motor.service';

@Component({
  selector: 'app-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.css'],
})
export class MotorComponent implements OnInit {
  motorForm: FormGroup;
  submitted = false;
  noCustomerNo = false;
  noPolicyNo = false;
  isPolicyUpdate = false;
  constructor(private formBuilder: FormBuilder, private _motorService: MotorService, private alertService: AlertService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.motorForm = this.formBuilder.group({
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
      carMake: ['', Validators.maxLength(20)],
      carModel: ['', Validators.maxLength(20)],

      carValue: [
        ''
      ],
      registration: [
        ''
      ],
      carColor: ['', Validators.maxLength(8)],
      cc: ['', Validators.maxLength(8)],
      manufactureDate: [
        ''
      ],
      noOfAccident: [
        ''
      ],
      policyPremium: [
        ''
      ]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.motorForm.controls;
  }

  policyInquiry(inquiryType: string = ''): void {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.motorForm.value;
    if (this.validation(formValue)) {
      this.noCustomerNo = false;
      this.noPolicyNo = false;
      // Motor Policy Inquiry
      this._motorService.motorPolicyInquiry(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: any) => {
        //Call alert to show notification
        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'Motor', 'INQUIRY');
          return;
        }
        this.motorForm.patchValue({
          issueDate: this.commonService.convertDatetime(res.caPolicyRequest.caPolicyCommon.caIssueDate),
          expiryDate: this.commonService.convertDatetime(res.caPolicyRequest.caPolicyCommon.caExpiryDate),
          carMake: res.caPolicyRequest.caMotor.caMMake,
          carModel: res.caPolicyRequest.caMotor.caMModel,
          carValue: res.caPolicyRequest.caMotor.caMValue,
          registration: res.caPolicyRequest.caMotor.caMRegnumber,
          carColor: res.caPolicyRequest.caMotor.caMColour,
          cc: res.caPolicyRequest.caMotor.caMCc,
          manufactureDate: this.commonService.convertDatetime(res.caPolicyRequest.caMotor.caMManufactured),
          policyPremium: res.caPolicyRequest.caMotor.caMPremium,
          noOfAccident: res.caPolicyRequest.caMotor.caMAccidents
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
    let formValue = this.motorForm.value;
    if (this.validation(formValue)) {
      this._motorService.motorPolicyDelete(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: any) => {
        //Call alert to show notification
        //Call alert to show notification
        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'Motor', 'DELETE');
          return;
        }
        this.onReset();
        this.alertService.success("Motor Policy " + res.caPolicyRequest.caPolicyNum + " Deleted", false);
      })
      this.commonService.scrollUpPage();

    }
  }
  policyAdd() {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.motorForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    let motorPolicyAddObj: IMotorPolicy = {
      // caRequestId: '01AMOT',
      caCustomerNum: formValue['customerNumber'],
      caPayment: "0",
      caBrokerid: "0",
      caBrokersref: '',
      caIssueDate: this.commonService.WithoutTime(formValue['issueDate']),
      caExpiryDate: this.commonService.WithoutTime(formValue['expiryDate']),
      caMMake: formValue['carMake'],
      caMModel: formValue['carModel'],
      caMValue: formValue['carValue'],
      caMRegnumber: formValue['registration'],
      caMColour: formValue['carColor'],
      caMCc: formValue['cc'],
      caMManufacture: this.commonService.WithoutTime(formValue['manufactureDate']),
      caMPremium: formValue['policyPremium'],
      caMAccidents: formValue['noOfAccident'],
    }
    this._motorService.motorPolicyAdd(motorPolicyAddObj).subscribe((res: any) => {
      //Call alert to show notification
      if (res.caReturnCode !== 0) {
        this.commonService.showRequestCode(res.caReturnCode, 'Motor', 'ADD');
        return;
      }
      this.onReset();

      // Add created Policy no to textbox 
      this.motorForm.patchValue({
        policyNumber: res.caPolicyRequest.caPolicyNum
      });
      this.alertService.success("New Motor " + res.caPolicyRequest.caPolicyNum + " Policy Inserted", false);
    });
    this.commonService.scrollUpPage();
  }

  policyUpdate() {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.motorForm.value;
    if (this.validation(formValue)) {
      // for update first Call Enquiry and populate the form and once the data changes then recall the Update 
      if (this.isPolicyUpdate == false) {
        this.policyInquiry('updateEnquiry');
        this.isPolicyUpdate = true;
      }
      else {
        //Update functionality
        let motorPolicyAddObj: IMotorPolicy = {
          // caRequestId: '01UMOT',
          caCustomerNum: formValue['customerNumber'],
          caPayment: "0",
          caBrokerid: "0",
          caBrokersref: '',
          caIssueDate: this.commonService.WithoutTime(formValue['issueDate']),
          caExpiryDate: this.commonService.WithoutTime(formValue['expiryDate']),
          caMMake: formValue['carMake'],
          caMModel: formValue['carModel'],
          caMValue: formValue['carValue'],
          caMRegnumber: formValue['registration'],
          caMColour: formValue['carColor'],
          caMCc: formValue['cc'],
          caMManufacture: this.commonService.WithoutTime(formValue['manufactureDate']),
          caMPremium: formValue['policyPremium'],
          caMAccidents: formValue['noOfAccident'],
        }
        this._motorService.motorPolicyUpdate(motorPolicyAddObj, formValue['policyNumber']).subscribe((res: any) => {
          //Call alert to show notification
          if (res.caReturnCode !== 0) {
            this.commonService.showRequestCode(res.caReturnCode, 'Motor', 'UPDATE');
            return;
          }
          this.isPolicyUpdate = false;
          this.onReset();
          this.alertService.success("Motor Policy " + res.caPolicyRequest.caPolicyNum + " Updated", false);
        })
        this.commonService.scrollUpPage();

      }

    }

  }
  // entire screen reset
  onReset(): void {
    this.submitted = false;
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    this.isPolicyUpdate = false;
    this.motorForm.reset();
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
}
