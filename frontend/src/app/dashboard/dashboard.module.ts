import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    WrapperComponent,
    DashboardComponent,
    SecondComponent,
    ThirdComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HighchartsChartModule,
    ChartModule,
    HttpClientModule,
    // NG Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    FormsModule
  ]
})
export class DashboardModule { }