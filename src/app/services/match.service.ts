import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { Bet } from '../models/bet';
import { Constants } from '../Constants';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MatchService {

  private dataStore: {
    matchList: Match[];
  };

  matchList: Observable<Match[]>;
  private _matchList: BehaviorSubject<Match[]>;

  constructor(
    private http: Http,
  ) {
    this.dataStore = {
      matchList: null
    };

    this._matchList = new BehaviorSubject<Match[]>(null);
    this.matchList = this._matchList.asObservable();

  }


  setMatchList(matchList: Match[]): void {
    this.dataStore.matchList = matchList;
    this._matchList.next(Object.assign({}, this.dataStore).matchList);
    sessionStorage.setItem('matchList', JSON.stringify(matchList));
  }

  getMatchList() {
    return this.http.get(Constants.baseUrl + 'match/get')
      .toPromise();
  }

  insertBetList(betList: Bet[]) {
    return this.http.post(Constants.baseUrl + 'bet/insert', betList)
      .toPromise().then(response => {
        console.log(response.json());
          return response.json();
        });
  }

}
