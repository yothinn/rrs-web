import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restuarant-dashboard',
  templateUrl: './restuarant-dashboard.component.html',
  styleUrls: ['./restuarant-dashboard.component.scss']
})
export class RestuarantDashboardComponent implements OnInit {
  

  restData: any;
  emptyMeal: boolean;
  mealList: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { 

  }

  ngOnInit() {
    this.restData = this.route.snapshot.data.items.data;
    // console.log(this.restInfo);

    this.emptyMeal = true;

  }

  onMealView(meal) {
    
  }

}
