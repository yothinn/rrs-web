import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-restuarant-info',
  templateUrl: './restuarant-info.component.html',
  styleUrls: ['./restuarant-info.component.scss']
})
export class RestuarantInfoComponent implements OnInit {

  restInfoForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.restInfoForm = this._fb.group ({
      name: [''],
      displayName: [''],
      description: [''],
      location: this._fb.group ({
        addressLine: [''],
        addressStreet: [''],
        addressSubDistrict: [''],
        addressDistrict: [''],
        addressProvince: [''],
        addressPostalCode: [''],
        latitude: [''],
        logitude: ['']
      }),
      maxGuestCapacity: [''],
      mobileNo: [''],
      otherNo: [''],

    });
  }

}
