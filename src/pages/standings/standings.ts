import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

import * as _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  public team: any;
  public allStandings: any[];
  public standings: any[];
  public divisionFilter: string = 'division';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApiProvider: EliteApiProvider) {
    
  }

  ionViewDidLoad(){
    this.team = this.navParams.data;
    let tourneyData = this.eliteApiProvider.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.allStandings = tourneyData.standings;
    /*this.allStandings =
      _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName','divisionStandings'],item))
      .value();*/

    this.filterDivision();
    console.log('standings', this.standings);
    console.log('division standings', this.allStandings);
  }
  
  getHeader(record, recordIndex, records){
    if(recordIndex === 0 || record.division !== records[recordIndex -1].division){
      return record.division;
    }
    return null;
  }

 filterDivision(){
   if(this.divisionFilter === 'all'){
     this.standings = this.allStandings;
   }else{
     this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
   }
 } 
}
