import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionType, ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import {MatDialog} from '@angular/material/dialog';
import { UserPermissionDialogComponent } from '../user-permission-dialog/user-permission-dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserPermissionService } from '../user-permission.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenService } from 'app/authentication/authen.service';
import { RestuarantService } from 'app/restuarant/restuarant.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-permission-list',
  templateUrl: './user-permission-list.component.html',
  styleUrls: ['./user-permission-list.component.scss']
})
export class UserPermissionListComponent implements OnInit, OnDestroy {

  // Data table
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  rows: Array<any> = [];
  selected: Array<any> = [];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private permission: UserPermissionService,
    private auth: AuthenService,
    private restService: RestuarantService,
    private spinner: NgxSpinnerService,
    public dlg: MatDialog
  ) { 
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // Mockup data
    // this.selected = [this.rows[2] ];   
    // this.rows = [
    //   { firstName: "Test", lastName: "Test", username: "Test", roles: "super-admin" },
    //   { firstName: "Test1", lastName: "Test1", username: "Test1", roles: "admin"},
    //   { firstName: "Test2", lastName: "Test2", username: "Test2", roles: "staff"},
    // ];

    // this.spinner.hide();
    this.rows = this.route.snapshot.data.items.data;

    // this.temp = this.route.snapshot.data.items.data;
    // console.log(this.rows);

  }

  ngOnDestroy(): void {
     // Unsubscribe from all subscriptions
     this._unsubscribeAll.next();
     this._unsubscribeAll.complete();
  }

  onAddUser(): void {
    const dlgRef = this.dlg.open(UserPermissionDialogComponent, {
      width: '400px',
      height: '600px'
    });

    dlgRef.afterClosed()
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(async dlgData => {
      // console.log(`Dialog result: ${JSON.stringify(dlgData)}`);

      // Cancel Dialog
      if (!dlgData) {
        return;
      }

      const authBody = {
        firstname: dlgData.displayname,
        lastname: '-',
        email: `${dlgData.username}@email.com`,           
        password: dlgData.password,
        username: dlgData.username,
        roles: [dlgData.role]
      };

      // console.log(authBody);

      const permissionBody = {
        username: dlgData.username,
        firstname: dlgData.displayname,
        lastname: '-',
        displayname: dlgData.displayname,
        email: `${dlgData.username}@email.com`,
        roles: [dlgData.role],
        position: dlgData.position,
        restuarantId: []
      };

      
      try {
        // 1. register to auth service
        const authRes = await this.auth.addUser(authBody);
        // console.log(`add user result: ${JSON.stringify(authRes)}`);

        // 2. create user to rrs service
        this.permission.addUser(permissionBody)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
              (result) => {
                // TODO : alert 
                alert('เพิ่มผู้ใช้สำเร็จ');
                // Reload current page
                window.location.reload();
                // console.log(`user permission result: ${JSON.stringify(result)}`);
              },
              (err) => {
                // TODO : alert
                alert('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน กรูณาลองใหม่อีกครั้ง');
                // console.log(`User Permission error : ${JSON.stringify(err)}`);
              }
            );
      } catch (err) {
        // TODO: alert
        alert('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน กรูณาลองใหม่อีกครั้ง');
        // console.log(`auth error : ${JSON.stringify(err)}`);
      }
    });

  }

  onEditUser(row) {

  }

  onDeleteUser(row) {

  }

  onChangePassword(row) {

  }
}
