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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commercialForm = this.formBuilder.group({
      policyNumber: [
        ''
      ],
      customerNumber: [
        ''
      ],
      startDate: [
        ''
      ],
      expiryDate: [
        ''
      ],
      address: [''],
      postalCode: [
        ''
      ],
      latitude: [''],

      longitude: [''],
      customerName: [''],

      firePeril: [''],
      firePrem: [''],

      crimePeril: [''],
      crimePrem: [''],
      floodPeril: [''],
      floodPrem: [''],

      weatherPeril: [''],
      weatherPrem: [''],

      status: [''],
      rejectReason: [''],
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
