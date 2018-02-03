import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  constructor(
    private router: Router

  ) { }

  ngOnInit() {
  }

  navigate(routeType: number): void {
    switch (routeType) {
      case 1:
        this.router.navigate(['frame/dashboard']);
        break;
      case 2:
        this.router.navigate(['frame/kampoppsett']);
        break;
      case 3:
        this.router.navigate(['frame/spesialspill']);
        break;
        case 4:
        this.router.navigate(['frame/tabell']);
        break;
    }
  }
}
