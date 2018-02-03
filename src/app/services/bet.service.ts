import { Injectable } from '@angular/core';
import { Bet } from '../models/bet';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Constants } from '../Constants';


@Injectable()
export class BetService {

 private dataStore: {
    betList: Bet[];
  };

  betList: Observable<Bet[]>;
  private _betList: BehaviorSubject<Bet[]>;

  constructor(
    private http: Http,
  ) {
    this.dataStore = {
      betList: null
    };

    this._betList = new BehaviorSubject<Bet[]>(null);
    this.betList = this._betList.asObservable();

  }

 setBetList(betList: Bet[]): void {
    this.dataStore.betList = betList;
    this._betList.next(Object.assign({}, this.dataStore).betList);
    sessionStorage.setItem('betList', JSON.stringify(betList));
  }

  getBetList(userId: number) {
    return this.http.get(Constants.baseUrl + 'bet/get/' + userId)
      .toPromise()
      .then(res => {
          return res.json();
      });
  }

}
