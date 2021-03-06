import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IEndowmentInquiryResponse, IEndowmentPolicy } from 'src/app/model/endowmentPolicy';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { EndowmentService } from 'src/app/services/policy/endowment.service';

@Component({
  selector: 'app-endowment',
  templateUrl: './endowment.component.html',
  styleUrls: ['./endowment.component.css'],
})
export class EndowmentComponent implements OnInit {
  endowmentForm: FormGroup;
  submitted = false;
  noCustomerNo = false;
  noPolicyNo = false;
  isPolicyUpdate = false;
  constructor(private formBuilder: FormBuilder, private _endowmentService: EndowmentService, private alertService: AlertService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.endowmentForm = this.formBuilder.group({
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
      fundName: [''],
      term: [''],

      sumAssured: [
        '',
      ],
      lifeAssured: [
        ''
      ],

      withProfits: [
        ''
      ],
      equities: [
        ''
      ],
      managedFunds: [
        ''
      ],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.endowmentForm.controls;
  }


  // entire screen reset
  onReset(): void {
    this.submitted = false;
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    this.isPolicyUpdate = false;
    this.endowmentForm.reset();
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
    let formValue = this.endowmentForm.value;
    if (this.validation(formValue)) {
      this.noCustomerNo = false;
      this.noPolicyNo = false;
      // Motor Policy Inquiry
      this._endowmentService.endowmentPolicyInquiry(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: any) => {
        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'Endowment', 'INQUIRY');
          return;
        }

        this.endowmentForm.patchValue({
          issueDate: this.commonService.convertDatetime(res.caPolicyRequest.caPolicyCommon.caIssueDate),
          expiryDate: this.commonService.convertDatetime(res.caPolicyRequest.caPolicyCommon.caExpiryDate),
          fundName: res.caPolicyRequest.caEndowment.caEFundName,
          term: res.caPolicyRequest.caEndowment.caETerm,
          sumAssured: res.caPolicyRequest.caEndowment.caESumAssured,
          lifeAssured: res.caPolicyRequest.caEndowment.caELifeAssured,
          withProfits: res.caPolicyRequest.caEndowment.caEWithProfits,
          equities: res.caPolicyRequest.caEndowment.caEEquities,
          managedFunds: res.caPolicyRequest.caEndowment.caEManagedFund
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
    let formValue = this.endowmentForm.value;
    if (this.validation(formValue)) {
      this._endowmentService.endowmentPolicyDelete(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: any) => {
        //Call alert to show notification
        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'Endowment', 'DELETE');
          return;
        }

        console.log(res, 'Res for delete Motor')
        this.onReset();
        this.alertService.success("Life Policy " + res.caPolicyRequest.caPolicyNum + " Deleted", false);
      })
      this.commonService.scrollUpPage();

    }
  }
  policyAdd() {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.endowmentForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    let endowmentPolicyAddObj: IEndowmentPolicy = {
      // caRequestId: '01AEND',
      caCustomerNum: formValue['customerNumber'],
      caPayment: "0",
      caBrokerid: "0",
      caBrokersref: '',
      caIssueDate: this.commonService.WithoutTime(formValue['issueDate']),
      caExpiryDate: this.commonService.WithoutTime(formValue['expiryDate']),
      caEFundName: formValue['fundName'],
      caETerm: formValue['term'],
      caESumAssured: formValue['sumAssured'],
      caELifeAssured: formValue['lifeAssured'],
      caEWithProfits: formValue['withProfits'],
      caEManagedFund: formValue['managedFunds'],
      caEEquities: formValue['equities']
    }
    this._endowmentService.endowmentPolicyAdd(endowmentPolicyAddObj).subscribe((res: any) => {
      //Call alert to show notification
      if (res.caReturnCode !== 0) {
        this.commonService.showRequestCode(res.caReturnCode, 'Endowment', 'ADD');
        return;
      }
      console.log(res, 'Res for add claim')
      this.onReset();

      // Add created Policy no to textbox 
      this.endowmentForm.patchValue({
        policyNumber: res.caPolicyRequest.caPolicyNum
      });
      this.alertService.success("New Life Policy " + res.caPolicyRequest.caPolicyNum + " Inserted", false);
    });
    this.commonService.scrollUpPage();


  }

  policyUpdate() {
    this.resetValidation();
    this.submitted = true;
    let formValue = this.endowmentForm.value;
    if (this.validation(formValue)) {
      // for update first Call Enquiry and populate the form and once the data changes then recall the Update 
      if (this.isPolicyUpdate == false) {
        this.policyInquiry('updateEnquiry');
        this.isPolicyUpdate = true;
      }
      else {
        //Update functionality
        let endowmentPolicyAddObj: IEndowmentPolicy = {
          // caRequestId: '01UEND',
          caCustomerNum: formValue['customerNumber'],
          caPayment: "0",
          caBrokerid: "0",
          caBrokersref: '',
          caIssueDate: this.commonService.WithoutTime(formValue['issueDate']),
          caExpiryDate: this.commonService.WithoutTime(formValue['expiryDate']),
          caEFundName: formValue['fundName'],
          caETerm: formValue['term'],
          caESumAssured: formValue['sumAssured'],
          caELifeAssured: formValue['lifeAssured'],
          caEWithProfits: formValue['withProfits'],
          caEManagedFund: formValue['managedFunds'],
          caEEquities: formValue['equities']
        }
        this._endowmentService.endowmentPolicyUpdate(endowmentPolicyAddObj, formValue['policyNumber']).subscribe((res: any) => {
          //Call alert to show notification
          if (res.caReturnCode !== 0) {
            this.commonService.showRequestCode(res.caReturnCode, 'Endowment', 'UPDATE');
            return;
          }
          console.log(res, 'Res for policy updated')
          this.isPolicyUpdate = false;
          this.onReset();
          this.alertService.success("Life Policy " + res.caPolicyRequest.caPolicyNum + " Updated", false);

        })
        this.commonService.scrollUpPage();

      }

    }

  }
}
