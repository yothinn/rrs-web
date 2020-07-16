import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


import { RestuarantService } from '../restuarant.service';
import { PostalcodeService } from 'app/services/postalcode.service';


@Component({
  selector: 'app-restuarant-info',
  templateUrl: './restuarant-info.component.html',
  styleUrls: ['./restuarant-info.component.scss']
})
export class RestuarantInfoComponent implements OnInit, OnDestroy {

  POSTCODE_PATTERN = /^[0-9]{5,5}$/;
  MOBILE_PATTERN = /^[0-9]{10,10}$/;

  isCreate: boolean;
  isReadOnly:boolean;
  restData: any;
  restInfoForm: FormGroup;
  imgLogo: string;

  postalCodeList: any = [];
  filterPostalCodeList: any = [];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private fb: FormBuilder,
    private restService: RestuarantService,
    private router: Router,
    private route: ActivatedRoute,
    private postalCodeSrv: PostalcodeService
  ) { 
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
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

    this.postalCodeSrv.getPostalCodeList().subscribe((res) => {
      this.postalCodeList = res.data;   
      // console.log(this.postalCodeList);
      this.setValidatePostalCode();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private initForm(): void {
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
      name: [this.restData.name, Validators.required],
      displayName: [this.restData.displayName, Validators.required],
      description: [this.restData.description],
      location: this.fb.group ({
        addressLine1: [this.restData.location.addressLine1, Validators.required],
        addressStreet: [this.restData.location.addressStreet, Validators.required],
        addressSubDistrict: [this.restData.location.addressSubDistrict, Validators.required],
        addressDistrict: [this.restData.location.addressDistrict, Validators.required],
        addressProvince: [this.restData.location.addressProvince, Validators.required],
        addressPostalCode: [this.restData.location.addressPostalCode,
                            [Validators.required,
                              Validators.pattern(this.POSTCODE_PATTERN)]],
        latitude: [''],
        logitude: ['']
      }),
      maxGuestCapacity: [this.restData.maxGuestCapacity,
                          Validators.required],
      mobileNo: [this.restData.mobileNo, 
                [Validators.required, 
                Validators.pattern(this.MOBILE_PATTERN)] ],
      otherNo: [this.restData.otherNo],
      activate: [this.restData.activate],
    });

    if (this.isReadOnly) {
      this.restInfoForm.controls['activate'].disable();
    }

  }

  private setValidatePostalCode(): void {
    if (this.postalCodeList) {
      // Not empty postalcode list
      this.restInfoForm.get('location').get('addressPostalCode')
          .setValidators([
              Validators.required,
              this.validatePostalCode(this.postalCodeList)
          ]);
    }
  }

  /*
   * cancel when create restuarant
   */
  onCancel(): void {
    this.router.navigate(['dashboard']);
  }  

  /*
   * create restuarant
   */
  onCreate(): void {
    // console.log(this.restInfoForm.getRawValue());
    this.restService.createRestuarant(this.restInfoForm.getRawValue())
        .pipe(takeUntil(this._unsubscribeAll))
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
        );
  }

  onChangeEdit(): void {
    // Enable control form for edit
    this.isReadOnly = false;
    this.restInfoForm.controls['activate'].enable();
  }

  onCancelEdit(): void {
    // TODO : alert cancel update data
    // and re-old data
    this.isReadOnly = true;
    this.restInfoForm.controls['activate'].disable();

    // Re init form and data
    this.initForm();
    this.setValidatePostalCode();
  }

  onConfirmEdit(): void {
    // update data
    // and change data that update
    this.isReadOnly = true;
    this.restInfoForm.controls['activate'].disable();

    this.restService.updateRestuarant(this.restData._id, this.restInfoForm.getRawValue())
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          (res) => {
            // TODO : alert update sucess
            this.restData = res.data;
            console.log(res);
            alert('update sucess');
          },
          (err) => {
            // TODO : alert error
            alert('update error');
          }
        );
  }

  /*
   * Filter postal code list 
   * @param {event} : input control when keyup 
   * receive string postal code
   */
  filterPostalCode(event): void {
    // TODO : ?? can change to rxjs
    // filter our data
    this.filterPostalCodeList = this.postalCodeList.filter((code: any) => {
      return code.postcode.startsWith(event.target.value);
    });
  }

  setPostalCode(val) : void {
    // 12150 | บึงคำพร้อย | อำเภอลำลูกกา | ปทุมธานี
    const arrValue = val.viewValue.split("|");
    const subdistrict = arrValue[1].trim();
    const district = arrValue[2].trim();
    const province = arrValue[3].trim();

    const locationGroup = this.restInfoForm.get('location');
    locationGroup.get('addressProvince').setValue(province);
    locationGroup.get('addressDistrict').setValue(district);
    locationGroup.get('addressSubDistrict').setValue(subdistrict);

  }

  validatePostalCode(myArray: any[]): ValidatorFn {
    if (myArray.length === 0) {
      return null;
    }

    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const selectboxValue = c.value;
      // console.log(myArray);
      // console.log(selectboxValue);
      const pickedOrNot = myArray.filter((alias) => {
        return alias.postcode === selectboxValue;
      });
      // console.log(pickedOrNot.length);
      if (pickedOrNot.length > 0) {
        // everything's fine. return no error. therefore it's null.
        return null;
      } else {
        // there's no matching selectboxvalue selected. so return match error.
        return { match: true };
      }
    };
  }

}
