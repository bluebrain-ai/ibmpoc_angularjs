import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
})
export class HouseComponent implements OnInit {
  houseForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.houseForm = this.formBuilder.group({
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
      propertyType: ['', [Validators.required, Validators.maxLength(15)]],

      bedRooms: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(3),
        ],
      ],

      HouseValue: [
        '',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      houseName: ['', [Validators.required, Validators.maxLength(20)]],
      houseNumber: ['', [Validators.required, Validators.maxLength(4)]],
      postCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.houseForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.houseForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.houseForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.houseForm.reset();
  }
}
