import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgramDetailPage } from '../programdetail/programdetail';
import { ProgramModel } from "./../../app/models/program-model";

@Component({ selector: 'page-program', templateUrl: 'program.html' })
export class ProgramPage {

  programs: ProgramModel[];
  userPrograms: ProgramModel[];

  constructor(public navCtrl: NavController) {

    this.userPrograms = [];
  }

  itemTapped(event, args) {
    // That's right, we're pushing to ourselves! x
    this
      .navCtrl
      .push(ProgramDetailPage, args);
  }

  addNewProgram() {
    this
      .userPrograms
      .push(new ProgramModel("New User Program"));

  }

}
