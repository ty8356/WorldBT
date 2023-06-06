import { Component, OnInit, TemplateRef, HostListener, ViewChild, ViewChildren, QueryList, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { TsneCoordinatesService } from '../services/tsnecoordinates.service';
import { TsneCoordinate } from '../models/tsneCoordinate';
import { HistologiesService } from '../services/histologies.service';
import { Chart, ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartType, LegendItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import zoomPlugin from "chartjs-plugin-zoom";
import { ColorHelperService } from '../services/colorhelper.service';
import * as Color from 'color';

Chart.register(zoomPlugin);

@Component({
  selector: 'app-dimredplot',
  templateUrl: './dimredplot.component.html',
  styleUrls: ['./dimredplot.component.css']
})

export class DimRedPlotComponent implements OnInit {

  innerWidth: number = window.innerWidth;
  innerHeight: number = window.outerHeight;
  view: [number, number] = [this.innerWidth <= 800 ? this.innerWidth - 60 : 1200, 700];
  chartWidth: number;
  chartHeight: number;
  filteredHistologies: number[] = [];
  private activeFilters: { [filterKey: string]: boolean } = {};
  isBeforeFilter: boolean = true;

  @Input() legendLabels: Array<string>;

  @Output() legendClick: EventEmitter<{
    [filterKey: string]: boolean;
  }> = new EventEmitter();

  // chart settings
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  scatterChartType: ChartType = 'scatter';
  scatterTooltipFooter = (tooltipItems: any[]) => {
    if (tooltipItems.length > 1) {

      var histString = 'Histology: ';
      var histologies: string[] = [];
      tooltipItems.forEach(x => {
        histologies.push(x.dataset.label);
      });

      var distinct = histologies.filter((value, index) => histologies.indexOf(value) === index);
      distinct.forEach(x => {

        histString += x;

        if (distinct.indexOf(x) !== distinct.length - 1) {
          histString += ', ';
        }

      });

      return histString;

    } 
    else {
      // console.log(tooltipItems);
      return 'Histology: ' + tooltipItems[0].dataset.label;
    }
  };
  scatterChartOptions: ChartConfiguration['options'] = {
    animation: {
      // duration: 0
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          stepSize: 5,
          color: '#A8A8A8'
        },
        grid: {
          tickColor: '#404040',
          borderColor: '#404040',
          color: '#404040'
        }
      },
      y: {
        ticks: {
          stepSize: 5,
          color: '#A8A8A8'
        },
        grid: {
          tickColor: '#404040',
          borderColor: '#404040',
          color: '#404040'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          footer: this.scatterTooltipFooter
        }
      },
      legend: {
        position: 'left',
        align: 'start',
        display: false,
        labels: {
          boxWidth: 15,
          color: '#A8A8A8'
        }
      },
      zoom: {
        pan: {
          enabled: true
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.05
          },
          mode: "xy"
        },
        limits: {
          x: {min: -100, max: 100},
          y: {min: -100, max: 100}
        }
      }
    }
  };
  scatterChartData: ChartData<'scatter'> = {
    datasets: [],
  };
  dataset: ChartDataset<'scatter'>;

  constructor(
    public spinnerService: NgxSpinnerService, 
    public tsneCoordinateService: TsneCoordinatesService,
    public histologieService: HistologiesService,
    public colorHelperService: ColorHelperService
    ) {

  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.chartWidth = (this.innerWidth * 0.7) - 65;
    this.chartHeight = (this.innerHeight * 0.98) - 135;

    var rainbowColors = this.colorHelperService.RainbowCreate(60);

    this.tsneCoordinateService.fetchAllGrouped()
      .subscribe(groups => {

        let i = 0;

        groups.forEach(group => {
          
          this.dataset = {
            data: [],
            label: group.Histology,
            pointRadius: 3,
            pointBackgroundColor: rainbowColors[i].hex(),
            backgroundColor: rainbowColors[i].hex(),
            pointBorderColor: rainbowColors[i].hex(),
            borderWidth: 0
          };

          group.TsneCoordinates.forEach(coord => {
            
            this.dataset.data.push({ x: coord.X, y: coord.Y });

          });

          this.scatterChartData.datasets.push(this.dataset);

          i++;

        });

        this.chart.chart?.update();

        this.spinnerService.hide();

      });
  }

  refreshChart() {
    for (var i = 0; i < (this.chart.chart?.data.datasets.length ?? 0); i++) {
      var meta = this.chart.chart?.getDatasetMeta(i);
      if (meta != undefined)
        meta.hidden = false;
    }

    this.isBeforeFilter = true;
    this.activeFilters = {};

    this.chart.chart?.update();
    this.chart.chart?.resetZoom();
  }

  public onLegendItemClick(e: Event, legendItem: LegendItem): void {
    // console.log(legendItem);
    this.isBeforeFilter = false;

    const filterKey = legendItem.text.replace(" ", "_");
    this.activeFilters[filterKey] = this.activeFilters[filterKey]
      ? false
      : true;

    this.legendClick.emit(this.activeFilters);

    console.log(this.activeFilters);

    var currentIndex = legendItem.datasetIndex;
    var chart = this.chart.chart;
    var currentState: any[] = [];
    if (chart == undefined) return;

    chart.data.datasets.forEach(function(e, i) {
      var meta = chart?.getDatasetMeta(i);
      currentState.push({ index: i, hidden: (meta?.hidden == null ? false : meta.hidden) });
    });

    var isCurrentlyHidden = currentState.filter(function (element, index, array) { 
      return (element.index == currentIndex); 
    })[0].hidden;

    var totalHiddenCount = currentState.filter(function (element, index, array) {
      return (element.hidden)
    }).length;

    // console.log(isCurrentlyHidden);
    // console.log(totalHiddenCount);

    chart.data.datasets.forEach(function(e, i) {
      var meta = chart?.getDatasetMeta(i);
      if (i === currentIndex) { // this is the one we clicked on
        if (!isCurrentlyHidden && totalHiddenCount === 0) {
          hideAllExcept([ i ]);
        }
        else if (!isCurrentlyHidden && totalHiddenCount > 0 && meta != undefined) {
          // console.log("hide individual");
          meta.hidden = true;
        }
        else if (isCurrentlyHidden) {
          var indeces: number[] = [];
          indeces.push(i);
          currentState.forEach(x => {
            if (x.hidden == false) {
              indeces.push(x.index);
            }
          });

          hideAllExcept(indeces);
        }
        else {
          unhideAll();
        }
      }
    });

    chart.update();

    function hideAll() {
      chart?.data.datasets.forEach(function(e, i) {
        var meta = chart?.getDatasetMeta(i);
        if (meta != undefined)
          meta.hidden = true;
      });
    }

    function hideAllExcept(indeces: number[]) {
      chart?.data.datasets.forEach(function(e, i) {
        var meta = chart?.getDatasetMeta(i);
        if (!indeces.includes(i) && meta != undefined) {
          meta.hidden = true;
        }
        else {
          if (meta != undefined) {
            meta.hidden = false;
          }
        }
      });
    }

    function unhideAll() {
      chart?.data.datasets.forEach(function(e, i) {
        var meta = chart?.getDatasetMeta(i);
        if (meta != undefined) {
          meta.hidden = false;
        }
      });
    }
  }

  public isItemFilterActive(item: LegendItem): boolean {
    const filterKey = item.text.replace(" ", "_");
    return this.activeFilters[filterKey];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.chartWidth = (this.innerWidth * 0.7) - 65;
    this.chartHeight = (this.innerHeight * 0.98) - 135;
  }

}
