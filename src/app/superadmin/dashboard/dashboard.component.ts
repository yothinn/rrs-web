import { Component, OnInit } from '@angular/core';
import { MOCKUP_RESTUARANT_DATA } from 'app/mockupData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  emptyRest: boolean;
  restList: any[] = [];


  constructor() { }

  ngOnInit() {
    // Temp mockup
    this.restList = MOCKUP_RESTUARANT_DATA;

    this.emptyRest = this.restList.length ? false : true;

  }

  /* 
   * Navigate to restuarant
   * 
  */
  onRestuarantView(rest) {

  }

}
