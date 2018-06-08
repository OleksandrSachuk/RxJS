// const source = Rx.Observable.interval(1000).take(5);
//
// const subscription1 = source.subscribe(x => console.log('subscription1: ', x));
//
// setTimeout(() => {
//   const subscription2 = source.subscribe(x => console.log('subscription2: ', x));
// }, 2000);

// --0--1--2--3--4| subscription1

//       --0--1--2--3--4| subscription2


const source = Rx.Observable.interval(1000).take(5).share();

const subscription1 = source.subscribe(x => console.log('subscription1: ', x));

setTimeout(() => {
  const subscription2 = source.subscribe(x => console.log('subscription2: ', x));
}, 2000);

// --0--1--2--3--4| subscription1

//       --2--3--4| subscription2
