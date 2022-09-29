#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var main, sleep;

import rt from '..';

main = () => {
  return rt.run('1.23242425', '3.2323222');
};

sleep = () => {
  return new Promise((resolve) => {
    return setTimeout(resolve, 10);
  });
};

(async() => {
  var leak, n, pre, results, rss;
  console.log(main());
  ({rss} = process.memoryUsage());
  n = 0;
  pre = 0;
  results = [];
  while (true) {
    main();
    if (n++ % 10000 === 0) {
      gc();
      await sleep();
      leak = Math.round((process.memoryUsage().rss - rss) / 1024 / 1024);
      if (leak !== pre) {
        pre = leak;
        results.push(console.log(n, leak));
      } else {
        results.push(void 0);
      }
    } else {
      results.push(void 0);
    }
  }
  return results;
})();
