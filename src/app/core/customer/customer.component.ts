import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IcustomerAddResponse, IcustomerInquiryResponse } from 'src/app/model/customer';
import { AlertService } from 'src/app/services/alert.service';
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
  constructor(private formBuilder: FormBuilder, private _claimService: ClaimService, private alertService: AlertService) { }

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
        '',
        Validators.pattern(
          /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
        ),
        ,
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

  onSubmit(): void {
    this.submitted = true;
    let formValue = this.customerForm.value;
    if (formValue['customerNumber'] == null) {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;

  }
  onReset(): void {
    this.submitted = false;
    this.customerForm.reset();
  }
  ngAfterViewInit() {
    //Copy in all the js code from the script.js. Typescript will complain but it works just fine
  }

  claimInquiry(inquiryType: string = '') {
    this.submitted = true;
    let formValue = this.customerForm.value;
    if (formValue['customerNumber'] == null) {
      this.noCustomerNo = true;
      return;
    }
    this.noCustomerNo = false;
    return this._claimService.claimInquiry(formValue['customerNumber']).subscribe((res: IcustomerInquiryResponse) => {
      this.customerForm.patchValue({
        customerFirstName: res.caFirstName,
        customerLasttName: res.caLastName,
        dob: res.caDob,
        houseName: res.caHouseName,
        houseNumber: res.caHouseNum,
        postCode: res.caPostcode,
        phoneHome: res.caPhoneHome,
        phoneMobile: res.caPhoneMobile,
        email: res.caEmailAddress,
      });

      if (inquiryType == "updateEnquiry") {
        this.isClaimUpdate = true;
      }
    })
  }

  claimAdd() {
    this.submitted = true;
    let formValue = this.customerForm.value;
    if (formValue['customerNumber'] == null) {
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
    this.alertService.success("New Customer Inserted", false);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return this._claimService.claimAdd(customerAddObj).subscribe((res: any) => {
      //Call alert to show notification
      console.log(res, 'Res for add claim')
      this.alertService.success("New Customer Inserted", false);
    });



  }

  claimUpdate() {
    this.submitted = true;
    let formValue = this.customerForm.value;
    if (formValue['customerNumber'] == null) {
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
      this.alertService.success("Customer details updated", false);
      return this._claimService.claimUpdate(customerUpdateObj).subscribe((res: any) => {
        //Call alert to show notification
        console.log(res, 'Res for add claim')
        this.isClaimUpdate = false;
      })
      //once the update sucess then made the isupdtae false 
    }

  }

  customerNoKeyUp() {
    //Disable Error
    this.submitted = false;
    this.noCustomerNo = false;
    this.isClaimUpdate = false;
  }
}
