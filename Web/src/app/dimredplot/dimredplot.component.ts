import { Component, OnInit, TemplateRef, HostListener, ViewChild } from '@angular/core';
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
import { HistologiesService } from '../services/histologies.service';
import { MatSidenav } from '@angular/material/sidenav';
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
    },
    tooltip: { isHtml: true }
  };
  chartStyle: string = "width: 100%;";


  histologyList: string[] = [];
  selectedHistologies: string[] = [];

  allTsneCoordinates: TsneCoordinate[] = [];

  constructor(
    public spinnerService: NgxSpinnerService, 
    public tsneCoordinateService: TsneCoordinatesService,
    public histologieService: HistologiesService) {

  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.innerWidth = window.innerWidth;

    this.tsneCoordinateService.fetchAll()
      .subscribe(tsneCoordinates => {

        this.allTsneCoordinates = tsneCoordinates;
        this.chartData = [];

        tsneCoordinates.forEach(coord => {
          this.chartData.push([ coord.X, coord.Y ]);
        });

        console.log(tsneCoordinates);

        this.spinnerService.hide();

      });

    this.histologieService.fetchAll()
      .subscribe(histologies => {

        histologies.forEach(hist => {
          this.histologyList.push(hist.Name);
        });

      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.view = [this.innerWidth <= 800 ? this.innerWidth - 60 : 800, 300]
    console.log(this.view);
  }

  onMouseOver($event: any) {
    
    if ($event.column != null && $event.row != null) {
      console.log($event);

      var hoveredCoord = this.allTsneCoordinates[$event.row];
      console.log(hoveredCoord);

      // this is not the angular way, but I grew tired of scouring
      // through bad documentation to customize the tooltips
      let tooltipItemList = document.getElementsByClassName('google-visualization-tooltip-item-list')[0];

      // histology
      var histologyLi = document.createElement("li");
      histologyLi.setAttribute("class", "google-visualization-tooltip-item");

      var histologySpan = document.createElement("span");
      histologySpan.setAttribute("style", "font-family:Arial;font-size:16px;color:#000000;opacity:1;margin:0;font-style:none;text-decoration:none;font-weight:none;");
      histologySpan.innerText = 'Histology: ' + hoveredCoord.Patient.Histology.Name;

      histologyLi.appendChild(histologySpan);
      tooltipItemList.appendChild(histologyLi);

      // location
      var locationLi = document.createElement("li");
      locationLi.setAttribute("class", "google-visualization-tooltip-item");

      var locationSpan = document.createElement("span");
      locationSpan.setAttribute("style", "font-family:Arial;font-size:16px;color:#000000;opacity:1;margin:0;font-style:none;text-decoration:none;font-weight:none;");
      locationSpan.innerText = 'Location: ' + hoveredCoord.Patient.Location.Name;

      locationLi.appendChild(locationSpan);
      tooltipItemList.appendChild(locationLi);
    }
  }

}
