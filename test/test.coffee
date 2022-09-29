#!/usr/bin/env coffee

> ..:rt

{
  u64Bin
  binU64
} = rt

main = =>
  binU64 u64Bin(1234567890)


sleep = =>
  new Promise((resolve) => setTimeout(resolve, 10))

do =>
  console.log main()
  return
  n = 0
  loop
    main()
    if n++%10000 == 0
      gc()
      await sleep()
      console.log(n,Deno.memoryUsage())
