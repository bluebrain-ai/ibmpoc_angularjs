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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.claimForm = this.formBuilder.group({
      policyNumber: [
        ''
      ],
      customerNumber: [
        ''
      ],
      claimDate: [
        ''
      ],

      paid: [
        ''
      ],
      value: [
        ''
      ],

      cause: [''],
      observation: [''],
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
