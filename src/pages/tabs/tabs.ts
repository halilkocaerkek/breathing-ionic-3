import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ProgramModel} from "./../../app/models/program-model";

import {AboutPage} from '../about/about';
import {ProgramPage} from '../program/program';
import {HomePage} from '../home/home';

@Component({templateUrl: 'tabs.html'})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ProgramPage;

  constructor(public storage : Storage) {
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
                // programlar okunabildi.
                if (p == null) {
                  this.initPrograms();
                  this.initUserPrograms();
                }
              })
              .catch((c) => {
                // programlar okunamadı.
                this.initPrograms();
                this.initUserPrograms();
              });
          });
      });
  }

  initPrograms()
  {
    let programs = [];
    programs.push(new ProgramModel("Easy"));
    programs.push(new ProgramModel("Normal"));
    programs.push(new ProgramModel("Hard"));
    programs.push(new ProgramModel("Crazy"));
    this
      .storage
      .set('programs', programs);
  }

  initUserPrograms()
  {
    let userPrograms = [];
    userPrograms.push(new ProgramModel("User Defined Programs"));
    userPrograms.push(new ProgramModel("Test Program"));
    userPrograms.push(new ProgramModel("UDP 2"));
    userPrograms.push(new ProgramModel("UDP 3"));
    this
      .storage
      .set('userPrograms', userPrograms);
  }
}
