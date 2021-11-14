import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css'],
})
export class CommercialComponent implements OnInit {
  commercialForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.commercialForm = this.formBuilder.group({
      policyNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(10),
        ],
      ],
      customerNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      startDate: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      address: ['', [Validators.required, Validators.maxLength(10)]],
      postalCode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(8),
        ],
      ],
      latitude: ['', [Validators.required, Validators.maxLength(11)]],

      longitude: ['', [Validators.required, Validators.maxLength(11)]],
      customerName: ['', [Validators.required, Validators.maxLength(25)]],

      firePeril: ['', [Validators.required, Validators.maxLength(4)]],
      firePrem: ['', [Validators.required, Validators.maxLength(8)]],

      crimePeril: ['', [Validators.required, Validators.maxLength(4)]],
      crimePrem: ['', [Validators.required, Validators.maxLength(8)]],
      floodPeril: ['', [Validators.required, Validators.maxLength(4)]],
      floodPrem: ['', [Validators.required, Validators.maxLength(8)]],

      weatherPeril: ['', [Validators.required, Validators.maxLength(4)]],
      weatherPrem: ['', [Validators.required, Validators.maxLength(8)]],

      status: ['', [Validators.required, Validators.maxLength(4)]],
      rejectReason: ['', [Validators.required, Validators.maxLength(25)]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.commercialForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.commercialForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.commercialForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.commercialForm.reset();
  }
}
