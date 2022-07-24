import { Component, OnInit, TemplateRef, HostListener, ViewChild, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { TsneCoordinatesService } from '../services/tsnecoordinates.service';
import { TsneCoordinate } from '../models/tsneCoordinate';
import { HistologiesService } from '../services/histologies.service';
import { Chart, ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartType } from 'chart.js';
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
  view: [number, number] = [this.innerWidth <= 800 ? this.innerWidth - 60 : 1200, 700];
  chartWidth: number;
  filteredHistologies: number[] = [];

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
      return 'Histology: ' + tooltipItems[0].dataset.label;
    }
  };
  scatterChartOptions: ChartConfiguration['options'] = {
    animation: {
      // duration: 0
    },
    responsive: true,
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
        labels: {
          boxWidth: 15,
          color: '#A8A8A8'
        },
        onClick: function(e, legendItem) {
          var currentIndex = legendItem.datasetIndex;
          var chart = this.chart;
          var currentState: any[] = [];
          chart.data.datasets.forEach(function(e, i) {
            var meta = chart.getDatasetMeta(i);
            currentState.push({ index: i, hidden: (meta.hidden == null ? false : meta.hidden) });
          });

          var isCurrentlyHidden = currentState.filter(function (element, index, array) { 
            return (element.index == currentIndex); 
          })[0].hidden;

          var totalHiddenCount = currentState.filter(function (element, index, array) {
            return (element.hidden)
          }).length;

          console.log(isCurrentlyHidden);
          console.log(totalHiddenCount);

          chart.data.datasets.forEach(function(e, i) {
            var meta = chart.getDatasetMeta(i);
            if (i === currentIndex) { // this is the one we clicked on
              if (!isCurrentlyHidden && totalHiddenCount === 0) {
                hideAllExcept([ i ]);
              }
              else if (!isCurrentlyHidden && totalHiddenCount > 0) {
                console.log("hide individual");
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
            chart.data.datasets.forEach(function(e, i) {
              var meta = chart.getDatasetMeta(i);
              meta.hidden = true;
            });
          }

          function hideAllExcept(indeces: number[]) {
            chart.data.datasets.forEach(function(e, i) {
              var meta = chart.getDatasetMeta(i);
              if (!indeces.includes(i)) {
                meta.hidden = true;
              }
              else {
                meta.hidden = false;
              }
            });
          }

          function unhideAll() {
            chart.data.datasets.forEach(function(e, i) {
              var meta = chart.getDatasetMeta(i);
              meta.hidden = false;
            });
          }

          // var areAllOthersHidden = false;
          // var hiddenCount = 0;
          // chart.data.datasets.forEach(function(e, i) {
          //   var meta = chart.getDatasetMeta(i);

          //   currentState.push({ index: i, hidden: meta.hidden });

          //   if (i !== index && meta.hidden == true) {
          //     hiddenCount++;
          //   }
          // });
          // if (hiddenCount === chart.data.datasets.length - 1) {
          //   areAllOthersHidden = true;
          // }

          // console.log(currentState);

          // chart.data.datasets.forEach(function(e, i) {
          //   var meta = chart.getDatasetMeta(i);
          //   if (i !== currentIndex) { // these are the ones we didn't click on
          //     // if (areAllOthersHidden) {
          //     //   meta.hidden = false;
          //     // }
          //     // else {
          //     //   meta.hidden = true;
          //     // }
          //   }
          //   else { // this is the one we clicked on
          //     if (isCurrentlyHidden) {
          //       meta.hidden = false;
          //     }
          //   }
          // });

          // chart.update();

          // var index = legendItem.datasetIndex;
          // var ci = this.chart;
          // var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;       
          // var anyOthersAlreadyHidden = false;
          // var allOthersHidden = true;
        
          // // figure out the current state of the labels
          // ci.data.datasets.forEach(function(e, i) {
          //   var meta = ci.getDatasetMeta(i);
        
          //   if (i !== index) {
          //     if (meta.hidden) {
          //       anyOthersAlreadyHidden = true;
          //     } else {
          //       allOthersHidden = false;
          //     }
          //   }
          // });
        
          // // if the label we clicked is already hidden 
          // // then we now want to unhide (with any others already unhidden)
          // if (alreadyHidden) {
          //   ci.getDatasetMeta(index).hidden = false;
          // } else { 
          //   // otherwise, lets figure out how to toggle visibility based upon the current state
          //   ci.data.datasets.forEach(function(e, i) {
          //     var meta = ci.getDatasetMeta(i);
        
          //     if (i !== index) {
          //       // handles logic when we click on visible hidden label and there is currently at least
          //       // one other label that is visible and at least one other label already hidden
          //       // (we want to keep those already hidden still hidden)
          //       if (anyOthersAlreadyHidden && !allOthersHidden) {
          //         meta.hidden = true;
          //       } else {
          //         // toggle visibility
          //         meta.hidden = meta.hidden === false ? !meta.hidden : false;
          //       }
          //     } else {
          //       meta.hidden = false;
          //     }
          //   });
          // }
        
          // ci.update();
        }
      },
      zoom: {
        pan: {
          enabled: true
        },
        zoom: {
          wheel: {
            enabled: true
          },
          mode: "xy"
        },
        limits: {

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
    this.chartWidth = this.innerWidth * 0.85;

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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.chartWidth = this.innerWidth * 0.85;
  }

}
