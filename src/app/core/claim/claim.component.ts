import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css'],
})
export class ClaimComponent implements OnInit {
  claimForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.claimForm = this.formBuilder.group({
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
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(10),
        ],
      ],
      claimDate: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],

      paid: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(10),
        ],
      ],
      value: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(10),
        ],
      ],

      cause: ['', [Validators.required, Validators.maxLength(25)]],
      observation: ['', [Validators.required, Validators.maxLength(25)]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.claimForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.claimForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.claimForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.claimForm.reset();
  }
}
