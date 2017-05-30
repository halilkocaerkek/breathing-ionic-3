import { UserData } from '../../providers/user-data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProgramDetailPage } from '../programdetail/programdetail';
import { ProgramModel } from "./../../app/models/program-model";

@Component({ selector: 'page-program', templateUrl: 'program.html' })
export class ProgramPage {

  programs: ProgramModel[];
  userPrograms: ProgramModel[];
  Data: UserData;

  constructor(public navCtrl: NavController, private _UserData: UserData, public alertCtrl: AlertController) {
    this.Data = _UserData;
    this.programs = this.Data.programs;
    this.userPrograms = this.Data.userPrograms;
  }

  itemTapped(event, args) {
    this.navCtrl.push(ProgramDetailPage, args);
  }

  removeProgram(item) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to remove this program?',
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
            let index = this.userPrograms.indexOf(item);
            if (index > -1) {
              this.userPrograms.splice(index, 1);
            }
          }
        }
      ]
    });
    alert.present();
  }


  addNewProgram() {
    let prompt = this.alertCtrl.create({
      title: 'Add Program',
      message: "Enter a name for this new breathing program",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.Data.addNewUserProgram(data.title);
          }
        }
      ]
    });
    prompt.present();
  }
}
