import { Injectable } from '@angular/core';
import { ProgramModel } from "../app/models/program-model";
import { Storage } from '@ionic/storage';

@Injectable()
export class UserData {

  programs: ProgramModel[] = [];
  userPrograms: ProgramModel[] = [];

  constructor(public storage: Storage) {

    // initial values
    this.programs = [];
    this.programs.push(new ProgramModel("Beginner Program"));
    this.programs.push(new ProgramModel("Expert Program"));
    this.programs.push(new ProgramModel("Relaxing Program"));

    this.userPrograms = [];

    // replace initial values from nativestorage
    this.storage.get('programs').then((val) => {
      this.programs = val;
    });
    this.storage.get('userPrograms').then((val) => {
      this.userPrograms = val;
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

}
