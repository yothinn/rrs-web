import { Component, OnInit } from '@angular/core';
import { SelectionType, ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';


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

  constructor() { }

  ngOnInit() {
    // Mockup data
    this.selected = [this.rows[2] ];
    this.rows = [
      { firstName: "Test", lastName: "Test", username: "Test", roles: "super-admin" },
      { firstName: "Test1", lastName: "Test1", username: "Test1", roles: "admin"},
      { firstName: "Test2", lastName: "Test2", username: "Test2", roles: "staff"},
    ];
  }

}
