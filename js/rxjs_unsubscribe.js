const source = Rx.Observable.create(observer => {
  const interval = setInterval(() => {
    observer.next(1);
  }, 1000);

  observer.complete();

  // Any cleanup logic might go here
  return function unsubscribe() {
    console.log('unsubscribe');
    clearInterval(interval);
  };

});

const subscription = source.subscribe(
  x => console.log('next: ', x),
  e => console.log('error: ', e),
  () => console.log('complete'));

subscription.unsubscribe();