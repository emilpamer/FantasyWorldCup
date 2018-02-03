import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '../../models/Group';
import { Match } from '../../models/Match';
import { MatchService } from '../../services/match.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { SpecialBet } from '../../models/SpecialBet';
import { SpecialService } from '../../services/special.service';

@Component({
  selector: 'app-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent implements OnInit {
  user: User;

  topScorers: string[] = ['Cristiano Ronaldo', 'Leo Messi', 'Robert Lewandowski', 'Thomas Müller',
    'Antoine Griezmann', 'Gonzalo Higuain', 'Harry Kane', 'Romelu Lukaku'];
  surpriseAdvancingTeams: string[] = ['Russland', 'Saudi Arabia', 'Sør Korea', 'Japan', 'Panama', 'Nigeria', 'Australia'];
  favoritesToAdvanceTeams: string[] = ['Tyskland', 'Brasil', 'Portugal', 'Argentina', 'Belgia',
    'Spania', 'Polen', 'Sveits', 'Frankrike'];
  teamList: string[] = this.surpriseAdvancingTeams.concat(this.favoritesToAdvanceTeams);
  matchList: Match[] = [];
  specialBets: SpecialBet[] = [];
  groups: Group[] = [];

  groupA: Group = new Group();
  groupB: Group = new Group();
  groupC: Group = new Group();
  groupD: Group = new Group();
  groupE: Group = new Group();
  groupF: Group = new Group();
  groupG: Group = new Group();
  groupH: Group = new Group();

  topScorerGroupStage: string = null;
  topScorerWorldCup: string = null;
  topScoringGroup: string = null;
  lowestScoringGroup: string = null;
  surpriseTeams: string[] = [];
  floppingTeams: string[] = [];
  matchWithMostGoals: number = null;
  topScoringTeamGroupStage: string = null;
  lowestScoringTeamGroupStage: string = null;
  scoresZero: string[] = [];

  betLoaded = false;

  constructor(
    private ms: MatchService,
    private us: UserService,
    private ss: SpecialService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ms.getMatchList().then(res => {
      this.matchList = res.json();
      this.getSpecials();
    });

    this.us.user.subscribe(res => {
      this.user = res;
    });

    this.groupA.name = 'A';
    this.groupA.teams = ['Russland', 'Saudi Arabia', 'Egypt', 'Uruguay'];
    this.groupB.name = 'B';
    this.groupB.teams = ['Portugal', 'Spania', 'Morokko', 'Iran'];
    this.groupC.name = 'C';
    this.groupC.teams = ['Frankrike', 'Australia', 'Peru', 'Danmark'];
    this.groupD.name = 'D';
    this.groupD.teams = ['Argentina', 'Island', 'Kroatia', 'Nigeria'];
    this.groupE.name = 'E';
    this.groupE.teams = ['Brasil', 'Sveits', 'Costa Rica', 'Serbia'];
    this.groupF.name = 'F';
    this.groupF.teams = ['Tyskland', 'Mexico', 'Svergie', 'Sør Korea'];
    this.groupG.name = 'G';
    this.groupG.teams = ['Belgia', 'Panama', 'Tunis', 'England'];
    this.groupH.name = 'H';
    this.groupH.teams = ['Polen', 'Senegal', 'Kolombia', 'Japan'];
    this.groups.push(this.groupA, this.groupB, this.groupC, this.groupD, this.groupE, this.groupF, this.groupG, this.groupH);

  }

  getSpecials() {
    this.ss.getSpecialBetList(this.user.pin).then(res => {
      console.log(res.json());
      this.specialBets = res.json();
      if (this.specialBets.length > 0 && this.specialBets !== undefined) {
        this.topScorerGroupStage = this.specialBets[0].result;
        this.topScorerWorldCup = this.specialBets[1].result;
        this.topScoringGroup = this.specialBets[2].result;
        this.lowestScoringGroup = this.specialBets[3].result;
        this.surpriseTeams = this.specialBets[4].result.split(',');
        this.floppingTeams = this.specialBets[5].result.split(',');
        this.topScoringTeamGroupStage = this.specialBets[7].result;
        this.lowestScoringTeamGroupStage = this.specialBets[8].result;
        if (this.specialBets[9]) {
          this.scoresZero = this.specialBets[9].result.split(',');
        }


        const matchId = Number.parseInt(this.specialBets[6].result);
        for (const match of this.matchList) {
          if (match.id === matchId) {
            this.matchWithMostGoals = match.id;
          }
        }
      }
      this.betLoaded = true;
    });
  }

  submit() {
    this.specialBets = [];
    this.specialBets.push(new SpecialBet(1, this.user.pin, this.topScorerGroupStage));
    this.specialBets.push(new SpecialBet(2, this.user.pin, this.topScorerWorldCup));
    this.specialBets.push(new SpecialBet(3, this.user.pin, this.topScoringGroup));
    this.specialBets.push(new SpecialBet(4, this.user.pin, this.lowestScoringGroup));
    this.specialBets.push(new SpecialBet(5, this.user.pin, this.surpriseTeams.toString()));
    this.specialBets.push(new SpecialBet(6, this.user.pin, this.floppingTeams.toString()));
    this.specialBets.push(new SpecialBet(7, this.user.pin, this.matchWithMostGoals.toString()));
    this.specialBets.push(new SpecialBet(8, this.user.pin, this.topScoringTeamGroupStage));
    this.specialBets.push(new SpecialBet(9, this.user.pin, this.lowestScoringTeamGroupStage));
    this.specialBets.push(new SpecialBet(10, this.user.pin, this.scoresZero.toString()));
    console.log(this.specialBets);
    this.ss.insertSpecialBetList(this.specialBets).then(res => {
      console.log(res);
      if (res) {
        this.router.navigate(['frame/tabell']);
      } else {
        alert('noe gikk feil. Ring Emil');
      }
    });
  }

}
