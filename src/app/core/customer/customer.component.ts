import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      customerFirstName: ['', [Validators.required, Validators.maxLength(10)]],
      customerLastName: ['', [Validators.required, Validators.maxLength(20)]],
      dob: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      houseName: ['', [Validators.required, Validators.maxLength(20)]],
      houseNumber: ['', [Validators.required, Validators.maxLength(20)]],
      postCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      phoneHome: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(20),
        ],
      ],

      phoneMobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });

    this.onReset();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.customerForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.customerForm.reset();
  }
}
