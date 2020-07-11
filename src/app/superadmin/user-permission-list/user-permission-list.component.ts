import { Component, OnInit } from '@angular/core';
import { SelectionType, ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import {MatDialog} from '@angular/material/dialog';
import { UserPermissionDialogComponent } from '../user-permission-dialog/user-permission-dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserPermissionService } from '../user-permission.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenService } from 'app/authentication/authen.service';
import { RestuarantService } from 'app/restuarant/restuarant.service';



@Component({
  selector: 'app-user-permission-list',
  templateUrl: './user-permission-list.component.html',
  styleUrls: ['./user-permission-list.component.scss']
})
export class UserPermissionListComponent implements OnInit {

  // Data table
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  rows: Array<any> = [];
  selected: Array<any> = [];

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private permission: UserPermissionService,
    private auth: AuthenService,
    private restService: RestuarantService,
    private spinner: NgxSpinnerService,
    public dlg: MatDialog
  ) { }

  ngOnInit() {
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

  onAddUser() {
    const dlgRef = this.dlg.open(UserPermissionDialogComponent, {
      width: '400px',
      height: '600px'
    });

    dlgRef.afterClosed().subscribe(dlgData => {
      // console.log(`Dialog result: ${JSON.stringify(dlgData)}`);

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

      
      // 1. register to auth service
      this.auth.AddUser(authBody)
        .then((authRes) => {
          console.log(`add user result: ${JSON.stringify(authRes)}`);
          // 2. create user to rrs service
          this.permission.addUser(permissionBody)
            .then((result) => {
              // TODO : Alert create user success
              console.log(`user permission result: ${JSON.stringify(result)}`);
            })
            .catch((err) => {
              // TODO : Alert error to user
              console.log(`User Permission error : ${err}`);
            });
        })
        .catch(authErr => {
            // TODO : Alert error to user
            console.log(`auth error : ${authErr}`);
        });
    });
  }

  // onChangeUserPermission(user) {
  //   console.log(user);
  // }
}
