import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  pin: string;
  name: string;

  statusString: string = null;

  constructor(
    private router: Router,
    private us: UserService,
    private ps: ProgressService,
  ) { }

  ngOnInit() {
    sessionStorage.clear();
    if (this.ps.getGroupStageBettingStatus()) {
      this.statusString = 'Betting på gruppespillet er åpent!';
    } else if (this.ps.getKnockoutStageBettingStatus()) {
      this.statusString = 'Betting på utslagsrundene er åpent!';
    }
    if (this.ps.getMathStatus()) {
      console.log(this.ps.getMathStatus);
      this.statusString += ' Poeng holder på å bli regnet ut. Stay tuned!';
    }
  }


  login() {
    this.us.login(this.pin).then(res => {
      if (res !== null) {
        this.router.navigate(['frame/dashboard']);
      } else {
        alert('Feil pin!');
      }
    });
  }

  create() {
    this.us.newUser(Number.parseInt(this.pin), this.name).then(res => {
      if (res) {
        this.router.navigate(['frame/dashboard'])
      } else {
        alert('Denne pinkoden er opptatt (men ikke juks!)')
      }
    });
  }

}
