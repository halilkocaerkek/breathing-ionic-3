import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {ProgramModel, ProgramItem} from "./../../app/models/program-model";
import {CycleModel} from "./../../app/models/cycle-model";
import {CycleDetailPage} from '../cycle-detail-page/cycle-detail-page';

@Component({selector: 'page-programdetail', templateUrl: 'programdetail.html'})
export class ProgramDetailPage {

  selectedItem : ProgramModel;
  count : number = 5;
  time : number = 3;

  key = "";
  path = "";

  constructor(public navCtrl : NavController, public navParams : NavParams) {
    // If we navigated to this page, we will have an item available as a nav param

    this.selectedItem = navParams.get('item');
  }
  add(event, item, val : number)
  {
    item.repeat += val;
  }

  playProgram()
  {}

  addItem()
  {
    this
      .selectedItem
      .items
      .push(new ProgramItem(5, new CycleModel("new", 4, 7, 8, 4)))
  }

  getPattern(c : CycleModel)
  {
    return CycleModel.getString(c);
  }

  getCycleLenght(c)
  {
    return CycleModel.getLenght(c, this.time);
  }

  getTimes(c)
  {
    return CycleModel.getTimes(c, this.time);
  }

  getSecondTitle()
  {
    if (this.time == 1) 
      return "second";
    return "seconds";
  }

  itemTapped(event, args) {
    // That's right, we're pushing to ourselves!
    this
      .navCtrl
      .push(CycleDetailPage, args);
  }
}
