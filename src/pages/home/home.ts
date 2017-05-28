
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from "../../providers/user-data";
import { ProgramModel } from "../../app/models/program-model";
import { CycleModel } from '../../app/models/cycle-model';

@Component({ selector: 'page-home', templateUrl: 'home.html' })
export class HomePage {
  selectedProgram: ProgramModel;
  selectedCycle: CycleModel;

  value: number = 0;
  cycleCount = 0;

  highlights: string = '[ {"from": 0, "to": 60, "color": "rgba(100,120, 60, .3)"}, {"from": 60, "to": 12' +
  '0, "color": "rgba(255, 0, 0, .3)"},{"from": 120, "to": 260, "color": "rgba(0,120' +
  ', 255, .3)"}, {"from": 260, "to": 360, "color": "rgba(60, 0, 0, .3)"} ]';

  constructor(public navCtrl: NavController, public userData: UserData, public navParams: NavParams) {

    let _item = navParams.get('item')
    if (_item) {
      this.selectedProgram = _item;

    }

    if (!this.selectedProgram) {
      this.selectedProgram = new ProgramModel("New User Program");

    }
    this.selectedCycle = this.selectedProgram.items[0].cycle;
    this.highlights = CycleModel.gethighlights(this.selectedCycle, this.selectedProgram.timeUnit);
  }

  // gaugue 360 lık bir cycle alıyor.
  // ben toplam cycle süresini hesaplayıp, buna göre 1 birime karşılık gelen ms değerini kullanmalıyım.

  increaseTimer() {
    let ratio = CycleModel.getRatio(this.selectedCycle, this.selectedProgram.timeUnit);
    this.value += Math.round(ratio);
    if (this.value > 360) {
      this.value = 0;
      this.cycleCount++;
    }
  }

  timer : any ;
  start() {
    this.timer = setInterval(() => { this.increaseTimer(); }, 1000);
  }
  stop()
  {
    clearInterval(this.timer);
     this.value = 0;
  }

}
