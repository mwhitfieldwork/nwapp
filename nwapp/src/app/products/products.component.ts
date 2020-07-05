import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductsService }from './products.service';
import {IProducts } from './products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'displayName',
    'company',
    'title',
    //'firstName',
    //'lastName',
    'email',
    // 'commonId',
    //'team',
    //'subTeam',
    //'hireDate',
    //'fax',
    //'state',
    //'zip',
    //'officeCity',
    //'teamLeader',
    //'office',
    //'pictureUrl',
    //'extension',
    //'skills',
    //'interests',
    'edit'
  ];
  product:IProducts[];
  errorMessage:any;
  dataSource: MatTableDataSource<IProducts>
  productID:number;

  constructor(private _productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  

  getProducts(){
    this._productsService.getProducts()
    .subscribe(products => {
      this.dataSource = new MatTableDataSource<IProducts>(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => this.errorMessage = <any>error)
  }

  editProduct(product:IProducts){

  }

}
