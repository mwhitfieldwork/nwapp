import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { ProductData } from './data/db';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CreationOperatorsComponent } from './_reference/rxjs/creation-operators.component';
import { OfOperatorsComponent } from './_reference/rxjs/of-operators/of-operators.component';
import { FromOperatorsComponent } from './_reference/rxjs/from-operators/from-operators.component';
import { TimeOperatorsComponent } from './_reference/rxjs/time-operators/time-operators.component';
import { MapComponent } from './_reference/rxjs/map/map.component';
import { FilterComponent } from './_reference/rxjs/filter/filter.component';
import { ReduceComponent } from './_reference/rxjs/reduce/reduce.component';
import { ScanComponent } from './_reference/rxjs/scan/scan.component';


const routes : Routes =  [
  {path:'products',
  loadChildren: './products/products.module#ProductsModule'},
  {path:'dashboard',
  loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path:'', redirectTo:'/dashboard', pathMatch:'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    CreationOperatorsComponent,
    OfOperatorsComponent,
    FromOperatorsComponent,
    TimeOperatorsComponent,
    MapComponent,
    FilterComponent,
    ReduceComponent,
    ScanComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    InMemoryWebApiModule.forRoot(ProductData,{ dataEncapsulation: false,
      passThruUnknownUrl: true }),
    ProductsModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
