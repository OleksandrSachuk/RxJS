const { interval } = rxjs;
const { take, throttleTime, last } = rxjs.operators;

const observable =
  interval(100)
    .pipe(
      take(10),
      throttleTime(500),
      last(),
    )
    .subscribe({
      next: x => console.log('x', x),
      error: error => console.log('error', error),
      complete: () => console.log('complete'),
    });