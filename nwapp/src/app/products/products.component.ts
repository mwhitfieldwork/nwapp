import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductsService }from './products.service';
import {IProducts } from './products';

//dialog 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog'
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';

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
    'email',
    'rating',
    'edit'
  ];

  product:IProducts[];
  errorMessage:any;
  dataSource: MatTableDataSource<IProducts>
  productID:number;
  stars:string[] = [];
  index:number
  starList:any[]  = [];

  constructor(private _productsService: ProductsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(){
    this._productsService.getProducts()
    .subscribe(products => { 
      let ratedProducts = this.addRating(products)    
      this.product = ratedProducts;
      this.dataSource = new MatTableDataSource<IProducts>(ratedProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },
    error => this.errorMessage = <any>error)
  }

  editProduct(product:IProducts){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.product
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = 500;
    dialogConfig.maxHeight = 500;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    });
  }

  addRating(products:IProducts[]){
    products.forEach(x => x.rating = this.getRandomInt(1,100))
    console.log(products)
    return products;
  }

  getRandomInt(min, max):number {
    return parseFloat((Math.random() * (max - min)) + min);
  }

  getStars(score:number){
    let percent = Math.round(score);
    let remainder = 0;
    let LimitOf100PercentRatings = 5;
    let evenDivisorLimit = 4;
    let ratingFullCapacityNumb = 100
    this.stars = [];
    let temp = percent/20;
    let evenDivisors = temp > LimitOf100PercentRatings ? LimitOf100PercentRatings : temp ;
    let moduloRemainder = (((percent % 20) / 20) *100).toString() +'%';
    let modulo = (((percent % 20) / 20) *100);
    
    if(modulo != 0){
      remainder = 5 - evenDivisors;
    }
    
    for(let s=0; s<evenDivisors; s++){
    this.index = s;
      if(s <= evenDivisorLimit){
        this.stars.push('100%');
      }else{
        return this.stars;
      }
    }
    
    
    if(this.index < evenDivisorLimit ){
      this.stars.push(moduloRemainder);
    }
    
    if(modulo < ratingFullCapacityNumb && this.stars.length < 5){
    let otherstars = LimitOf100PercentRatings - this.stars.length;
      for(let m=0; m<otherstars; m++){
      this.stars.push('0%')
      }
    }
    this.starList.push(this.stars);
    return this.stars;
    }
    
    getFill(i){
    return 'url(#F1g' + i + ')';
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit{
  customerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:any, private fb:FormBuilder) {}

    ngOnInit(){
      console.log(this.data)
      this.customerForm = this.fb.group({
        productName: ['',[Validators.required, Validators.minLength(50)]],
        company: ['',[Validators.required, Validators.maxLength(50)]],
        title: ['',[Validators.required, Validators.maxLength(50)]],
      })

      //Edit or Create
      if(this.data.id == 0) {
        //this.initializeProduct();
      }else{
        this.getProductInfo(this.data.id);
      }
    }

    getProductInfo(id:number){
      this.customerForm.setValue({
        productName: this.data.productName,
        price: this.data.price,
        description: this.data.description,
      })
    }

    save(){

    }

    deleteProduct(){}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
