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
  console.log main()
  {rss} = process.memoryUsage()
  n = 0
  pre = 0
  loop
    main()
    if n++%10000 == 0
      gc()
      await sleep()

      leak = Math.round((process.memoryUsage().rss-rss)/1024/1024)
      if leak != pre
        pre = leak
        console.log(
          n,
          leak
        )
