---
type: post
title: Post to Dev, Hashnode, and Medium using their APIs
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2020-07-13
description: Generate posts on Dev, Hashnode, and Medium using the same markdown source file to simultaneously post on all three platforms using their REST and Graphql APIs.
dropdown: NodeJS
tags:
  - VuePress
  - JavaScript
  - CSS
  - Refactor
  - vue
  - Medium
  - Personal Blog
  - Software Tutorials
meta:
  - name: og:title
    content: Post to Dev, Hashnode, and Medium using their APIs
  - name: og:image
    content: https://codybontecou.com/images/automate-blog-posts-meta.png
  - name: og:image:alt
    content: Large hero image showing Dev, Hashnode, and Medium's logos
  - name: twitter:title
    content: Post to Dev, Hashnode, and Medium using their APIs
  - name: twitter:text:title
    content: Post to Dev, Hashnode, and Medium using their APIs
canonicalUrl: https://codybontecou.com/programmatically-posting-to-your-favorite-blogs
topics:
  - vuepress
  - javascript
  - nodejs
  - blogging
  - automation
created_at: 2024-10-31T14:26
last_modified: 2024-12-31T08:58
---

> The goal of this article is to help you connect to each of these site's APIs in order to programmatically post, update, and enjoy with these services.

Writing a single markdown file for my personal blog and copy and pasting it into these other blogging platforms isn't too challenging... until I need to edit something. A simple type change requires me to load four different sites, navigating through their wildly different UI, in order to make simple changes.

> This gets old fast.

**We're developers. It's much more fun and beneficial to automate these repetitive tasks.**

## Medium API

> Documentation - [https://github.com/Medium/medium-api-docs](https://github.com/Medium/medium-api-docs)

### Getting the authentication token

1. Login to Medium
1. Navigate to Integration tokens
1. Enter description for your token and click the get integration token button

| ![Generate Integration Token](https://codybontecou.com/images/get-medium-integration-token.png) |
| :---------------------------------------------------------------------------------------------: |
|                               _Medium's integration token panel_                                |

This will generate a token that will be included within requests to Medium's API.

### Getting the authenticated user’s details

Medium provides the endpoint `GET https://api.medium.com/v1/me` to get the authenticated user data.

Here's an example request using NodeJS:

```js
fetch('https://api.medium.com/v1/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer <AUTHENTICATION TOKEN HERE>',
  },
})
  .then(res => res.json())
  .then(res => console.log(JSON.stringify(res)))
```

Within the data returned from this endpoint is an `id`. You will want to save this ID value because it will be required to create a Medium article using NodeJS.

### Programmatically creating a Medium article

Now that we have the authentication token and ID, we can use the endpoint `POST https://api.medium.com/v1/users/<authorId>/posts`. The documentation posted above goes into detail on what parameters are required and/or available.

This endpoint accepts either markdown or HTML. You need to explicitly set the `contentFormat` field to either `markdown` or `html`.

Here's an example of a request using NodeJS:

```js
fetch('https://api.medium.com/v1/users/<USER-ID>/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer <REPLACE WITH TOKEN GENERATED ABOVE>',
  },
  body: JSON.stringify({
    title: 'Liverpool FC',
    contentFormat: 'markdown',
    content: '# You can put Markdown here.\n***\nSee what it looks like?',
    canonicalUrl: 'http://jamietalbot.com/posts/liverpool-fc',
    tags: ['football', 'sport', 'Liverpool'],
    publishStatus: 'public',
  }),
})
  .then(res => res.json())
  .then(res => console.log(JSON.stringify(res)))
```

If this returned a 201 status code, you should now be able to see your post on [Medium.com](https://medium.com)

### Available Endpoints:

Here's a list of the available endpoints:

**Getting the authenticated user’s details:**

`GET https://api.medium.com/v1/me`

**Listing the user’s publications:**

`GET https://api.medium.com/v1/users/<userId>/publications`

**Fetching contributors for a publication:**

`GET https://api.medium.com/v1/publications/<publicationId>/contributors`

**Creating a post:**

`POST https://api.medium.com/v1/users/<authorId>/posts`

**Creating a post under a publication:**

`POST https://api.medium.com/v1/publications/<publicationId>/posts`

**Uploading an image:**

`POST https://api.medium.com/v1/images`

Unfortunately, Medium's public API is fairly limited. We can create and get posts, but the ability to programmatically edit them is not there yet. I hope this eventually changes, giving the programmer better tools to work with them,

## dev.to API

> Documentation - [https://docs.forem.com/api/](https://docs.forem.com/api/)

### Getting the authentication token

This will require a dev.to account. Navigate to their [docs](https://docs.forem.com/api/#section/Authentication) and follow the instructions to get the authentication token.

### Creating an dev.to article using their API

Their documentation is far more extensive than Medium's public API. Their docs for this endpoint are [here](https://docs.forem.com/api/#operation/createArticle). If you click the article dropdown arrow, you can see all of the parameters that they accept. You can

#### Example request using NodeJS:

```js
fetch('https://dev.to/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': '<AUTHENTICATION TOKEN HERE>',
  },
  body: JSON.stringify({
    article: {
      title: 'Hello, World!',
      published: true,
      content: '# You can put Markdown here.\n***\n',
      tags: ['discuss', 'help'],
      series: 'Hello series',
    },
  }),
})
  .then(res => res.json())
  .then(res => console.log(JSON.stringify(res)))
```

## Hashnode API

> Documentation - [https://api.hashnode.com/](https://api.hashnode.com/)

Hashnode's API is a GraphQL API unlike the REST APIs we worked with in Medium and dev.to.

They have a few blogposts within their [blog](https://engineering.hashnode.com/) discussing their public API, but they were posted in 2019 so a handful of things discussed within the articles have been deprecated such as the `GLOBAL` and `FOR_ME` FeedType's. Give them a read if you want to understand things a bit better, but keep in mind that a lot of the parameters have been deprecated.

### Getting the authentication token

You can create/revoke them from Hashnode settings. Login to your account, go to the developer settings, and generate a new token.

| ![Generate Hashnode Auth Token](https://codybontecou.com/images/hashnode-auth-token.png) |
| :--------------------------------------------------------------------------------------: |
|                              _Generate Hashnode Auth Token_                              |

### Documentation

I've found the source of truth to be within their [GraphQL Playground](https://api.hashnode.com/). You'll need to click around their playground to see what endpoints are available as well as the expected inputs.

| ![Hashnode API Playground](https://codybontecou.com/images/graphql-playground.png) |
| :--------------------------------------------------------------------------------: |
|                        _Hashnode's GraphQL Api Playground_                         |

| ![Hashnode Documentation Navigation](https://codybontecou.com/images/hashnode-doc-navigation.png) |
| :-----------------------------------------------------------------------------------------------: |
|                                _Hashnode Documentation Navigation_                                |

#### Example request using NodeJS:

```js
fetch('https://api.hashnode.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: '<AUTHENTICATION TOKEN HERE>',
  },
  body: JSON.stringify({
    query:
      'mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }',
    variables: {
      input: {
        title: 'What are the e2e testing libraries you use ?',
        contentMarkdown: '# You can put Markdown here.\n***\n',
        tags: [
          {
            _id: '56744723958ef13879b9549b',
            slug: 'testing',
            name: 'Testing',
          },
        ],
        coverImageURL:
          'https://codybontecou.com/images/header-meta-component.png',
      },
    },
  }),
})
  .then(res => res.json())
  .then(res => console.log(JSON.stringify(res)))
```

## Conclusion

Now that we can programmatically post to these three sites, we can build out an application that allows dynamic inputs, such as a file reader to pass a `.md` file to the requests `content` and `contentMarkdown` parameters, editing posts, and many other things. We

Keep an eye out. I plan on spending some time building out an interface for Dev Bloggers to be able to do just that. It's not fun manually editing the same text in each post across four different sites. I hope to solve that problem.

Good luck!

Let me know what you think of this article through Twitter [@codybontecou](https://twitter.com/CodyBontecou)
