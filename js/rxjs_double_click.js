const button = document.querySelector('.button');
const label = document.querySelector('h4');

const click$ = Rx.Observable.fromEvent(button, 'click');

const doubleClickStream = click$
  .buffer(click$.debounceTime(250))
  .map(a => a.length)
  .filter(x => x === 2);

doubleClickStream.subscribe(() => label.textContent = 'Double click!');

doubleClickStream
  .debounceTime(1000)
  .subscribe(() => label.textContent = 'Clear');