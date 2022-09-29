#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var main, sleep;

import rt from '..';

main = () => {
  return rt.hello('1.23242425', '3.2323222');
};

sleep = () => {
  return new Promise((resolve) => {
    return setTimeout(resolve, 10);
  });
};

(async() => {
  var n, results, rss;
  ({rss} = process.memoryUsage());
  console.log(main());
  n = 0;
  results = [];
  while (true) {
    main();
    if (n++ % 10000 === 0) {
      gc();
      await sleep();
      results.push(console.log(n, process.memoryUsage().rss - rss));
    } else {
      results.push(void 0);
    }
  }
  return results;
})();
