---
type: post
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2023-02-04
last_modified_date: 2023-02-04
title: Disable Video Recording on Cypress Run
description: This is a configuration I tend to forget and have to rely on tracking down the answer. I'm not the biggest fan of the Cypress docs, so I decided to write this up for personal reference and figured some of you might find it helpful too.
slug: disable-video-recording-on-cypress-run
dropdown: Cypress
meta:
  - name: og:description
    content: This is a configuration I tend to forget and have to rely on tracking down the answer. I'm not the biggest fan of the Cypress docs, so I decided to write this up for personal reference and figured some of you might find it helpful too.
  - name: og:image
    content: https://codybontecou.com/images/disable-video-recording-on-cypress-run.png
  - name: og:image:alt
    content: This is a configuration I tend to forget and have to rely on tracking down the answer. I'm not the biggest fan of the Cypress docs, so I decided to write this up for personal reference and figured some of you might find it helpful too.
  - name: og:title
    content: Disable Video Recording on Cypress Run
  - name: twitter:title
    content: Disable Video Recording on Cypress Run
  - name: twitter:text:title
    content: Disable Video Recording on Cypress Run
canonicalUrl: https://codybontecou.com/disable-video-recording-on-cypress-run.html
topics:
  - Cypress
  - Configuration
created_at: 2024-10-31T14:26
last_modified: 2024-11-09T21:19
---

## Code Snippet

```ts
// cypress.config.ts
import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
})
```

## Resources

- [Github Discussion](https://github.com/cypress-io/cypress/issues/867)
- [Docs](https://docs.cypress.io/guides/references/configuration#Videos)

## Inspiration

This is a configuration I tend to forget and have to rely on tracking down the answer. I'm not the biggest fan of the Cypress docs, so I decided to write this up for personal reference and figured some of you might find it helpful too.
