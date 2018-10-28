
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { UserData } from "../../providers/user-data";
import { ProgramModel } from "../../app/models/program-model";
import { CycleModel } from '../../app/models/cycle-model';
import { NativeAudio } from "@ionic-native/native-audio";
//import { LinearGaugeComponent, RadialGaugeComponent } from '../../../node_modules/ng-canvas-gauges/component';

@Component({ selector: 'page-home', templateUrl: 'home.html' })
export class HomePage {
  selectedProgram: ProgramModel;
  selectedCycle: CycleModel;

  programTitle = "";
  cycleTitle = "";

  value: number = 0;
  maxValue: number = 0;
  //cycleCount = 0;
  title = "";
  status = "";

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

  animationDuration: number = 1000;

  cycleIndex = 0;
  repeatCount = 0;

  highlights: string = '';

  @ViewChild('radialG') radialGauge;

  options: Object;
  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public navParams: NavParams,
    public events: Events,
    public nativeAudio: NativeAudio
  ) {

    this.nativeAudio.preloadSimple('bass', 'assets/sounds/bass.mp3').then(this.onSuccess, this.onError);


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
  }

  onSuccess()
  { }

  onError( )
  {   }

  initScreen() {
    this.programTitle = this.selectedProgram.title;
    this.selectedCycle = this.selectedProgram.items[0].cycle;
    this.highlights = CycleModel.gethighlights(this.selectedCycle, this.selectedProgram.timeUnit);
    this.activeCycle = this.selectedCycle;
    this.cycleIndex = 0;
    this.repeatCount = this.selectedProgram.items[this.cycleIndex].repeat;
    this.setScycle();
  }

  // gaugue 360 lık bir cycle alıyor.
  // ben toplam cycle süresini hesaplayıp, buna göre 1 birime karşılık gelen ms değerini kullanmalıyım.

  increaseTimer() {

    if (this.activeStep == this.stepInhale) {
      this.inhaleMin--;
      if (this.inhaleMin <= 0) {
        this.nativeAudio.play('bass').then(this.onSuccess, this.onError);
        this.activeStep = this.stepHold;
        this.title = "Hold";
        return;
      }
    }

    if (this.activeStep == this.stepHold) {
      this.holdMin--;
      if (this.holdMin <= 0) {
        this.nativeAudio.play('bass').then(this.onSuccess, this.onError);
        this.activeStep = this.stepExhale;
        this.title = "Exhale";
        return;
      }
    }

    if (this.activeStep == this.stepExhale) {
      this.exhaleMin--;
      if (this.exhaleMin <= 0) {
        this.nativeAudio.play('bass').then(this.onSuccess, this.onError);
        this.activeStep = this.stepSustain;
        this.title = "Sustain";
        return;
      }
    }

    if (this.activeStep == this.stepSustain) {
      this.sustainMin--;
      if (this.sustainMin <= 0) {
        this.nativeAudio.play('bass').then(this.onSuccess, this.onError);
        this.activeStep = this.stepInhale;
        this.completeCycle();
        return;
      }
    }
  }

  timer: any;
  start() {
    this.timer = window.setInterval(() => {
      this.value += 1;
      //if (this.value >= this.maxValue) {
      // this.value = 0;
      //this.cycleCount++;
      //}
      //this.title = this.value.toString();
      this.increaseTimer();
    }, this.animationDuration);
  }

  stop() {
    clearInterval(this.timer);
    this.initScreen();
  }

  completeCycle() {

    this.repeatCount--;
    this.value = 0;
    this.status = "Complete Cycle " + this.cycleIndex.toString();
    if (this.repeatCount <= 0) {
      this.cycleIndex++;

      if (this.cycleIndex >= this.selectedProgram.items.length) {
        alert("Program Completed..");
        this.stop();
        return;
      }

      this.selectedCycle = this.selectedProgram.items[this.cycleIndex].cycle;
      this.activeCycle = this.selectedProgram.items[this.cycleIndex].cycle;
      this.repeatCount = this.selectedProgram.items[this.cycleIndex].repeat;
    }
    this.setScycle();
  }

  setScycle() {
    // this.animationDuration = CycleModel.getRatio(this.selectedCycle, this.selectedProgram.timeUnit)* 1000;
    // this.animationDuration = 1000;
    let ac: CycleModel = this.activeCycle;
    this.inhaleMin = (ac.inhale) * this.selectedProgram.timeUnit;
    this.holdMin = (ac.hold) * this.selectedProgram.timeUnit;
    this.exhaleMin = ac.exhale * this.selectedProgram.timeUnit;
    this.sustainMin = ac.sustain * this.selectedProgram.timeUnit;
    this.activeStep = this.stepInhale;
    this.title = "Inhale";
    this.value = 0;
    this.highlights = CycleModel.gethighlights(this.selectedCycle, this.selectedProgram.timeUnit);
    this.maxValue = this.getCycleLenght(ac);
    this.cycleTitle = ac.title + " - " + this.getPattern(ac) + " - " + this.getTimes(ac);
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
