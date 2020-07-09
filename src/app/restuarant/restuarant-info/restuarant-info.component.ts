import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


import { RestuarantService } from '../restuarant.service';


@Component({
  selector: 'app-restuarant-info',
  templateUrl: './restuarant-info.component.html',
  styleUrls: ['./restuarant-info.component.scss']
})
export class RestuarantInfoComponent implements OnInit {

  restInfoForm: FormGroup;
  imgLogo: string;

  constructor(
    private fb: FormBuilder,
    private restService: RestuarantService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.restInfoForm = this.fb.group ({
      name: [''],
      displayName: [''],
      description: [''],
      location: this.fb.group ({
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
      activate: [true],
    });

    // TODO : change up mockup logo
    this.imgLogo = '/assets/images/backgrounds/restLogo.jpg';
  }

  /*
   * cancel when create restuarant
   */
  onCancel() {

  }  

  /*
   * create restuarant
   */
  onCreate() {
    // console.log(this.restInfoForm.getRawValue());
    this.restService.createRestuarant(this.restInfoForm.getRawValue())
        .subscribe(
          result => {
            // TODO: alert when create success
            console.log(result);
            this.router.navigate(['restuarant/dashboard', result.data._id]);
          },
          err => {
            // TODO : Alert error
            console.log(err);
          }
        )
  }

}
