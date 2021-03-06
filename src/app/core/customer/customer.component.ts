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
import { CustomerService } from 'src/app/services/policy/customer.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit, AfterViewInit {
  customerForm: FormGroup;
  submitted = false;
  noCustomerNo = false;
  isCustomerUpdate = false;

  constructor(private formBuilder: FormBuilder, private _customerervice: CustomerService, private alertService: AlertService, private commonService: CommonService) { }
  ngOnInit(): void {
    this.submitted = false;
    this.noCustomerNo = false;
    this.isCustomerUpdate = false;
    this.customerForm = this.formBuilder.group({
      customerNumber: [
        ''
      ],
      customerFirstName: ['', Validators.maxLength(10)],
      customerLastName: ['', Validators.maxLength(20)],
      dob: [
        ''
      ],
      houseName: ['', Validators.maxLength(20)],
      houseNumber: ['', Validators.maxLength(20)],
      postCode: [''],
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

  setValidator() {
    this.submitted = true;
    this.customerForm.get('customerFirstName').setValidators([
      Validators.required,
    ]);
    this.customerForm.get('customerLastName').setValidators([
      Validators.required,
    ]);
    this.customerForm.get('dob').setValidators([
      Validators.required,
    ]);
    this.customerForm.get('houseName').setValidators([
      Validators.required,
    ]);
    this.customerForm.get('houseNumber').setValidators([
      Validators.required,
    ]);
    this.customerForm.get('postCode').setValidators([
      Validators.required,
    ]);
    this.updateValidity();

  }
  removeValidator() {
    this.submitted = true;
    this.customerForm.get('customerFirstName').setValidators([]);
    this.customerForm.get('customerLastName').setValidators([]);
    this.customerForm.get('dob').setValidators([]);
    this.customerForm.get('houseName').setValidators([]);
    this.customerForm.get('houseNumber').setValidators([]);
    this.customerForm.get('postCode').setValidators([]);
    this.updateValidity();


  }

  updateValidity() {
    this.customerForm.controls['customerFirstName'].updateValueAndValidity();
    this.customerForm.controls['customerLastName'].updateValueAndValidity();
    this.customerForm.controls['dob'].updateValueAndValidity();
    this.customerForm.controls['houseName'].updateValueAndValidity();
    this.customerForm.controls['houseNumber'].updateValueAndValidity();
    this.customerForm.controls['postCode'].updateValueAndValidity();
  }
  onReset(): void {
    this.submitted = false;
    this.noCustomerNo = false;
    this.isCustomerUpdate = false;
    this.customerForm.reset();
    this.commonService.scrollUpPage();
    this.removeValidator();
  }
  ngAfterViewInit() {
    //Copy in all the js code from the script.js. Typescript will complain but it works just fine
  }

  claimInquiry(inquiryType: string = '') {
    this.submitted = true;
    this.removeValidator();

    let formValue = this.customerForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    this._customerervice.customerInquiry(formValue['customerNumber']).subscribe((res: any) => {

      if (res.caCustomerRequest !== null) {

        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'Customer', 'INQUIRY');
          return;
        }
        this.customerForm.patchValue({
          customerFirstName: res.caCustomerRequest.caFirstName,
          customerLastName: res.caCustomerRequest.caLastName,
          dob: this.commonService.convertDatetime(res.caCustomerRequest.caDob),
          houseName: res.caCustomerRequest.caHouseName,
          houseNumber: res.caCustomerRequest.caHouseNum,
          postCode: res.caCustomerRequest.caPostcode,
          phoneHome: res.caCustomerRequest.caPhoneHome,
          phoneMobile: res.caCustomerRequest.caPhoneMobile,
          email: res.caCustomerRequest.caEmailAddress,
        });

        if (inquiryType == "updateEnquiry") {
          this.isCustomerUpdate = true;
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
    this.setValidator();
    if (this.customerForm.invalid) {
      return;
    }
    this.removeValidator();
    // if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
    //   this.noCustomerNo = true;
    //   return;
    // }
    this.noCustomerNo = false;
    let customerAddObj: IcustomerAddResponse = {
      caCustomerNum: '0',
      caFirstName: formValue['customerFirstName'],
      caLastName: formValue['customerLastName'],
      caDob: this.commonService.WithoutTime(formValue['dob']),
      caHouseName: formValue['houseName'],
      caHouseNum: formValue['houseNumber'],
      caPostcode: formValue['postCode'],
      caPhoneHome: formValue['phoneHome'],
      caPhoneMobile: formValue['phoneMobile'],
      caEmailAddress: formValue['email']
    }
    this._customerervice.customerAdd(customerAddObj).subscribe((res: any) => {
      //Call alert to show notification
      if (res.caReturnCode !== 0) {
        this.commonService.showRequestCode(res.caReturnCode, 'Customer', 'ADD');
        return;
      }
      console.log(res, 'Res for add claim')
      this.onReset();
      // Add created customer no to textbox 
      this.customerForm.patchValue({
        customerNumber: res.caCustomerNum
      });
      this.alertService.success("New Customer " + res.caCustomerNum + " Inserted", false);
    });
    this.commonService.scrollUpPage();
  }

  claimUpdate() {
    this.submitted = true;
    this.removeValidator();
    let formValue = this.customerForm.value;
    if (formValue['customerNumber'] == null || formValue['customerNumber'] == "") {
      this.noCustomerNo = true;
      return;
    }

    this.noCustomerNo = false;
    // for update first Call Enquiry and populate the form and once the data changes then recall the Update 
    if (this.isCustomerUpdate == false) {
      this.claimInquiry('updateEnquiry');
      this.isCustomerUpdate = true;
    }
    else {
      //Update functionality
      let customerUpdateObj: IcustomerAddResponse = {
        caCustomerNum: formValue['customerNumber'],
        caFirstName: formValue['customerFirstName'],
        caLastName: formValue['customerLastName'],
        caDob: this.commonService.WithoutTime(formValue['dob']),
        caHouseName: formValue['houseName'],
        caHouseNum: formValue['houseNumber'],
        caPostcode: formValue['postCode'],
        caPhoneHome: formValue['phoneHome'],
        caPhoneMobile: formValue['phoneMobile'],
        caEmailAddress: formValue['email']
      }
      this._customerervice.customerUpdate(customerUpdateObj).subscribe((res: any) => {
        //Call alert to show notification
        if (res.caReturnCode !== 0) {
          this.commonService.showRequestCode(res.caReturnCode, 'Customer', 'UPDATE');
          return;
        }
        console.log(res, 'Res for add claim')
        this.isCustomerUpdate = false;
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
