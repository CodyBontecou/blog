---
type: post
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2023-02-05
last_modified_date: 2023-02-05
title: Set up Google Analytics with Vitepress
description: Just add the script provided by Google to your HTML head, and it should work.
slug: set-up-google-analytics-with-vitepress
dropdown: Vitepress
topics:
  - blogging
  - vitepress
  - vue
meta:
  - name: og:description
    content: Just add the script provided by Google to your HTML head, and it should work.
  - name: og:image
    content: https://codybontecou.com/images/set-up-google-analytics-with-vitepress.png
  - name: og:image:alt
    content: Just add the script provided by Google to your HTML head, and it should work.
  - name: og:title
    content: Set up Google Analytics with Vitepress
  - name: twitter:title
    content: Set up Google Analytics with Vitepress
  - name: twitter:text:title
    content: Set up Google Analytics with Vitepress
canonicalUrl: https://codybontecou.com/set-up-google-analytics-with-vitepress
created_at: 2024-10-31T14:26
last_modified: 2025-06-26T08:00
---

## Code Snippet

Change all `G-XXXXXXXXXX` with the Tracking ID provided by [Google Analytics (GA4)](https://support.google.com/analytics/answer/9539598?hl=en).

```ts
// src/.vitepress
module.exports = {
  head: [
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
      },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-XXXXXXXXXX');",
    ],
  ],
}
```

## Resources

- [Github discussion](https://github.com/vuejs/vitepress/issues/1131)
- [Find your "G-" ID](https://support.google.com/analytics/answer/9539598?hl=en)

## Inspiration

If you're coming from [Vuepress](https://vuepress.vuejs.org/), you may be used to the plugin system that provides features such as Google Analytics. Vitepress is (arguably) simpler in this regard. Just add the script provided by Google to your HTML head, and it should work.
