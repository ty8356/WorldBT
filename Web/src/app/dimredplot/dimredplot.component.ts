import { Component, OnInit, TemplateRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Gene } from '../models/gene';
import { GenesService } from '../services/genes.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Options } from '@angular-slider/ngx-slider';
import { NgxSpinnerService } from "ngx-spinner";
import { TsneCoordinatesService } from '../services/tsnecoordinates.service';
import { TsneCoordinate } from '../models/tsneCoordinate';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-dimredplot',
  templateUrl: './dimredplot.component.html',
  styleUrls: ['./dimredplot.component.css']
})
export class DimRedPlotComponent implements OnInit {

  innerWidth: number = window.innerWidth;

  view: [number, number] = [this.innerWidth <= 800 ? this.innerWidth - 60 : 1200, 700];

  // google chart settings
  chartData: any[] = [];
  chartType = ChartType.ScatterChart;
  chartOptions = {
    legend: 'none',
    width: 1200,
    height: 700,
    title: '',
    hAxis: { title: '' },
    vAxis: { title: '' },
    explorer: {
      maxZoomIn: 0.05,
      maxZoomOut: 1.5
    },
    pointSize: 4,
    chartArea: {
      top: 20,
      left: 50,
      width: '90%',
      height: '90%'
    }
  };
  chartStyle: string = "width: 100%;";

  constructor(public spinnerService: NgxSpinnerService, public tsneCoordinateService: TsneCoordinatesService) {


  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.innerWidth = window.innerWidth;

    this.tsneCoordinateService.fetchAll()
      .subscribe(tsneCoordinates => {

        this.chartData = [];

        tsneCoordinates.forEach(coord => {
          this.chartData.push([ coord.X, coord.Y ]);
        });

        this.spinnerService.hide();

      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.view = [this.innerWidth <= 800 ? this.innerWidth - 60 : 800, 300]
    console.log(this.view);
  }

}
