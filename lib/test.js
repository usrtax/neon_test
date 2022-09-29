#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
var main, sleep;

import rt from '..';

main = () => {
  return rt.hello(1.5, 3.2);
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
