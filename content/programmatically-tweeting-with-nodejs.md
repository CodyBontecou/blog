---
type: post
title: Programmatically Tweeting with NodeJS
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2020-07-16
description: Interacting with Twitter through their API. In this post I discuss how to use twitter-lite to create and post a tweet.
dropdown: NodeJS
meta:
  - name: og:title
    content: Programmatically Tweeting with NodeJS
  - name: og:image
    content: https://codybontecou.com/images/tweeting-with-nodejs-og-image.png
  - name: og:image:alt
    content: Man sitting at computer overloaded by media. 100 Days of Code While Dopamine Fasting.
  - name: twitter:title
    content: Programmatically Tweeting with NodeJS
  - name: twitter:text:title
    content: Programmatically Tweeting with NodeJS
canonicalUrl: https://codybontecou.com/programmatically-tweeting-with-nodejs
topics:
  - nodejs
  - twitter
  - automation
created_at: 2024-10-31T14:26
last_modified: 2025-01-15T17:38
---

> This post is for **day 1** of my [#100DaysOfCode](https://twitter.com/hashtag/100DaysOfCode?src=hashtag_click). In this post I'll be discussing how to programmatically tweet to Twitter using NodeJS.

## Getting Authenticated

[Get a Twitter Developer Account](https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api)

You'll need to follow the instructions of the link above to create a develop account. This gives you access to creating a [project](https://developer.twitter.com/en/docs/projects/overview) and an [app](https://developer.twitter.com/en/docs/apps/overview).

You'll eventually find yourself within the Twitter Developer Dashboard where you can generate authentication tokens that will be essential to making requests.

![Screenshot of the Twitter Developer Dashboard](https://codybontecou.com/images/twitter-dev-dashboard.png)

## Laying the Foundations of Your App

[Github Repo](https://github.com/CodyBontecou/day-1-tweet-with-nodejs) to follow along

_Make sure you have [NodeJS](https://nodejs.org/en/) installed_

_I prefer [yarn](https://yarnpkg.com/), but you can use npm instead if you prefer_

1. Scaffold your project: `yarn init -y`
2. Download [twitter-lite](https://github.com/draftbit/twitter-lite) to interact with Twitter's API: `yarn add twitter-lite`
3. Download [dotenv](https://github.com/motdotla/dotenv#readme) to safely manage .env variables and your auth tokens: `yarn add dotenv`

Your `package.json` file should now look like this:

```json
{
  "name": "programmatic-tweeting-with-nodejs",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "dot-env": "^0.0.1",
    "twitter-lite": "^1.1.0"
  }
}
```

4. Create a .env file in your project root folder and add your tokens provided by Twitter's API

The `.env` file should look like this:

```js
consumer_key = '<CONSUMER KEY>'
consumer_secret = '<CONSUMER SECRET>'
access_token_key = '<ACCESS TOKEN>'
access_token_secret = '<ACCESS TOKEN>'
```

Just make sure you replace the `<>` text with the tokens Twitter provided you.

**Make sure you do not commit your .env file to Github or any other version control systems.** These tokens are very important, and should not be shared with anyone!

## Making the Post

1. Create an index.js file in your project root
2. Import the packages you installed earlier

```js
const twitter = require('twitter-lite')
require('dotenv').config()
```

3. Create a client to talk to Twitter with your config

```js
const client = new twitter(config)
```

4. Code the request

```js
client
  .post('statuses/update', { status: 'Hello World' })
  .then(result => {
    console.log('You successfully tweeted this : "' + result.text + '"')
  })
  .catch(console.error)
```

Step #4 is creating a POST request to [Twitter's endpoint](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update) `statuses/update` with the parameter `status = 'Hello World'`.

5. Make the request

Now type `node index.js` into your terminal and press enter. This will generate a Tweet with the text "Hello World".

---

I hope this article was helpful, let me know if you have any questions, comments, or suggestions on Twitter [@codybontecou](https://twitter.com/CodyBontecou)
