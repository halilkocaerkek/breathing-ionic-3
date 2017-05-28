import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {ProgramModel} from "../app/models/program-model";

@Injectable()
export class UserData {

  programs : ProgramModel[];
  userPrograms : ProgramModel[];

  constructor(public events : Events) {}


}
