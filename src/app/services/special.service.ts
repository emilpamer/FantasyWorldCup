import { Injectable } from '@angular/core';
import { SpecialBet } from '../models/specialBet';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Constants } from '../Constants';


@Injectable()
export class SpecialService {

 private dataStore: {
    specialBetList: SpecialBet[];
  };

  specialBetList: Observable<SpecialBet[]>;
  private _specialBetList: BehaviorSubject<SpecialBet[]>;

  constructor(
    private http: Http,
  ) {
    this.dataStore = {
      specialBetList: null
    };

    this._specialBetList = new BehaviorSubject<SpecialBet[]>(null);
    this.specialBetList = this._specialBetList.asObservable();

  }

 setSpecialBetList(specialBetList: SpecialBet[]): void {
    this.dataStore.specialBetList = specialBetList;
    this._specialBetList.next(Object.assign({}, this.dataStore).specialBetList);
    sessionStorage.setItem('specialBetList', JSON.stringify(specialBetList));
  }

  getSpecialBetList(userId: number) {
    return this.http.get(Constants.baseUrl + 'specialBet/get/' + userId)
      .toPromise()
  }

  insertSpecialBetList(specialBetList: SpecialBet[]) {
    return this.http.post(Constants.baseUrl + 'specialBet/insert', specialBetList)
      .toPromise().then(response => {
          return response.json();
        });
  }

}
