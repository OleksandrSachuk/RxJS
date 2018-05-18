const foo = Rx.Observable.of(1, 2, 3, 4, 5);

function multiplyBy (multiplier) {
  const source = this;

  const result = Rx.Observable.create((observer) => {
    source.subscribe(
      (x) => observer.next(x * multiplier),
      (err) => observer.error(err),
      () => observer.complete(),
    )
  });

  return result;
};

Rx.Observable.prototype.multiplyBy = multiplyBy;

const bar = foo.multiplyBy(100);

bar.subscribe(
  (x) => console.log('next: ', x),
  (err) => console.log('err: ', err),
  () => console.log('done. '),
);