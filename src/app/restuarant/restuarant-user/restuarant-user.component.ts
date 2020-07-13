import { Component, OnInit } from '@angular/core';
import { SelectionType, ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenService } from 'app/authentication/authen.service';
import { RestuarantService } from 'app/restuarant/restuarant.service';
import { UserPermissionService } from 'app/superadmin/user-permission.service';

@Component({
  selector: 'app-restuarant-user',
  templateUrl: './restuarant-user.component.html',
  styleUrls: ['./restuarant-user.component.scss']
})
export class RestuarantUserComponent implements OnInit {

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
  ) { 

  }

  ngOnInit() {
    // Mockup data
    this.selected = [this.rows[2] ];   
    this.rows = [
      { displayname: "Test Test", username: "Test", position: "admin", roles: ["superadmin"] },
      { displayname: "Test1 Test1", username: "Test1", position: "manager", roles: ["manager"]},
      { displayname: "Test2 Test2", username: "Test2", position: "staff", roles: ["staff"]},
    ];
  }

  onAssignRestuarantUser(row) {
    
  }

}
