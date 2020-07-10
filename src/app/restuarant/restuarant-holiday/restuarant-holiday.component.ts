import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restuarant-holiday',
  templateUrl: './restuarant-holiday.component.html',
  styleUrls: ['./restuarant-holiday.component.scss']
})
export class RestuarantHolidayComponent implements OnInit {

  restData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { 

  }

  ngOnInit() {
    this.restData = this.route.snapshot.data.items.data;
  }


}
