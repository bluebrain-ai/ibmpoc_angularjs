import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IMotorInquiryResponse, IMotorPolicy } from 'src/app/model/motorPolicy';
import { AlertService } from 'src/app/services/alert.service';
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
  constructor(private formBuilder: FormBuilder, private _motorService: MotorService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.motorForm = this.formBuilder.group({
      policyNumber: [
        '',
        Validators.pattern('^[0-9]*$'),
        ,
      ],
      customerNumber: [
        '',
        Validators.pattern('^[0-9]*$'),
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
        '',

        Validators.pattern('^[0-9]*$'),
        ,
      ],
      registration: [
        '',

        Validators.pattern('^[0-9]*$'),
        ,
      ],
      carColor: ['', Validators.maxLength(8)],
      cc: ['', Validators.maxLength(8)],
      manufactureDate: [
        '',

        Validators.pattern(
          /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
        ),
        ,
      ],
      noOfAccident: [
        '',

        Validators.pattern('^[0-9]*$'),
        ,
      ],
      policyPremium: [
        '',
        Validators.pattern('^[0-9]*$'),
        ,
      ],
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
      this._motorService.motorPolicyInquiry(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: IMotorInquiryResponse) => {
        this.motorForm.patchValue({
          issueDate: res.caIssueDate,
          expiryDate: res.caExpiryDate,
          carMake: res.caMMake,
          carModel: res.caMModel,
          carValue: res.caMValue,
          registration: res.caMRegnumber,
          carColor: res.caMColour,
          cc: res.caMCc,
          manufactureDate: res.caMManufactured,
          policyPremium: res.caMPremium,
          noOfAccident: res.caMAccidents
        });
        if (inquiryType == "updateEnquiry") {
          this.isPolicyUpdate = true;
        }
      })
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
        console.log(res, 'Res for delete Motor')
        this.onReset();
        this.alertService.success("Motor Policy Deleted", false);
      })
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
      caRequestId: '01AMOT',
      caCustomerNum: formValue['customerNumber'],
      caPayment: "0",
      caBrokerid: "0",
      caBrokersref: '        ',
      caIssueDate: formValue['issueDate'],
      caExpiryDate: formValue['expiryDate'],
      caMMake: formValue['carMake'],
      caMModel: formValue['carModel'],
      caMValue: formValue['carValue'],
      caMRegnumber: formValue['registration'],
      caMColour: formValue['carColor'],
      caMCc: formValue['cc'],
      caMManufacture: formValue['manufactureDate'],
      caMPremium: formValue['policyPremium'],
      caMAccidents: formValue['noOfAccident'],
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this._motorService.motorPolicyAdd(motorPolicyAddObj).subscribe((res: any) => {
      //Call alert to show notification
      console.log(res, 'Res for add claim')
      this.onReset();
      this.alertService.success("New Motor Policy Inserted", false);
    });

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
        let customerUpdateObj: IMotorPolicy = {
          caRequestId: '01UMOT',
          caCustomerNum: formValue['customerNumber'],
          caPayment: "0",
          caBrokerid: "0",
          caBrokersref: '        ',
          caIssueDate: formValue['issueDate'],
          caExpiryDate: formValue['expiryDate'],
          caMMake: formValue['carMake'],
          caMModel: formValue['carModel'],
          caMValue: formValue['carValue'],
          caMRegnumber: formValue['registration'],
          caMColour: formValue['carColor'],
          caMCc: formValue['cc'],
          caMManufacture: formValue['manufactureDate'],
          caMPremium: formValue['policyPremium'],
          caMAccidents: formValue['noOfAccident'],
        }
        this._motorService.motorPolicyUpdate(customerUpdateObj).subscribe((res: any) => {
          //Call alert to show notification
          console.log(res, 'Res for policy updated')
          this.isPolicyUpdate = false;
          this.onReset();
        })
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
