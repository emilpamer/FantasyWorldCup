import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { DataSource, CdkCellDef, CdkHeaderCell } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  users: User[] = [];
  topHUB: User[] = [];
  topSpecials: User[] = [];
  topThreePointers: User[] = [];
  average: number;
  displayedColumns = ['navn', 'poeng'];
  userDataSource;

  constructor(
    private us: UserService,
  ) { }

  ngOnInit() {
    this.us.getAllUsers().then(res => {
      console.log(res.json());
      this.users = res.json()[0];
      this.topHUB = res.json()[1];
      this.topThreePointers = res.json()[2];
      this.topSpecials = res.json()[3];

      this.topHUB = this.topHUB.slice(0, 5);
      this.topThreePointers = this.topThreePointers.slice(0, 5);
      this.topSpecials = this.topSpecials.slice(0, 5);

      this.userDataSource = new ExampleDataSource(this.users);

  });
  }
}

export class ExampleDataSource extends DataSource<any> {
  input;
  constructor(input: any[]) {
    super();
    this.input = input;
  }

  connect(): Observable<any[]> {
    return Observable.of(this.input);
  }

  disconnect() { }
}
