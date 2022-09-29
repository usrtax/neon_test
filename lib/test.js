#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var binU64, main, minute, sleep, u64Bin;

import rt from '..';

({u64Bin, binU64} = rt);

main = () => {
  return binU64(u64Bin(1234567890));
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
  var begin, leak, n, pre, rss;
  console.log(u64Bin(1234567890));
  console.log(main());
  return;
  begin = minute();
  ({rss} = process.memoryUsage());
  n = 0;
  pre = 0;
  while (true) {
    main();
    if (n++ % 10000 === 0) {
      gc();
      await sleep();
      leak = parseInt((process.memoryUsage().rss - rss) / 1024 / 1024);
      if (leak !== pre) {
        pre = leak;
        console.log(minute() - begin, 'minute', n, 'loop', 'leak', leak, 'MB');
      }
    }
  }
})();
