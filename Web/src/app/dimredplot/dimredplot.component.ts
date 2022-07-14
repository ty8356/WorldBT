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

@Component({
  selector: 'app-dimredplot',
  templateUrl: './dimredplot.component.html',
  styleUrls: ['./dimredplot.component.css']
})
export class DimRedPlotComponent implements OnInit {

  innerWidth: number = window.innerWidth;

  view: [number, number] = [this.innerWidth <= 800 ? this.innerWidth - 60 : 1200, 700];
  bubbleData: any[];
  tempData: any[];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  yAxisLabel: string = 'y';
  showYAxisLabel: boolean = false;
  xAxisLabel: string = 'x';
  maxRadius: number = 1;
  minRadius: number = 1;

  constructor(public spinnerService: NgxSpinnerService, public tsneCoordinateService: TsneCoordinatesService) {


  }

  ngOnInit(): void {
    // this.spinnerService.show();
    this.innerWidth = window.innerWidth;

    this.tsneCoordinateService.fetchAll()
      .subscribe(tsneCoordinates => {

        this.tempData = [{
            name: '',
            series: []
        }]

        tsneCoordinates.forEach(x => {
          this.tempData[0].series.push({
            name: x.X.toString(),
            x: x.X,
            y: x.Y,
            r: 1
          });
        });

        this.bubbleData = this.tempData;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.view = [this.innerWidth <= 800 ? this.innerWidth - 60 : 800, 300]
    console.log(this.view);
  }

}
