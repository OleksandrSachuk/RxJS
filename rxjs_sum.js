const source = Rx.Observable
  .interval(400)
  .take(9)
  .map(i => ['1', '2', '3', 'foo'][i]);

const result = source
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y);

result.subscribe(x => console.log(x));