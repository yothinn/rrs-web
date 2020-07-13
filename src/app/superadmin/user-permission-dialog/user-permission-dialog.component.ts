import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { rolesList, positionList } from 'app/type/role';
import { UserPermissionService } from '../user-permission.service';
import { confirmPasswordValidator } from 'app/authentication/register/register.component'

@Component({
  selector: 'app-user-permission-dialog',
  templateUrl: './user-permission-dialog.component.html',
  styleUrls: ['./user-permission-dialog.component.scss']
})
export class UserPermissionDialogComponent implements OnInit {

  userForm: FormGroup;
  rolesList: any[];
  positionList: any[];

  constructor(
    public dialogRef: MatDialogRef<UserPermissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private _fb: FormBuilder,
    private permission: UserPermissionService,
  ) { 
    this.rolesList = rolesList;
    this.positionList = positionList;
  }

  // TODO : เพิ่มช่อง confirm password
  ngOnInit() {
    this.userForm = this._fb.group ({
      // firstname: [''],
      // lastname: [''],
      displayname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator] ],
      position: ['', Validators.required],
      role: ['', Validators.required],
    });

  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    // TODO : Check username isExist ??
    this.permission.getUserPermission(this.userForm.controls['username'].value)
        .then(
          (res) => {
            if (res) {
              // TODO : change to validateFn
              alert('ชื่อผู้ใช้ซ้ำ กรุณาเปลี่ยนชื่อผู้ใช้อีกครั้ง');
              console.log(res);
            } else {
              this.userData = this.userForm.getRawValue();
              console.log(this.userData);
              this.dialogRef.close(this.userData);
            }
          },
          (err) => {
            this.dialogRef.close();
          }
        );
  }

  /**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */ 
  // confirmPasswordValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {

  //     console.log(control);
  //     if ( !control.parent || !control )
  //     {
  //         return null;
  //     }

  //     const password = control.parent.get('password');
  //     const passwordConfirm = control.parent.get('passwordConfirm');
      
  //     console.log(password);
  //     console.log(passwordConfirm);

  //     if ( !password || !passwordConfirm )
  //     {
  //         return null;
  //     }

  //     if ( passwordConfirm.value === '' )
  //     {
  //       return null;
  //     }

  //     if ( password.value === passwordConfirm.value )
  //     {
  //       return null;
  //     }

  //     return {'passwordsNotMatching': true};
  //   }
  // }

}
