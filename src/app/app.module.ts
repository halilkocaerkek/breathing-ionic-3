import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';

import {MyApp} from './app.component';

// Pages
import {AboutPage} from '../pages/about/about';
import {ProgramPage} from '../pages/program/program';
import {ProgramDetailPage} from '../pages/programdetail/programdetail';
import {CycleDetailPage} from '../pages/cycle-detail-page/cycle-detail-page';

import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// components
import {TimeEdit} from '../components/time-edit/time-edit' ;

import {LinearGaugeComponent, RadialGaugeComponent} from '../../node_modules/ng-canvas-gauges/component';
import {UserData} from "../providers/user-data";

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ProgramPage,
        HomePage,
        TabsPage,
        ProgramDetailPage,
        CycleDetailPage,
        LinearGaugeComponent,
        RadialGaugeComponent,
        TimeEdit
    ],
    imports: [
        BrowserModule, IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ProgramPage,
        HomePage,
        TabsPage,
        ProgramDetailPage,
        CycleDetailPage
    ],
    providers: [
        StatusBar,
        SplashScreen,

           UserData,
         {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        }
    ]
})
export class AppModule {}
