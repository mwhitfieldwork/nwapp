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


const routes : Routes =  [
  {path:'products',
  loadChildren: './products/products.module#ProductsModule'},
  {path:'dashboard',
  loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path:'', redirectTo:'/dashboard', pathMatch:'full'}
]


@NgModule({
  declarations: [
    AppComponent
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
