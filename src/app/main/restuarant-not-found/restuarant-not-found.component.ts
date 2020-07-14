import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-restuarant-not-found',
  templateUrl: './restuarant-not-found.component.html',
  styleUrls: ['./restuarant-not-found.component.scss']
})
export class RestuarantNotFoundComponent implements OnInit {

  constructor(
    private _fuseConfigService: FuseConfigService,
  ) { 

  }

  ngOnInit() {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
          navbar: {
              hidden: true
          },
          // toolbar: {
          //     hidden: true
          // },
          footer: {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  };
  }

}
