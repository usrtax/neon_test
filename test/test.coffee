#!/usr/bin/env coffee

> ..:rt

main = =>
  rt.hello(1.5,3.2)

sleep = =>
  new Promise((resolve) => setTimeout(resolve, 10))

n = 0
loop
  main()
  if n++%10000 == 0
    gc()
    await sleep()
    console.log(n,Deno.memoryUsage())
