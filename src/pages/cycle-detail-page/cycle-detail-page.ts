import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CycleModel} from "./../../app/models/cycle-model";
 
@IonicPage()
@Component({selector: 'page-cycle-detail-page', templateUrl: 'cycle-detail-page.html'})
export class CycleDetailPage {
  item : CycleModel;
time : number ;

  constructor(public navCtrl : NavController, public navParams : NavParams) {
    this.item = navParams.get('item');
  this.time = navParams.get('time');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CycleDetailPage');
  }

  getPattern(c : CycleModel)
  {
    return CycleModel.getString(c);
  }

    getCycleLenght(c)
    {
      return CycleModel.getLenght(c, this.time) ;
    }

    getTimes(c)
    {
      return CycleModel.getTimes(c, this.time) ;
    }

}
