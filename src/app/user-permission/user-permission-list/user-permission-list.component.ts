import { Component, OnInit } from '@angular/core';
import { SelectionType, ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import {MatDialog} from '@angular/material/dialog';
import { UserPermissionDialogComponent } from '../user-permission-dialog/user-permission-dialog.component';



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
    public dlg: MatDialog
  ) { }

  ngOnInit() {
    // Mockup data
    this.selected = [this.rows[2] ];
    this.rows = [
      { firstName: "Test", lastName: "Test", username: "Test", roles: "super-admin" },
      { firstName: "Test1", lastName: "Test1", username: "Test1", roles: "admin"},
      { firstName: "Test2", lastName: "Test2", username: "Test2", roles: "staff"},
    ];
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
