import {
    Component,
    OnChanges,
    AfterViewInit,
    Input,
    ElementRef,
    ViewChild
} from '@angular/core';
import { SPChartConfig } from './spchart-config';
import * as D3 from 'd3';
import * as Moment from 'moment';

@Input() config: Array<SPChartConfig>;