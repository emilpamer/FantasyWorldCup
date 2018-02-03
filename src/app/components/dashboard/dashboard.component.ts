import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { DataSource, CdkCellDef, CdkHeaderCell } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
users: User[] = [];
  average: number;

  constructor(
    private us: UserService,
  ) { }

  ngOnInit() {
    this.us.getAllUsers().then( res => {
      this.users = res.json()[0];
      let score = 0;
      for (const user of this.users) {
        score += user.points;
      }
      this.average = score / this.users.length;
    });
  }

}
