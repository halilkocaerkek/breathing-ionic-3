import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Tabs } from 'ionic-angular';
import { ProgramModel, ProgramItem } from "./../../app/models/program-model";
import { CycleModel } from "./../../app/models/cycle-model";
import { CycleDetailPage } from '../cycle-detail-page/cycle-detail-page';
 

@Component({ selector: 'page-programdetail', templateUrl: 'programdetail.html' })
export class ProgramDetailPage {

  selectedItem: ProgramModel;
  count: number = 5;
  key = "";
  path = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController ) {
    // If we navigated to this page, we will have an item available as a nav param

    this.selectedItem = navParams.get('item');
  }
  add(event, item, val: number) {
    item.repeat += val;
  }

  playProgram() {
    /* this
      .navCtrl
      .push(HomePage, { item: this.selectedItem }); */
      this.selectTab(0) ;
  }

  selectTab(index: number) {
        var t: Tabs = this.navCtrl.parent;
        t.select(index, this.navCtrl) ;
    }

  addItem() {
    this
      .selectedItem
      .items
      .push(new ProgramItem(5, new CycleModel("new", 4, 7, 8, 0)))
  }

  getPattern(c: CycleModel) {
    return CycleModel.getString(c);
  }

  getCycleLenght(c) {
    return CycleModel.getLenght(c, this.selectedItem.timeUnit);
  }

  getTimes(c) {
    return CycleModel.getTimes(c, this.selectedItem.timeUnit);
  }

  getSecondTitle() {
    if (this.selectedItem.timeUnit == 1)
      return "second";
    return "seconds";
  }

  itemTapped(event, args) {
    // That's right, we're pushing to ourselves!
    this
      .navCtrl
      .push(CycleDetailPage, args);
  }

    removeItem(item) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to remove this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            let index = this.selectedItem.items.indexOf(item);
            if (index > -1) {
              this.selectedItem.items.splice(index, 1);
            }
          }
        }
      ]
    });
    alert.present();
  }
}
