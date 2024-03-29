import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-creation-operators',
  templateUrl: './creation-operators.component.html',
  styleUrls: ['./creation-operators.component.css']
})
export class CreationOperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete!')
};

/*
 *  Create streams from events, given target and event name.
 *  from Event turns interactions (keyups, or click Events)  into Observables
 */
const source$ = fromEvent(document, 'keyup');

/*
 *  Each subscription creates it's own execution path between
 *  observable and observer (also known as unicasting). So, in this case,
 *  every subscription will wire up a new event listener.
 */
const subOne = source$.subscribe(observer);
const subTwo = source$.subscribe(observer);

setTimeout(() => {
  /*
   *  For long running observables we need to make sure to clean
   *  them up when we are finished to prevent memory leaks and
   *  unintended behavior. In this case, we are cleaning up
   *  one subscription but not the other, leaving it active.
   *  We will learn different techniques to automate this
   *  process in an upcoming lesson.
   */
  console.log('unsubscribing');
  subOne.unsubscribe();
}, 3000);
  }

}
