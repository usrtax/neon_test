#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var binU64, main, sleep, u64Bin;

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

(async() => {
  var n, results;
  console.log(main());
  return;
  n = 0;
  results = [];
  while (true) {
    main();
    if (n++ % 10000 === 0) {
      gc();
      await sleep();
      results.push(console.log(n, Deno.memoryUsage()));
    } else {
      results.push(void 0);
    }
  }
  return results;
})();
