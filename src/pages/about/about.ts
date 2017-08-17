import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  title = "";
  value: number = 0;
  animationDuration: number = 0;
  animationStarted: boolean = false;

  @ViewChild('radialG') radialGauge;

  constructor(public navCtrl: NavController) {  }

  start() {
window.setInterval(() => {
    this.value += 1;
     if (this.value >= 100) {
      this.value = 0;
    }
    this.title =  this.value.toString();
    }, 100);

   // this.radialGauge.gauge.Animation.animate(null,null);
    if (!this.animationStarted) {
      this.radialGauge.gauge.addListener('animationEnd', (evt) => this.animationEnd());
      this.animationStarted = true;
    }
  }
  animationEnd() {
    console.log("Animation end");
 
   // this.value += 10;
    if (this.value >= 100) {
      this.value = 0;
    }
  }

  stop() {
    // this.animationDuration = 0;
    this.value = 0;
  }
}
