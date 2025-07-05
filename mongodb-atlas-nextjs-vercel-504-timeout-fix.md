---
title: Mongodb Atlas Vercel 504 Timeout Fix
draft: false
ignore: false
topics:
  - nextjs
  - vercel
  - mongodb
  - atlas
  - rant
created_at: 2025-02-22T17:14
date: 2025-02-22T17:14
last_modified: 2025-02-22T20:25
---

I'm in the process of hooking a NextJS application up with [Payload CMS](https://payloadcms.com/). I decided to use MongoDB for this project because, well, I've never used it before so I figure, why not?

MongoDB has a cloud-hosting solution called [Atlas Database](https://www.mongodb.com/products/platform/atlas-database) with a free-tier that should be good enough for what I need.

So, I just need to point `DATABASE_URI` to the hosted Atlas Database URL, right and we should be good, right? Right?

In my local environment, this is the case. But when hosted on Vercel, you will probably get a `504 connection timeout` error with no additional context to the error.

It took me a quite a while to find out what the problem is. Until I came across this [Stackoverflow comment](https://stackoverflow.com/a/78439243). Vercel **requires** you to set your project up with their [MongoDB Atlas Integration](https://vercel.com/integrations/mongodbatlas). 

The setup is painless - just a few authentication forms and directing services around. It was really just figuring out this is where my error was coming from that was painful.

If you find yourself running into this problem, I hope this rant was able to help!