export class Match {
id: number;
homeTeam: string;
homeScore: number;
awayTeam: string;
awayScore: number;

constructor(id: number, homeTeam: string, awayTeam: string, homeScore: number, awayScore: number) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = homeScore;
    this.awayScore = awayScore;
}

}
