import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController} from 'ionic-angular';
import {ProgramDetailPage} from '../programdetail/programdetail';

import {ProgramModel} from "./../../app/models/program-model";

@Component({selector: 'page-program', templateUrl: 'program.html'})
export class ProgramPage {

  programs : ProgramModel[];
  userPrograms : ProgramModel[];

  constructor(public navCtrl : NavController, public storage : Storage) {
    storage
      .ready()
      .then(() => {
        storage
          .ready()
          .then(() => {
            this
              .storage
              .get('programs')
              .then((p) => {
                this.programs = p;
              })
              .catch((c) => {});

            this
              .storage
              .get('userPrograms')
              .then((p) => {
                this.userPrograms = p;
              })
              .catch((c) => {});
          });
      });
  }

  itemTapped(event, args) {
    // That's right, we're pushing to ourselves! x
    this
      .navCtrl
      .push(ProgramDetailPage, args);
  }

  addNewProgram()
  {
    this
      .userPrograms
      .push(new ProgramModel("New User Program"));

    this
      .storage
      .set('userPrograms', this.userPrograms);
  }

}
