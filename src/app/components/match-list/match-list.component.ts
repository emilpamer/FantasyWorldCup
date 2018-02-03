import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from '../../models/Match';
import { MatchService } from '../../services/match.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Bet } from '../../models/Bet';
import { BetService } from '../../services/bet.service';
import { ProgressService } from '../../services/progress.service';


@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {
  matches: Match[];
  user: User;
  betList: Bet[];
  ready = false;
  allowed: boolean;

  constructor(
    private ms: MatchService,
    private us: UserService,
    private bs: BetService,
    private ps: ProgressService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.ps.getGroupStageBettingStatus()) {
      this.allowed = true;
    } else {
      this.allowed = false;
    }

    this.us.user.subscribe(res => {
      this.user = res;
      this.bs.getBetList(this.user.pin).then(bet => {
        console.log(bet);
        if (bet.length < 1) {
          this.ms.getMatchList().then(result => {
            this.matches = result.json();
            this.transformMatchesToBet();
          });
        } else {
          this.betList = bet;
          this.bs.setBetList(this.betList);
          this.ready = true;
        }
      });
    })
  }

  submit() {
    this.ms.insertBetList(this.betList).then(res => {
      if (res) {
        this.router.navigate(['frame/spesialspill']);
      } else {
        alert('Dette gikk feil: ' + res);
      }
    });
  }

  transformMatchesToBet() {
    console.log('transforming matches to bets');
    this.betList = [];
    for (const match of this.matches) {
      const bet = new Bet();
      bet.userId = this.user.pin;
      bet.matchId = match.id;
      bet.homeTeam = match.homeTeam;
      bet.awayTeam = match.awayTeam;
      this.betList.push(bet);
    }
    this.bs.setBetList(this.betList);
    this.ready = true;
  }

}
