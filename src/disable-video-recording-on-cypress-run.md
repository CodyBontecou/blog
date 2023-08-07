---
type: 'post'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2023-02-04
last_modified_date: 2023-02-04
title: &title 'Disable Video Recording on Cypress Run'
description: &description "This is a configuration I tend to forget and have to rely on tracking down the answer. I'm not the biggest fan of the Cypress docs, so I decided to write this up for personal reference and figured some of you might find it helpful too."
slug: 'disable-video-recording-on-cypress-run'
dropdown: 'Cypress'
tags:
  -  #blog
  -  #cypress
meta:
  - name: og:description
    content: *description
  - name: og:image
    content: https://codybontecou.com/images/disable-video-recording-on-cypress-run.png
  - name: og:image:alt
    content: *description
  - name: og:title
    content: *title
  - name: twitter:title
    content: *title
  - name: twitter:text:title
    content: *title
canonicalUrl: https://codybontecou.com/disable-video-recording-on-cypress-run.html
---

# {{ $frontmatter.title }}

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
