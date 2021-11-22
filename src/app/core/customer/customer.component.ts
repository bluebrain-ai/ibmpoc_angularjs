import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IcustomerAddResponse, IcustomerInquiryResponse } from 'src/app/model/customer';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { ClaimService } from 'src/app/services/policy/claim.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit, AfterViewInit {
  customerForm: FormGroup;
  submitted = false;
  noCustomerNo = false;
  isClaimUpdate = false;

  constructor(private formBuilder: FormBuilder, private _claimService: ClaimService, private alertService: AlertService, private commonService: CommonService) { }
  ngOnInit(): void {
    this.submitted = false;
    this.noCustomerNo = false;
    this.isClaimUpdate = false;
    this.customerForm = this.formBuilder.group({
      customerNumber: [
        '', Validators.pattern('^[0-9]*$'),
      ],
      customerFirstName: ['', Validators.maxLength(10)],
      customerLastName: ['', Validators.maxLength(20)],
      dob: [
        ''
      ],
      houseName: ['', Validators.maxLength(20)],
      houseNumber: ['', Validators.maxLength(20)],
      postCode: ['', Validators.pattern('^[0-9]*$')],
      phoneHome: [
        '',

        Validators.maxLength(20),
        ,
      ],

      phoneMobile: [
        '',

        Validators.maxLength(20),
        ,
      ],
      email: ['', Validators.email],
    });

    this.onReset();

  }
  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.noCustomerNo = false;
    this.isClaimUpdate = false;
    this.customerForm.reset();
    this.commonService.scrollUpPage();
  }
  ngAfterViewInit() {
    //Copy in all the js code from the script.js. Typescript will complain but it works just fine
  }

  claimInquiry(inquiryType: string = '') {
    this.submitted = true;
    let formValue = this.customerForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    this._claimService.claimInquiry(formValue['customerNumber']).subscribe((res: any) => {

      if (res.caCustomerRequest !== null) {
        this.customerForm.patchValue({
          customerFirstName: res.caCustomerRequest.caFirstName,
          customerLastName: res.caCustomerRequest.caLastName,
          dob: res.caCustomerRequest.caDob,
          houseName: res.caCustomerRequest.caHouseName,
          houseNumber: res.caCustomerRequest.caHouseNum,
          postCode: res.caCustomerRequest.caPostcode,
          phoneHome: res.caCustomerRequest.caPhoneHome,
          phoneMobile: res.caCustomerRequest.caPhoneMobile,
          email: res.caCustomerRequest.caEmailAddress,
        });

        if (inquiryType == "updateEnquiry") {
          this.isClaimUpdate = true;
        }
      }
      else {
        this.alertService.success("Customer Number Unavailable..", false);

      }
      this.commonService.scrollUpPage();

    })
  }

  claimAdd() {
    this.submitted = true;
    let formValue = this.customerForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    let customerAddObj: IcustomerAddResponse = {
      caRequestId: '01ACUS',
      caCustomerNum: '0',
      caFirstName: formValue['customerFirstName'],
      caLastName: formValue['customerLasttName'],
      caDob: formValue['dob'],
      caHouseName: formValue['houseName'],
      caHouseNum: formValue['houseNumber'],
      caPostcode: formValue['postCode'],
      caPhoneHome: formValue['phoneHome'],
      caPhoneMobile: formValue['phoneMobile'],
      caEmailAddress: formValue['email']
    }
    this._claimService.claimAdd(customerAddObj).subscribe((res: any) => {
      //Call alert to show notification
      console.log(res, 'Res for add claim')
      this.onReset();
      this.alertService.success("New Customer Inserted", false);
    });
    this.commonService.scrollUpPage();
  }

  claimUpdate() {
    this.submitted = true;
    let formValue = this.customerForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    // for update first Call Enquiry and populate the form and once the data changes then recall the Update 
    if (this.isClaimUpdate == false) {
      this.claimInquiry('updateEnquiry');
      this.isClaimUpdate = true;
    }
    else {
      //Update functionality
      let customerUpdateObj: IcustomerAddResponse = {
        caRequestId: '01UCUS',
        caCustomerNum: formValue['customerNumber'],
        caFirstName: formValue['customerFirstName'],
        caLastName: formValue['customerLasttName'],
        caDob: formValue['dob'],
        caHouseName: formValue['houseName'],
        caHouseNum: formValue['houseNumber'],
        caPostcode: formValue['postCode'],
        caPhoneHome: formValue['phoneHome'],
        caPhoneMobile: formValue['phoneMobile'],
        caEmailAddress: formValue['email']
      }
      this._claimService.claimUpdate(customerUpdateObj).subscribe((res: any) => {
        //Call alert to show notification
        console.log(res, 'Res for add claim')
        this.isClaimUpdate = false;
        this.onReset();
      })
      this.commonService.scrollUpPage();
      this.alertService.success("Customer details updated", false);

      //once the update sucess then made the isupdtae false 
    }

  }

  customerNoKeyUp() {
    //Disable Error
    this.submitted = false;
    this.noCustomerNo = false;
  }
}
