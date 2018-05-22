import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
import { TeamDetailPage } from '../team-detail/team-detail';
import { TeamHomePage } from '../team-home/team-home';
import { MapPage } from '../map/map';

declare var window: any;
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public game: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApiProvider: EliteApiProvider) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
    console.log(`ionViewDidLoad GamePage ## ${this.game.team1} ##`);
  }

  teamTapped(teamId){
    let turneyData = this.eliteApiProvider.getCurrentTourney();
    let team = turneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team)
  }
  isWinner(score1, score2){
    return Number(score1) > Number(score2) ? 'primary' : 'danger';
  }

  goToMap(){
    this.navCtrl.push(MapPage, this.game);
  }

  goToDirections(){
    let tourneyData = this.eliteApiProvider.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35`;
  }
}
