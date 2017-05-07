import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CycleDetailPage } from './cycle-detail-page';

@NgModule({
  declarations: [
    CycleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CycleDetailPage),
  ],
  exports: [
    CycleDetailPage
  ]
})
export class CycleDetailPageModule {}
