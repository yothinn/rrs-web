import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { MOCKUP_RESTUARANT_DATA } from 'app/mockupData';
import { AuthenService } from 'app/authentication/authen.service';
import { UserPermissionService } from '../user-permission.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { Z_DATA_ERROR } from 'zlib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  emptyRest: boolean;
  restList: any[] = [];
  restId: any[];


  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _fuseConfigService: FuseConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private auth: AuthenService,
    private permission: UserPermissionService,
  ) {

  }

  ngOnInit(): void {
    // Temp mockup
    // this.restList = MOCKUP_RESTUARANT_DATA;

    // Configure the layout , not superadmin hide navbar
    if (!this.auth.isSuperadmin()) {
      this._fuseConfigService.config = {
        layout: {
            navbar: {
                hidden: true
            },
            // toolbar: {
            //     hidden: true
            // },
            // footer: {
            //     hidden: true
            // },
            // sidepanel: {
            //     hidden: true
            // }
        }
      };

      // Show restuarant only permission
      let id;
      const list = this.route.snapshot.data.items.data;
      console.log(list);
      this.restId = this.permission.getCurrRestuarantPermission();
      console.log(this.restId);
      for (id of this.restId) {
        const rest = list.find(data =>data._id === id);
        this.restList.push(rest);
        console.log(rest);
      }
      
      console.log(this.restList);

    } else {
      this.restList = this.route.snapshot.data.items.data;
    }
    
    this.emptyRest = this.restList.length ? false : true;

    // console.log(this.restList);
  }

  /* 
   * Navigate to restuarant
   * 
  */
  onRestuarantView(rest): void {
    // console.log(rest);
    this.router.navigate(['restuarant/dashboard', rest._id]);
  }

}
