const button = document.querySelector('.button');
const label = document.querySelector('h4');

const clickStream = Rx.Observable.fromEvent(button, 'click');
const doubleClickStream = clickStream
  .buffer(() => clickStream.throttle(250))
  .map(arr => arr.length)
  .filter(len => len === 2);

doubleClickStream.subscribe(x => console.log(x));

doubleClickStream
  .throttle(1000)
  .subscribe(suggestion => {
    label.textContent = '-';
  });