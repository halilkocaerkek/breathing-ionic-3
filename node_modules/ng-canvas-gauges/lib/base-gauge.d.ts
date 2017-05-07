/// <reference types="canvas-gauges" />
import { NgZone, ElementRef, OnInit } from '@angular/core';
import * as CanvasGauges from 'canvas-gauges';
export declare abstract class BaseGauge<T extends CanvasGauges.BaseGauge, T2 extends CanvasGauges.GenericOptions> implements OnInit {
    private el;
    zone: NgZone;
    canvas: ElementRef;
    options: T2;
    gauge: T;
    constructor(el: ElementRef, zone: NgZone);
    abstract ngOnInit(): any;
    getOptions(): T2;
    ngAfterViewChecked(): void;
}
