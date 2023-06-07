import { Component, OnInit, TemplateRef, HostListener, ViewChild, ViewChildren, QueryList, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { TsneCoordinatesService } from '../services/tsnecoordinates.service';
import { TsneCoordinate } from '../models/tsneCoordinate';
import { HistologiesService } from '../services/histologies.service';
import { Chart, ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartType, LegendItem, ScatterDataPoint } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import zoomPlugin from "chartjs-plugin-zoom";
import { ColorHelperService } from '../services/colorhelper.service';
import * as Color from 'color';
import { ScatterDataPointCustom } from '../interfaces/ScatterDataPointCustom';

Chart.register(zoomPlugin);

@Component({
  selector: 'app-survival',
  templateUrl: './survival.component.html',
  styleUrls: ['./survival.component.css']
})

export class SurvivalComponent implements OnInit {

  // chart responsive height / width
  innerWidth: number = window.innerWidth;
  innerHeight: number = window.outerHeight;
  view: [number, number] = [this.innerWidth <= 800 ? this.innerWidth - 60 : 1200, 700];
  chartWidth: number;
  chartHeight: number;

  // chart settings
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  lineChartType: ChartType = 'line';
  lineChartData: ChartData<'line'> = {
    datasets: [],
  };
  dataset: ChartDataset<'line'>;
  lineChartOptions: ChartConfiguration['options'] = {

  };

  constructor(
    public spinnerService: NgxSpinnerService, 
    public tsneCoordinateService: TsneCoordinatesService
    ) {

  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.setChartDimensions();

    this.spinnerService.hide();
  }

  setChartDimensions() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.chartWidth = (this.innerWidth * 0.7) - 65;
    this.chartHeight = (this.innerHeight * 0.98) - 135;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setChartDimensions();
  }

}
