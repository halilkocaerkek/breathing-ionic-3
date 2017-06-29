import { Injectable } from '@angular/core';
import { ProgramModel } from "../app/models/program-model";
import { Storage } from '@ionic/storage';

@Injectable()
export class UserData {

  programs: ProgramModel[] = [];
  userPrograms: ProgramModel[] = [];

  constructor(public storage: Storage) {


    storage
      .ready()
      .then(() => {
        this
          .storage
          .get('programs')
          .then((p) => {
            this.programs = p;
            if (this.programs == null) {
              this.initPrograms();
            }
          })
          .catch((c) => {
            this.initPrograms();
          });
        this
          .storage
          .get('userPrograms')
          .then((p) => {
            this.userPrograms = p;
            if (this.userPrograms == null) {
              this.initUserPrograms();
            }
          })
          .catch((c) => {
            this.initUserPrograms();
          });
      });



  }

  save() {
    this.storage.set('programs', this.programs);
    this.storage.set('userPrograms', this.userPrograms);
  }

  removeProgram(item) {
    let index = this.userPrograms.indexOf(item);
    if (index > -1) {
      this.userPrograms.splice(index, 1);
    }
    this.save();
  }

  addNewUserProgram(title: string) {
    this.userPrograms.push(new ProgramModel(title));
    this.save();
  }

  initPrograms() {
    this.programs = [];
    this.programs.push(new ProgramModel("Easy"));
    this.programs.push(new ProgramModel("Normal"));
    this.programs.push(new ProgramModel("Hard"));
    this.programs.push(new ProgramModel("Crazy"));
    this
      .storage
      .set('programs', this.programs);
  }

  initUserPrograms() {
    this.userPrograms = [];
    this.userPrograms.push(new ProgramModel("User Defined Programs"));
    this.userPrograms.push(new ProgramModel("Test Program"));
    this.userPrograms.push(new ProgramModel("UDP 2"));
    this.userPrograms.push(new ProgramModel("UDP 3"));
    this
      .storage
      .set('userPrograms', this.userPrograms);
  }

}
