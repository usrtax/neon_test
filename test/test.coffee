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

minute = =>
  parseInt new Date()/6e4

do =>
  console.log u64Bin(1234567890)
  console.log main()
  #return
  begin = minute()
  {rss} = process.memoryUsage()
  n = 0
  pre = 0
  loop
    main()
    if n++%10000 == 0
      gc()
      await sleep()

      leak = parseInt((process.memoryUsage().rss-rss)/1024/1024)
      if leak != pre
        pre = leak
        console.log(
          minute()-begin,'minute'
          n,'loop'
          'leak', leak,'MB'
        )
  return
