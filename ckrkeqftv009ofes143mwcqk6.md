## Mocking an API request with Mock Service Worker and Typescript


![Card Image with black background and Mock Service Worker Logo with bold white text that says "Mock Service Worker Mocking Post Requests"](https://codybontecou.com/images/MSW-Meta.png)

# Mocking an API request with Mock Service Worker and Typescript

> Testing software is essential to the development cycle of building applications. A strong test suite gives the developer(s) a sense of freedom to organize and refactor the codebase as needed without fear of unknowingly breaking something.

<HeaderMeta :author=$frontmatter.author :date=$frontmatter.date />

I'm using [Blogflow.io](https://github.com/CodyBontecou/blogflow.io/) as a means to learn Typescript while simultaneously building a tool to help automate distributing blog posts throughout the web.

A large portion of this application requires integrating 3rd party APIs to communicate with services such as Medium, Hashnode, Reddit, etc.

It's tough to test against 3rd party APIs. We don't want to hit their endpoints every time we run our test suite. Instead, we choose to mock the response, making the assumption that given specific inputs, they API will output a specific response.

[Mock Service Worker (MSW)](https://mswjs.io/) provides a simple way to intercept these API calls so that our tests aren't hitting 3rd party endpoints and interacting with live data.

## Setup and Installation

I was going to walk you through setting MSW up but they provide such clear [documentation](https://mswjs.io/docs/getting-started/install) that I think doing anything besides linking you to them would be an injustice.

You're welcome to view my [repo](https://github.com/CodyBontecou/blogflow.io) if you would like to see how I set it up in my project alongside packages like dotenv and Typescript.

## Mocking Medium's API

Everything below assumes you followed the [Setup and Installation](#installation) or have an understanding of MSW.

In order to mock Medium's Create a Post request, I checked their API [here](https://github.com/Medium/medium-api-docs#32-publications).

They provide an example response:

```js
HTTP/1.1 201 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": "e6f36a",
    "title": "Liverpool FC",
    "authorId": "5303d74c64f66366f00cb9b2a94f3251bf5",
    "tags": ["football", "sport", "Liverpool"],
    "url": "https://medium.com/@majelbstoat/liverpool-fc-e6f36a",
    "canonicalUrl": "http://jamietalbot.com/posts/liverpool-fc",
    "publishStatus": "public",
    "publishedAt": 1442286338435,
    "license": "all-rights-reserved",
    "licenseUrl": "https://medium.com/policy/9db0094a1e0f"
  }
```

Mocking this with MSW was simple. It was nearly a copy paste:

```ts
//  src/mocks/handlers.ts

import { rest } from 'msw'

export const handlers = [
1. rest.post('https://api.medium.com/*', (req, res, ctx) => {
    return res(
2.    ctx.status(201),
3.    ctx.json({
        data: {
          id: 'e6f36a',
          title: 'Liverpool FC',
          authorId: '5303d74c64f66366f00cb9b2a94f3251bf5',
          tags: ['football', 'sport', 'Liverpool'],
          url: 'https://medium.com/@majelbstoat/liverpool-fc-e6f36a',
          canonicalUrl: 'http://jamietalbot.com/posts/liverpool-fc',
          publishStatus: 'public',
          publishedAt: 1442286338435,
          license: 'all-rights-reserved',
          licenseUrl: 'https://medium.com/policy/9db0094a1e0f',
        },
      })
    )
  }),
]
```

1. I set this handler to intercept POST requests to any URL that starts with `https://api.medium.com/*`.

   The `*` represents a wildcard meaning anytime my application attempts to send a POST request to a URL starting with https://api.medium.com/, it will intercept it and return the provided response at 3.

2. We are setting the HTTP response status code we'd like to test against.
3. This is where we define the JSON response that we wish to be returned from the POST request.

## Edge cases

Certain packages require additional configuration. These are primarily [jest](https://jestjs.io/) issues rather than MSW, but I ran into them while setting this up. I decided to document it incase anyone else runs into these issues like I did.

### [dotenv](https://github.com/motdotla/dotenv)

Within your `jest.config.ts` file, make sure you have the following:

```js
// jest.config.ts
module.exports = {
  setupFiles: ['dotenv/config'],
}
```

### setupTests file

You'll need to set up your jest tests to listen, reset, and close the MSW server.

If you use Create React App, you may already have a file named `src/setupTests.js`.

Otherwise, you'll need to create a setup file yourself.

Then, add in the following code:

```ts
// src/setupTests.js
import { server } from './mocks/server.js'

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
```

This sets your Jest testing environment up to start the MSW server, reset it, and close it after different stages of the Jest lifecycle.

You'll then want to add a line to your `jest.config.ts` file:

```ts
// jest.config.ts
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
```

### Error: ENOENT: no such file or directory, open "file"

I'm reading markdown files in Blogflow. Before writing my tests, I was using relative paths like so:

```js
const data = matter(readFile('./file.md'))
```

My tests didn't like that and threw the error `Error: ENOENT: no such file or directory, open "file"`

[This](https://stackoverflow.com/a/59179782/6642089) Stackoverflow post explained I needed to use `_dirname`. This code now looks like the snippet below. Now my tests and code run as expected.

```js
const data = matter(readFile(__dirname + '/file.md'))
```

## Conclusion

This is all fairly new to me, but I believe there is value in this sort of testing.

One immediate case is mocking response's that are loaded into components. It's tough to get every state through live data. It's much easier to mock certain HTTP status codes and response objects that will change the way a component is rendered.

---

I hope this article was helpful. Let me know if you have any questions, comments, or suggestions on Twitter [@codybontecou](https://twitter.com/CodyBontecou)

<SimpleNewsletter />
<Post />
