import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
   
})
export class HomePage {

  value : number = 0;
  highlights : string = '[ {"from": 0, "to": 60, "color": "rgba(100,120, 60, .3)"}, {"from": 60, "to": 120, "color": "rgba(255, 0, 0, .3)"},{"from": 120, "to": 260, "color": "rgba(0,120, 255, .3)"}, {"from": 260, "to": 360, "color": "rgba(60, 0, 0, .3)"} ]';
 

  constructor(public navCtrl: NavController) {

  }

  start()
  {
     
    this.value += 30;
  }

}
