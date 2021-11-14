import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-endowment',
  templateUrl: './endowment.component.html',
  styleUrls: ['./endowment.component.css'],
})
export class EndowmentComponent implements OnInit {
  endowmentForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.endowmentForm = this.formBuilder.group({
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
      fundName: ['', [Validators.required, Validators.maxLength(10)]],
      term: ['', [Validators.required, Validators.maxLength(2)]],

      sumAssured: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(6),
        ],
      ],
      lifeAssured: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(25),
        ],
      ],

      withProfits: [
        '',
        [
          Validators.required,
          Validators.maxLength(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      equities: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(1),
        ],
      ],
      managedFunds: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(1),
        ],
      ],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.endowmentForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.endowmentForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.endowmentForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.endowmentForm.reset();
  }
}
