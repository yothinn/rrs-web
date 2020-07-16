import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-restuarant-dashboard',
  templateUrl: './restuarant-dashboard.component.html',
  styleUrls: ['./restuarant-dashboard.component.scss']
})
export class RestuarantDashboardComponent implements OnInit, OnDestroy {
  

  restData: any;
  emptyMeal: boolean;
  mealList: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.restData = this.route.snapshot.data.items.data;
    // console.log(this.restInfo);

    this.emptyMeal = true;

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onMealView(meal) {
    
  }

}
