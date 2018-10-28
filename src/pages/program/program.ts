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


  constructor(public navCtrl: NavController, public UserData: UserData, public alertCtrl: AlertController) {

    this.programs = this.UserData.programs;
    this.userPrograms = this.UserData.userPrograms;
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
            this.UserData.removeProgram(item);
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
            this.UserData.addNewUserProgram(data.title);
          }
        }
      ]
    });
    prompt.present();
  }
}
