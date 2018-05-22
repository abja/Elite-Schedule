import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyTeamsPage } from '../my-teams/my-teams';
import { TeamsPage } from '../teams/teams';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';


@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  public tournaments: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApiProvider: EliteApiProvider,
              public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'      
    });

    loader.present().then(() => {
      this.eliteApiProvider.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });  
    }); 
    
  }

 
  itemTapped($event, tourney){
    this.navCtrl.push(TeamsPage, tourney);
  }

}
