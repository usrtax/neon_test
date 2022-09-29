#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var main, minute, sleep;

import rt from '..';

main = () => {
  return rt.run('test memoryUsage', 'leak or not');
};

sleep = () => {
  return new Promise((resolve) => {
    return setTimeout(resolve, 10);
  });
};

minute = () => {
  return parseInt(new Date() / 6e4);
};

(async() => {
  var begin, leak, n, pre, results, rss;
  console.log(main());
  begin = minute();
  ({rss} = process.memoryUsage());
  n = 0;
  pre = 0;
  results = [];
  while (true) {
    main();
    if (n++ % 10000 === 0) {
      gc();
      await sleep();
      leak = parseInt((process.memoryUsage().rss - rss) / 1024 / 1024);
      if (leak !== pre) {
        pre = leak;
        results.push(console.log(minute() - begin, 'minute', n, 'loop', 'leak', leak, 'MB'));
      } else {
        results.push(void 0);
      }
    } else {
      results.push(void 0);
    }
  }
  return results;
})();
