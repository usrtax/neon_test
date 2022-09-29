#!/usr/bin/env coffee

> ..:rt

main = =>
  rt.hello(
    '1.23242425',
    '3.2323222'
  )

sleep = =>
  new Promise((resolve) => setTimeout(resolve, 10))

do =>
  {rss} = process.memoryUsage()
  console.log main()
  n = 0
  loop
    main()
    if n++%10000 == 0
      gc()
      await sleep()
      console.log(n,process.memoryUsage().rss-rss/1024/1024)
