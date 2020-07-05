import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule } from '../shared/material/material.module';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';
import { ReactiveFormsModule } from '@angular/forms';


const routes:Routes = [
  {path: '', component: ProductsComponent}
]

@NgModule({
  declarations: [ProductsComponent],
  providers:[ProductsService],
  exports:[ProductsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
