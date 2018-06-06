const startButton = document.querySelector('.startButton');
const halfButton = document.querySelector('.halfButton');
const quarterButton = document.querySelector('.quarterButton');
const stopButton = document.querySelector('.stopButton');
const resetButton = document.querySelector('.resetButton');
const label = document.querySelector('h4');

const start$ = Rx.Observable.fromEvent(startButton, 'click');
const half$ = Rx.Observable.fromEvent(halfButton, 'click');
const quarter$ = Rx.Observable.fromEvent(quarterButton, 'click');
const stop$ = Rx.Observable.fromEvent(stopButton, 'click');
const reset$ = Rx.Observable.fromEvent(resetButton, 'click');

const data = { count: 0 };
const inc = (acc) => ({ count: acc.count + 1 });
const reset = (acc) => data;

const starters$ = Rx.Observable.merge(
  start$.mapTo(1000),
  half$.mapTo(500),
  quarter$.mapTo(250),
);

const intervalActions = (time) => Rx.Observable.merge(
  Rx.Observable.interval(time)
    .takeUntil(stop$).mapTo(inc),
  reset$.mapTo(reset),
);

starters$
  .switchMap(intervalActions)
  .startWith(data)
  .scan((acc, curr) => curr(acc))
  .subscribe((x) => label.textContent = x.count);