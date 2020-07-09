import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { MOCKUP_RESTUARANT_DATA } from 'app/mockupData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  emptyRest: boolean;
  restList: any[] = [];


  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {

   }

  ngOnInit() {
    // Temp mockup
    // this.restList = MOCKUP_RESTUARANT_DATA;

    this.restList = this.route.snapshot.data.items.data;

    this.emptyRest = this.restList.length ? false : true;

    console.log(this.restList);

  }

  /* 
   * Navigate to restuarant
   * 
  */
  onRestuarantView(rest) {
    // console.log(rest);
    this.router.navigate(['restuarant/dashboard', rest._id]);
  }

}
