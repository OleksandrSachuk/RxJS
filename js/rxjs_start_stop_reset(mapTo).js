const startButton = document.querySelector('.startButton');
const stopButton = document.querySelector('.stopButton');
const resetButton = document.querySelector('.resetButton');
const label = document.querySelector('h4');

const start$ = Rx.Observable.fromEvent(startButton, 'click');
const stop$ = Rx.Observable.fromEvent(stopButton, 'click');
const reset$ = Rx.Observable.fromEvent(resetButton, 'click');
const interval$ = Rx.Observable.interval(1000);

const data = { count: 0 };
const inc = (acc) => ({ count: acc.count + 1 });
const reset = (acc) => data;

const intervalThatStop$ = interval$
  .takeUntil(stop$);

const incOrReset$ = Rx.Observable.merge(
  intervalThatStop$.mapTo(inc),
  reset$.mapTo(reset),
);

start$
  .switchMapTo(incOrReset$)
  .startWith(data)
  .scan((acc, curr) => curr(acc))
  .subscribe((x) => label.textContent = x.count);