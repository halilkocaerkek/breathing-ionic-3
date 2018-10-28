import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AboutPage } from '../about/about';
import { ProgramPage } from '../program/program';
import { HomePage } from '../home/home';
import { Tabs } from "ionic-angular";


@Component({ templateUrl: 'tabs.html', selector: 'page-tabs' })
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ProgramPage;
   @ViewChild(Tabs) tabs;

  constructor(public storage: Storage ) {
  
  }

 public select(index: number) {
    this.tabs.select(index);
  }

}
