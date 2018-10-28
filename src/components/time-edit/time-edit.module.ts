import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeEdit } from './time-edit';

@NgModule({
  declarations: [
    TimeEdit,
  ],
  imports: [
    IonicPageModule.forChild(TimeEdit),
  ],
  exports: [
    TimeEdit
  ]
})
export class TimeEditModule {}
