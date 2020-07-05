import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProducts } from  './products';
import {catchError, tap, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = 'http://localhost:3500/northwind';

  constructor(private _http:HttpClient) { }

  getProducts():Observable<IProducts[]> {
    var response = this._http.get<IProducts[]>(this.url)
    .pipe(
      tap(items => console.log(items)),
      catchError(this.handleError),
    )

    return response
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
