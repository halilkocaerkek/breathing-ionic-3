import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({selector: 'time-edit', templateUrl: 'time-edit.html'})
export class TimeEdit {

  @Input()min = 0;
  @Input()max = 100;
  @Input()itemLenght = 3;

  len : number  = 0 ; 
  counterValue  : number = 0;
  _name = "title";

  @Input()
  set name(name : string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
  get name() : string {return this._name;}

  @Output() counterChange = new EventEmitter();

  @Input()
  get counter() {
    return this.counterValue ;
  }

  set counter(v : number) {
     this.counterValue  = v;
    this.len = this.counterValue * this.itemLenght ;
    this
      .counterChange
      .emit(this.counterValue );
  }

  constructor() {}

}
