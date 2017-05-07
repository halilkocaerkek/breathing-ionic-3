/// <reference types="canvas-gauges" />
import { NgZone, ElementRef } from '@angular/core';
import { BaseGauge } from './base-gauge';
import * as CanvasGauges from 'canvas-gauges';
export declare class RadialGaugeComponent extends BaseGauge<CanvasGauges.RadialGauge, CanvasGauges.RadialGaugeOptions> {
    constructor(el: ElementRef, zone: NgZone);
    ngOnInit(): void;
}
