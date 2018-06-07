const source = Rx.Observable.create(observer => {
  const interval = setInterval(() => {
    observer.next(1);
  }, 1000);

  // Any cleanup logic might go here
  return () => {
    console.log('unsubscribe');
    clearInterval(interval);
  };

});

const subscription = source.subscribe(
  x => console.log('next: ', x),
  e => console.log('error: ', e),
  () => console.log('complete'));

setTimeout(() => subscription.complete(), 2000);

// setTimeout(() => subscription.unsubscribe(), 2000)