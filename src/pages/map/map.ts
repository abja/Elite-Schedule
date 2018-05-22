import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

declare var window: any;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  public map: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApiProvider: EliteApiProvider) {
  }

  ionViewDidLoad() {
    let games = this.navParams.data;
    let tourneyData = this.eliteApiProvider.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    };    
    console.log('ionViewDidLoad MapPage');
  }

  goToDirections(){
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }
}
