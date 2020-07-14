import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


import { RestuarantService } from '../restuarant.service';


@Component({
  selector: 'app-restuarant-info',
  templateUrl: './restuarant-info.component.html',
  styleUrls: ['./restuarant-info.component.scss']
})
export class RestuarantInfoComponent implements OnInit {

  POSTCODE_PATTERN = /^[0-9]{5,5}$/;
  MOBILE_PATTERN = /^[0-9]{10,10}$/;

  isCreate: boolean;
  isReadOnly:boolean;
  restData: any;
  restInfoForm: FormGroup;
  imgLogo: string;

  constructor(
    private fb: FormBuilder,
    private restService: RestuarantService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // when new isCreate is true
    this.isCreate = this.route.snapshot.data.isCreate;
    this.isReadOnly = !this.isCreate;

    if (!this.isCreate) {
      this.restData = this.route.snapshot.data.items.data;
      console.log(this.restData);
      // TODO : กรณี restData ไม่สามารถุโหลดข้อมูลได้ จะทำยังไง
    }
       
    // Initial form data except logo
    this.initForm();
    
    // TODO : change up mockup logo
    this.imgLogo = '/assets/images/backgrounds/restLogo.jpg';
  
  }

  private initForm() {
    if (this.isCreate) {
      // Init empty data when create 
      this.restData = {
        name: '',
        displayName: '',
        description: '',
        location: {
          addressLine1: '',
          addressStreet: '',
          addressSubDistrict: '',
          addressDistrict: '',
          addressProvince: '',
          addressPostalCode: '',
          latitude: '',
          logitude: '',
        },
        maxGuestCapacity: '',
        mobileNo: '',
        otherNo: '',
        activate: true,
      }
    }
    // assign value to form
    this.restInfoForm = this.fb.group ({
      // TODO: check validate
      name: [this.restData.name, Validators.required],
      displayName: [this.restData.displayName, Validators.required],
      description: [this.restData.description, Validators.required],
      location: this.fb.group ({
        addressLine1: [this.restData.location.addressLine1],
        addressStreet: [this.restData.location.addressStreet],
        addressSubDistrict: [this.restData.location.addressSubDistrict],
        addressDistrict: [this.restData.location.addressDistrict],
        addressProvince: [this.restData.location.addressProvince],
        addressPostalCode: [this.restData.location.addressPostalCode],
        latitude: [''],
        logitude: ['']
      }),
      maxGuestCapacity: [this.restData.maxGuestCapacity],
      mobileNo: [this.restData.mobileNo, [Validators.required, Validators.pattern(this.MOBILE_PATTERN)] ],
      otherNo: [this.restData.otherNo],
      activate: [this.restData.activate],
    });

    if (this.isReadOnly) {
      this.restInfoForm.controls['activate'].disable();
    }
  }

  /*
   * cancel when create restuarant
   */
  onCancel() {
    // this.restInfoForm.enable();
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

  onChangeEdit() {
    this.isReadOnly = false;
    this.restInfoForm.controls['activate'].enable();
  }

  onUpdateCancel() {
    // TODO : alert cancel update data
    // and re-old data
    this.isReadOnly = true;
    this.restInfoForm.controls['activate'].disable();

    // Re init form and data
    this.initForm();
  }

  onUpdateConfirm() {
    // update data
    // and change data that update
    this.isReadOnly = true;
    this.restInfoForm.controls['activate'].disable();

    this.restService.updateRestuarant(this.restData._id, this.restInfoForm.getRawValue())
        .subscribe(
          (res) => {
            // TODO : alert update sucess
            this.restData = res.data
            console.log(res);
            alert('update sucess');
          },
          (err) => {
            // TODO : alert error
            alert('update error');
          }
        )
  }

}
