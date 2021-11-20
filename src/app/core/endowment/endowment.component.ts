import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IEndowmentInquiryResponse, IEndowmentPolicy } from 'src/app/model/endowmentPolicy';
import { AlertService } from 'src/app/services/alert.service';
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
  constructor(private formBuilder: FormBuilder, private _endowmentService: EndowmentService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.endowmentForm = this.formBuilder.group({
      policyNumber: [
        '',
        Validators.pattern('^[0-9]*$'),
      ],
      customerNumber: [
        '',
        Validators.pattern('^[0-9]*$'),
      ],
      issueDate: [
        '',

        Validators.pattern(
          /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
        ),
        ,
      ],
      expiryDate: [
        '',

        Validators.pattern(
          /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
        ),
        ,
      ],
      fundName: ['', Validators.maxLength(10)],
      term: ['', Validators.maxLength(2)],

      sumAssured: [
        '',

        Validators.pattern('^[0-9]*$'),
      ],
      lifeAssured: [
        '',

        Validators.pattern('^[0-9]*$'),
      ],

      withProfits: [
        '',

        Validators.pattern('^[0-9]*$'),
        ,
      ],
      equities: [
        '',

        Validators.pattern('^[0-9]*$'),
      ],
      managedFunds: [
        '',
        Validators.pattern('^[0-9]*$'),
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
      this._endowmentService.motorPolicyInquiry(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: IEndowmentInquiryResponse) => {
        this.endowmentForm.patchValue({
          issueDate: res.caIssueDate,
          expiryDate: res.caExpiryDate,
          fundName: res.caEFundName,
          term: res.caETerm,
          sumAssured: res.caESumAssured,
          lifeAssured: res.caELifeAssured,
          withProfits: res.caEWithProfits,
          equities: res.caEEquities,
          managedFunds: res.caEManagedFund
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
    let formValue = this.endowmentForm.value;
    if (this.validation(formValue)) {
      this._endowmentService.motorPolicyDelete(formValue['policyNumber'], formValue['customerNumber']).subscribe((res: any) => {
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
    let formValue = this.endowmentForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    this.noPolicyNo = false;
    let endowmentPolicyAddObj: IEndowmentPolicy = {
      caRequestId: '01AEND',
      caCustomerNum: formValue['customerNumber'],
      caPayment: "0",
      caBrokerid: "0",
      caBrokersref: '        ',
      caIssueDate: formValue['issueDate'],
      caExpiryDate: formValue['expiryDate'],
      caEFundName: formValue['fundName'],
      caETerm: formValue['term'],
      caESumAssured: formValue['sumAssured'],
      caELifeAssured: formValue['lifeAssured'],
      caEWithProfits: formValue['withProfits'],
      caEManagedFund: formValue['managedFunds'],
      caEEquities: formValue['equities']
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this._endowmentService.motorPolicyAdd(endowmentPolicyAddObj).subscribe((res: any) => {
      //Call alert to show notification
      console.log(res, 'Res for add claim')
      this.onReset();
      this.alertService.success("New Life Policy Inserted", false);
    });

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
          caRequestId: '01AEND',
          caCustomerNum: formValue['customerNumber'],
          caPayment: "0",
          caBrokerid: "0",
          caBrokersref: '        ',
          caIssueDate: formValue['issueDate'],
          caExpiryDate: formValue['expiryDate'],
          caEFundName: formValue['fundName'],
          caETerm: formValue['term'],
          caESumAssured: formValue['sumAssured'],
          caELifeAssured: formValue['lifeAssured'],
          caEWithProfits: formValue['withProfits'],
          caEManagedFund: formValue['managedFunds'],
          caEEquities: formValue['equities']
        }
        this._endowmentService.motorPolicyUpdate(endowmentPolicyAddObj).subscribe((res: any) => {
          //Call alert to show notification
          console.log(res, 'Res for policy updated')
          this.isPolicyUpdate = false;
          this.onReset();
          this.alertService.success("Life Policy Updated", false);

        })
      }

    }

  }
}
