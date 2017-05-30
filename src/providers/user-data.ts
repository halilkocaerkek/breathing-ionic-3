import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { ProgramModel } from "../app/models/program-model";

@Injectable()
export class UserData {

  programs: ProgramModel[];
  userPrograms: ProgramModel[];

  constructor(public events: Events) {

    this.programs = [];
    this.programs.push(new ProgramModel("Beginner Program"));
     this.programs.push(new ProgramModel("Expert Program"));
      this.programs.push(new ProgramModel("Relaxing Program"));

    this.userPrograms = [];
    this.addNewUserProgram("User Program 1");
    this.addNewUserProgram("User Program 2");

  }

  addNewUserProgram( title : string) {
    this.userPrograms.push(new ProgramModel(title));
  }

}
