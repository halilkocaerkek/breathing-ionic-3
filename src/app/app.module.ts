import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {GaugesModule} from 'ng-canvas-gauges/lib';

import { AboutPage } from '../pages/about/about';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProgramDetailPage } from '../pages/programdetail/programdetail';
import { CycleDetailPage } from '../pages/cycle-detail-page/cycle-detail-page';
import { TimeEdit } from '../components/time-edit/time-edit';
import { IonicStorageModule } from '@ionic/storage';
import { UserData } from '../providers/user-data';
import { NativeAudio } from '@ionic-native/native-audio';
import { ProgramPage } from '../pages/program/program';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProgramPage,
    ProgramDetailPage,
    CycleDetailPage,
    HomePage,
    TabsPage,
  TimeEdit  ],
  imports: [
    BrowserModule,
    GaugesModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProgramPage,
    HomePage,
    TabsPage, TimeEdit,ProgramDetailPage,
    CycleDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    UserData,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {} 
  