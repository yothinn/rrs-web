import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { rolesList, positionList } from '../role';


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
  ) { 
    this.rolesList = rolesList;
    this.positionList = positionList;
  }

  // TODO : เพิ่มช่อง confirm password
  ngOnInit() {
    this.userForm = this._fb.group ({
      // firstname: [''],
      // lastname: [''],
      displayname: [''],
      username: [''],
      password: [''],
      position: [''],
      role: [''],
    });

  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    // TODO : Check username isExist ??

    this.userData = this.userForm.getRawValue();
    console.log(this.userData);
    
    this.dialogRef.close(this.userData);
  }

}
