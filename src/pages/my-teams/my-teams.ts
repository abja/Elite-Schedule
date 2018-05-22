import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage } from "../tournaments/tournaments";
import { TeamHomePage } from "../team-home/team-home";
import { EliteApiProvider } from "../../providers/elite-api/elite-api";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";

@Component({
    templateUrl: 'my-teams.html'
  })
  export class MyTeamsPage {
    favorites = [];
     /* {
        team: {id: 6182, name: 'HC Elite 7th', coach: 'Michelotti'},
        tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
        tournamentName: 'March Madness Tournament'
      },
      {
        team: {id: 805, name: 'HC Elite', coach: 'Michelotti'},
        tournamentId: '',
        tournamentName: 'Holiday Hoops Challenge'
      }
     ];*/
    constructor(private nav: NavController,
                private eliteApiProvider: EliteApiProvider,
                private loadingController: LoadingController,
                private userSettingsProvider: UserSettingsProvider){}

    ionViewDidEnter(){
      this.favorites = this.userSettingsProvider.getAllFavorites();
    }

    goToTournaments(){
        this.nav.push(TournamentsPage);
    }

    favoriteTapped($event,favorite){
      let loader = this.loadingController.create({
        content: 'Getting data...',
        dismissOnPageChange: true
      });
      loader.present();
      this.eliteApiProvider.getTournamentData(favorite.tournamentId)
      .subscribe(t=> this.nav.push(TeamHomePage, favorite.team));
    }
  }
  