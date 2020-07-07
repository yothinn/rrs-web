import { Component, OnInit } from '@angular/core';
import { SelectionType, ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import {MatDialog} from '@angular/material/dialog';
import { UserPermissionDialogComponent } from '../user-permission-dialog/user-permission-dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserPermissionService } from '../user-permission.service';
import { NgxSpinnerService } from 'ngx-spinner';



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

    this.spinner.hide();
    this.rows = this.route.snapshot.data.items.data;
    // this.temp = this.route.snapshot.data.items.data;
    // console.log(this.rows);

  }

  onAddUser() {
    const dlgRef = this.dlg.open(UserPermissionDialogComponent, {
      width: '400px',
      height: '600px'
    });

    dlgRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
