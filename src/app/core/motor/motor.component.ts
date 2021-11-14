import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.css'],
})
export class MotorComponent implements OnInit {
  motorForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.motorForm = this.formBuilder.group({
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
      issueDate: [
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
      carMake: ['', [Validators.required, Validators.maxLength(20)]],
      carModel: ['', [Validators.required, Validators.maxLength(20)]],

      carValue: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(6),
        ],
      ],
      registration: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(7),
        ],
      ],
      carColor: ['', [Validators.required, Validators.maxLength(8)]],
      cc: ['', [Validators.required, Validators.maxLength(8)]],
      manufactureDate: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      noOfAccident: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      policyPremium: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(6),
        ],
      ],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.motorForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.motorForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.motorForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.motorForm.reset();
  }
}
