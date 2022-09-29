#!/usr/bin/env -S node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict
import rt from '..';

console.log(rt.hello(1.5, 3.2));
