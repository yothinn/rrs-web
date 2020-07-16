import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionType, ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenService } from 'app/authentication/authen.service';
import { RestuarantService } from 'app/restuarant/restuarant.service';
import { UserPermissionService } from 'app/superadmin/user-permission.service';
import { Role } from 'app/type/role';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-restuarant-user',
  templateUrl: './restuarant-user.component.html',
  styleUrls: ['./restuarant-user.component.scss']
})
export class RestuarantUserComponent implements OnInit, OnDestroy {

   // Data table
   ColumnMode = ColumnMode;
   // SelectionType = SelectionType;
   rows: Array<any> = [];
   // selected: Array<any> = [];

   restData: any;
   userList: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private permission: UserPermissionService,
    private auth: AuthenService,
    private restService: RestuarantService,
    private spinner: NgxSpinnerService,
  ) { 
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // Mockup data
    // this.selected = [this.rows[2] ];   
    // this.rows = [
    //   { displayname: "Test Test", username: "Test", position: "admin", roles: ["superadmin"] },
    //   { displayname: "Test1 Test1", username: "Test1", position: "manager", roles: ["manager"]},
    //   { displayname: "Test2 Test2", username: "Test2", position: "staff", roles: ["staff"]},
    // ];

    // console.log(this.route.snapshot.data.items);
    // this.route.snapshot.data.items
    // index 0 : restuarant.data
    // index 1 : user list; 
    this.restData = this.route.snapshot.data.items[0].data;
    this.userList = this.route.snapshot.data.items[1].data;
    this.rows = this.userList;

    // TODO : ควรแสดง user ที่ login เข้ามาไหม ??
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onAssignRestuarantUser(event: any, row): void {
    // console.log(event);
    // console.log(row);
    if (event.checked) {
      row.restuarantId.push(this.restData._id);
    } else {
      // Delete restuarant id out of list
      const index = row.restuarantId.indexOf(this.restData._id);
      delete row.restuarantId[index];
    }

    this.permission.updateUserPermission(row._id, row)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
          (res) => {
            // TODO : Alert update success
            // console.log('update user permissinon');
            // console.log(res);
            alert('update user permission success');
          },
          (err) => {
            // TODO : alert error and unchanged
            // console.log('cannot update user permission');
            alert('cannot user user permission');
          }
        );
  }

  /*
   * check or not : find restuarant id same as restData
   */
  isCheckbox(row): boolean {
    // console.log(row);

    // Superadmin always check
    if (this.isSuperadmin(row)) {
      return true;
    }
    // Find restuarant id
    return row.restuarantId.indexOf(this.restData._id) >= 0 ? true : false;
  }

  isSuperadmin(row): boolean {
    return (row.roles[0] === Role.Superadmin) ? true : false;
  }
}