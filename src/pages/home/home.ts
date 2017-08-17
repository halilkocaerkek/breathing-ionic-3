
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { UserData } from "../../providers/user-data";
import { ProgramModel } from "../../app/models/program-model";
import { CycleModel } from '../../app/models/cycle-model';
//import { LinearGaugeComponent, RadialGaugeComponent } from '../../../node_modules/ng-canvas-gauges/component';

@Component({ selector: 'page-home', templateUrl: 'home.html' })
export class HomePage {
  selectedProgram: ProgramModel;
  selectedCycle: CycleModel;

  programTitle = "";
  cycleTitle = "";

  value: number = 0;
  cycleCount = 0;
  title = "";

  activeCycle: CycleModel;

  stepInhale: number = 1;
  stepHold: number = 2;
  stepExhale: number = 3;
  stepSustain: number = 4;
  activeStep: number = this.stepInhale;
  inhaleMin: number;
  holdMin: number;
  exhaleMin: number;
  sustainMin: number;

  animationDuration : number;

  cycleIndex = 0;
  repeatCount = 0;

  highlights: string = '[ {"from": 0, "to": 60, "color": "rgba(100,120, 60, .3)"}, {"from": 60, "to": 12' +
  '0, "color": "rgba(255, 0, 0, .3)"},{"from": 120, "to": 260, "color": "rgba(0,120' +
  ', 255, .3)"}, {"from": 260, "to": 360, "color": "rgba(60, 0, 0, .3)"} ]';

  @ViewChild('radialG') radialGauge ;
  options: Object;
  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public navParams: NavParams,
    public events: Events
  ) {

    events.subscribe('program:selected', (_selectedProgram) => {
      if (_selectedProgram) {
        this.selectedProgram = _selectedProgram;
        userData.setSelectedProgram(this.selectedProgram);
        this.initScreen();
      }
    });

    if (this.selectedProgram) {
      this.initScreen();
    }
    this.options = {
      minValue: -100,
      maxValue: 100,
      animationRule: 'linear',
      animationDuration: 500,
      width: 300,
      height: 300,
      highlights: false,
      majorTicks: [-100, -50, 0, 50, 100],
      minorTicks: 10,
      exactTicks: true,
      animatedValue: true
    }
    this.options['data-type'] = "linear-gauge";
  }

  ngOnInit() {
    
    //window.setInterval(() => {
     //this.value = -100 + Math.random() * 200;
     // Object.assign(this.options, {
      //  colorPlate: 'green'
      //});
    //}, 1000);
    
  }

  initScreen() {
    this.programTitle = this.selectedProgram.title;
    this.selectedCycle = this.selectedProgram.items[0].cycle;
    this.highlights = CycleModel.gethighlights(this.selectedCycle, this.selectedProgram.timeUnit);

    this.activeCycle = this.selectedCycle;
    this.cycleIndex = 0;
    this.setScycle();
  }

  // gaugue 360 lık bir cycle alıyor.
  // ben toplam cycle süresini hesaplayıp, buna göre 1 birime karşılık gelen ms değerini kullanmalıyım.

  increaseTimer() {

    let ratio = CycleModel.getRatio(this.selectedCycle, this.selectedProgram.timeUnit);
    this.value += Math.round(ratio);

    if (this.activeStep == this.stepInhale) {
      this.inhaleMin--;
      if (this.inhaleMin <= 0) {
        this.activeStep = this.stepHold;
        this.title = "Hold";
        return;
      }
    }

    if (this.activeStep == this.stepHold) {
      this.holdMin--;
      if (this.holdMin <= 0) {
        this.activeStep = this.stepExhale;
        this.title = "Exhale";
        return;
      }
    }

    if (this.activeStep == this.stepExhale) {
      this.exhaleMin--;
      if (this.exhaleMin <= 0) {
        this.activeStep = this.stepSustain;
        this.title = "Sustain";
        return;
      }
    }

    if (this.activeStep == this.stepSustain) {
      this.sustainMin--;
      if (this.sustainMin <= 0) {
        this.completeCycle();
        return;
      }
    }

    if (this.value > 360) {
      this.value = 0;
      this.cycleCount++;
    }
  }

  gaugeAnimation()
  {
    this.value = this.inhaleMin;
    this.animationDuration = this.value;
    this.radialGauge.gauge.addListener('animationEnd', function() {
      console.log( ': animationEnd!');
        
    if (this.activeStep == this.stepInhale) {
       
        this.activeStep = this.stepHold;
        this.title = "Inhale";
        return;
    }

    if (this.activeStep == this.stepHold) {
      this.value +=  this.holdMin;
      this.animaitionDuration = this.holdMin;
        this.activeStep = this.stepExhale;
        this.title = "Hold";
        return;
    }

    if (this.activeStep == this.stepExhale) {
      this.value +=  this.exhaleMin;
      this.animationDuration = this.exhaleMin;
        this.activeStep = this.stepSustain;
        this.title = "Exhale";
        return;
    }

    if (this.activeStep == this.stepSustain) {
      this.value +=  this.sustainMin
      this.animationDuration = this.sustainMin ;
      this.title = "Sustain";
        this.completeCycle();
        return;
    }
        });

  }

  timer: any;
  start() {
    this.gaugeAnimation();
   // this.timer = setInterval(() => { this.increaseTimer(); }, 1000);
   // var type = this.radialGauge.gauge.canvas.element.getAttribute('data-type');
    if(this.radialGauge)
    {
         
          /*this.radialGauge.gauge.addListener('animate', function(percent, value) {
              console.log( 'animate : percent : ' + percent + ' value : ' +value );
          });
          this.radialGauge.gauge.addListener('beforePlate', function() {
              console.log( ': animationEnd!');
          });
            */
            

    }
  }
  stop() {
    clearInterval(this.timer);
    this.initScreen();
  }

  completeCycle() {
    this.repeatCount--;

    if (this.repeatCount <= 0) {
      this.cycleIndex++;

      if (this.cycleIndex >= this.selectedProgram.items.length) {
        alert("Program Completed..");
        this.stop();
        return;
      }

      this.selectedCycle = this.selectedProgram.items[this.cycleIndex].cycle;
      this.activeCycle = this.selectedProgram.items[this.cycleIndex].cycle;
      this.setScycle();
    }

  }

  setScycle() {

    this.inhaleMin = this.activeCycle.inhale * this.selectedProgram.timeUnit;
    this.holdMin = this.activeCycle.hold * this.selectedProgram.timeUnit;
    this.exhaleMin = this.activeCycle.exhale * this.selectedProgram.timeUnit;
    this.sustainMin = this.activeCycle.sustain * this.selectedProgram.timeUnit;
    this.activeStep = this.stepInhale;
    this.title = "Inhale";
    this.value = 0;
    this.repeatCount = this.selectedProgram.items[this.cycleIndex].repeat;
    this.cycleTitle = this.activeCycle.title + " - " + this.getPattern(this.activeCycle) + " - " + this.getTimes(this.activeCycle);
  }

  getPattern(c: CycleModel) {
    return CycleModel.getString(c);
  }

  getCycleLenght(c) {
    return CycleModel.getLenght(c, this.selectedProgram.timeUnit);
  }

  getTimes(c) {
    return CycleModel.getTimes(c, this.selectedProgram.timeUnit);
  }
}
