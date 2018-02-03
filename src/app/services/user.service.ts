import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Constants } from '../Constants';

@Injectable()
export class UserService {

  private dataStore: {
    user: User;
  };

  user: Observable<User>;
  private _user: BehaviorSubject<User>;

  constructor(
    private http: Http,
  ) {
    this.dataStore = {
      user: null,
    };
    this._user = new BehaviorSubject<User>(null);
    this.user = this._user.asObservable();


    this.checkForUser();
  }

  setUser(user: User): void {
    this.dataStore.user = user;
    this._user.next(Object.assign({}, this.dataStore).user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  checkForUser(): void {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    if (sessionUser !== null) {
      this.dataStore.user = sessionUser;
      this._user.next(Object.assign({}, this.dataStore).user);
    }
  }

  login(pin: string) {
    return this.http.get(Constants.baseUrl + 'user/get/' + pin)
      .toPromise().then(response => {
        const user = response.json();
        console.log(user);
        if (user !== null) {
          this.setUser(user);
          return user;
        }
        return null;
      });
  }

  newUser(pin: number, name: string) {
    const user = new User();
    user.pin = pin;
    user.name = name;
    user.points = 0;
    console.log(user);
    return this.http.post(Constants.baseUrl + 'user/insert', user)
      .toPromise().then(response => {
        if (response.json()) {
          this.setUser(user);
          return response.json();
        } else {
          return false;
        }
        });
  }

  getAllUsers() {
    return this.http.get(Constants.baseUrl + 'user/getall')
      .toPromise()
  }

}
