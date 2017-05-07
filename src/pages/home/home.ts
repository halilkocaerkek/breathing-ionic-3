import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {ProgramModel} from "../../app/models/program-model";

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
  selectedItem : ProgramModel;

  value : number = 0;
  highlights : string = '[ {"from": 0, "to": 60, "color": "rgba(100,120, 60, .3)"}, {"from": 60, "to": 12' +
      '0, "color": "rgba(255, 0, 0, .3)"},{"from": 120, "to": 260, "color": "rgba(0,120' +
      ', 255, .3)"}, {"from": 260, "to": 360, "color": "rgba(60, 0, 0, .3)"} ]';

  constructor(public navCtrl : NavController, public userData : UserData, public navParams : NavParams) {

    let _item = navParams.get('item')
    if (_item) {
      this.selectedItem = _item;
    } else {
      this
        .userData
        .getSelectedProgram()
        .then((selectedItem) => {
          this.selectedItem = selectedItem;
        });
    }
    if(!this.selectedItem)
    {
      this.selectedItem = new ProgramModel("New User Program");
    }
  }

  start()
  {

    this.value += 30;
  }

}
