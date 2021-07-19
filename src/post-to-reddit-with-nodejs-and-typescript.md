---
title: 'Post to Reddit using its API'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2020-07-18
description: Interacting with Reddit through their API. In this post I discuss how to use snoowrap to post to Reddit and specific subreddits.
meta:
  - name: og:title
    content: Post to Reddit using its API
  - name: og:description
    content: Interacting with Reddit through their API. In this post I discuss how to use snoowrap to post to Reddit and specific subreddits.
  - name: og:image
    content: https://codybontecou.com/images/typescript-with-reddit-meta.png
  - name: og:image:alt
    content: Illustration of a man with a baret waving his hands with Reddit and Typescript logos above him
  - name: twitter:title
    content: Post to Reddit using its API
  - name: twitter:text:title
    content: Post to Reddit using its API

canonicalUrl: https://codybontecou.com/programmatically-tweeting-with-nodejs
---

![Illustration of a man with a baret waving his hands with Reddit and Typescript logos above him](https://codybontecou.com/images/typescript-with-reddit-meta.png)

# Create Reddit Posts with NodeJS and Typescript

> This post is for **day 2** of my [#100DaysOfCode](https://twitter.com/hashtag/100DaysOfCode?src=hashtag_click). In this post I'll be discussing how to programmatically post to Reddit using NodeJS and Typescript.

<HeaderMeta :author=$frontmatter.author :date=$frontmatter.date />

## Getting Authenticated

Getting an authentication token for Reddit is complicated.

If you have a **business** and plan on this token generating income, follow [this form](https://docs.google.com/forms/d/e/1FAIpQLSezNdDNK1-P8mspSbmtC2r86Ee9ZRbC66u929cG2GX0T9UMyw/viewform).

For **personal** use, navigate to your Reddit [apps](https://www.reddit.com/prefs/apps) and scroll to the bottom of the page. You should see a grey button that says "create another app...". Click the button and fill out the form. Successfully submitting this form should generate

![Reddit developer application information. Includes your client ID and client Secret needed for API calls](https://codybontecou.com/images/reddit-developer-app-info.png)

## Laying the Foundations of Your App

[Github Repo](https://github.com/CodyBontecou/post-to-reddit-with-typescript) to follow along

_Make sure you have [NodeJS](https://nodejs.org/en/) installed_

_I prefer [yarn](https://yarnpkg.com/), but you can use npm instead if you prefer_

Copy this `package.json` file and run `yarn install` to install the dependencies.

```json
{
  "name": "reddit-post",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "ts-node index.ts"
  },
  "devDependencies": {
    "ts-node": "^10.1.0",
    "typescript": "^4.3.5"
  },
  "dependencies": {
    "dotenv": "^10.0.0",
    "snoowrap": "^1.23.0"
  }
}
```

### Packages explained:

- [ts-node](https://github.com/TypeStrong/ts-node) is a handy tool for executing Typescript files without having to first compile to Javascript.
- [Typescript](https://www.typescriptlang.org/) superset of Javascript. I'm simply using it to try to become more comfortable with it in day-to-day projects.
- [dotenv](https://github.com/motdotla/dotenv#readme) to safely manage .env variables and your auth tokens.
- [snoowrap](https://github.com/not-an-aardvark/snoowrap) provides a simple interface to access every reddit API endpoint.

### Create a .env file

.env files are used as a best practice to keep secret keys (such as our authentication tokens) off of GitHub. Make sure to have a `.gitignore` file and add `.env` to it.

The `.env` file should look like this:

```js
username = '<REDDIT USERNAME>'
password = '<REDDIT PASSWORD>'
clientId = 'CLIENT_ID'
clientSecret = 'CLIENT SECRET'
```

Just make sure you replace the `<>` text with the tokens Twitter provided you.

**Make sure you do not commit your .env file to Github or any other version control systems.** These tokens are very important, and should not be shared with anyone!

## Performing the POST request

1. Create an index.ts file in your project root
2. Import the packages you installed earlier

```js
const snoowrap = require('snoowrap')
require('dotenv').config()
```

3. Create config object to organize your Reddit configuration variables

```js
const config = {
  username: process.env.username,
  password: process.env.password,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
}
```

4. Create a function that sends out a POST request to [Reddit's endpoint](https://www.reddit.com/dev/api#POST_api_submit) `/api/submit` with the title, link, and subreddit parameters.

```js
function postLink(title: string, link: string, subreddit: string) {
  const r = new snoowrap({
    userAgent: 'Whatever',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: config.username,
    password: config.password,
  })
  r.getSubreddit(subreddit).submitLink({
    title: title,
    url: link,
    sendReplies: true,
  })
}
```

#### Explained:

```js
const r = new snoowrap({
  userAgent: 'Whatever',
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  username: config.username,
  password: config.password,
})
```

This snippet of code is creating a new `snoowrap` instance that connects to the Reddit service.

```js
r.getSubreddit(subreddit).submitLink({
  title: title,
  url: link,
  sendReplies: true,
})
```

`getSubreddit`: Generates a `Subreddit` object. You can read more about this object [here](https://not-an-aardvark.github.io/snoowrap/Subreddit.html).

`submitLink`: Creates a new link submission on this subreddit with the title provided, url of the link, and any other options that the snoowrap api allows, such as the `sendReplies` option that allows replies to the post to send replies to the authenticated user's inbox.

5. Make the request

Now add

```js
postLink(
  'Post to Reddit with NodeJS and Typescript',
  'https://codybontecou.com/post-to-reddit-with-nodejs-and-typescript.html',
  'webdev'
)
```

with the parameters you want to use at the bottom of `index.ts`.

Once you are ready, type `yarn dev` into your projects terminal. If all is good, you should be able to see your post is now on Reddit!

---

I hope this article was helpful, let me know if you have any questions, comments, or suggestions on Twitter [@codybontecou](https://twitter.com/CodyBontecou)

<SimpleNewsletter />
<Post />
