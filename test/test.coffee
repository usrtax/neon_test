#!/usr/bin/env coffee

> ..:rt

main = =>
  rt.run(
    'test memoryUsage',
    'leak or not'
  )

sleep = =>
  new Promise((resolve) => setTimeout(resolve, 10))

minute = =>
  parseInt new Date()/6e4

do =>
  console.log main()
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
          leak
        )
