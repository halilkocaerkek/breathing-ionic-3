/// <reference types="canvas-gauges" />
import { NgZone, ElementRef } from '@angular/core';
import { BaseGauge } from './base-gauge';
import * as CanvasGauges from 'canvas-gauges';
export declare class LinearGaugeComponent extends BaseGauge<CanvasGauges.LinearGauge, CanvasGauges.LinearGaugeOptions> {
    constructor(el: ElementRef, zone: NgZone);
    ngOnInit(): void;
}
