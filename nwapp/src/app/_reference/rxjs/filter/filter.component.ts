import { Component, OnInit } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    of(1,2,3,4,5).pipe(
      /*
       * filter only emits values that pass the provided condition
       */
       filter(value => value > 2)
     ).subscribe(console.log);
     
     const keyup$ = fromEvent(document, 'keyup');
     
     const keycode$ = keyup$.pipe(
       map((event: any) => event.code)
     );
     /*
      * For instance, in this example I am using the stream
      * of keycode events to create a stream of ONLY enter events
      * using the filter operator.
      */
     const enter$ = keycode$.pipe(
       filter(code => code === 'Enter')
     );
     
     enter$.subscribe(console.log);
  }

}
