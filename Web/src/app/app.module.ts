import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppComponent } from './app.component';
import { DimRedPlotComponent } from './dimredplot/dimredplot.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ScaleLinear, ScaleBand, ScalePoint, ScaleTime } from 'd3-scale';
import { BaseType } from 'd3-selection';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NgxSpinner, NgxSpinnerModule } from "ngx-spinner"; 
import { GoogleChartsModule } from 'angular-google-charts';
import { MatSidenavModule } from '@angular/material/sidenav'
import {MatNativeDateModule} from '@angular/material/core';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [
    AppComponent,
    DimRedPlotComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgxChartsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    NgxSliderModule,
    MatMenuModule,
    MatSelectModule,
    NgxSpinnerModule,
    GoogleChartsModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatSliderModule,
    RouterModule.forRoot([
      {path: '', component: DimRedPlotComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
