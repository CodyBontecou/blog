---
type: 'post'
title: 'Building a VueJS component to estimate the expected reading time of an article.'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2020-07-05
description: The estimated reading time has become prevalent in most major spaces that provides articles and reading materials. Build this functionality into your site using a VueJS component.
category: tutorials
dropdown: 'VueJS'
tags:
  - VuePress
  - JavaScript
  - CSS
  - Refactor
  - Vue
  - Medium
meta:
  - name: og:image
    content: https://codybontecou.com/images/header-meta-component.png
  - name: og:image:alt
    content: Code preview of the time to read article component.
  - name: og:title
    content: Building a VueJS component to estimate the expected reading time of an article.
  - name: twitter:title
    content: Building a VueJS component to estimate the expected reading time of an article.
  - name: twitter:text:title
    content: Building a VueJS component to estimate the expected reading time of an article.
canonicalUrl: https://codybontecou.com/reading-time-vuejs-component.html
---

<h1 class="text-4xl font-semibold">VueJS component to estimate the reading time of an article.</h1>

> The estimated reading time has become prevalent in most major spaces that provides articles and reading materials. I decided to look into how to calculate it myself and found it's quite simple.

<p class="mt-8 font-semibold text-gray-800">A big thank you to Michal Burrows' <a href="https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l" target="_blank">post</a> for providing me with the baseline of this source code.</p>

## Steps to estimate the reading time

1. You get the container of the content that you wish to read.
1. Count all of the words
1. Provide average words read per minute by your target audience.
1. Divide the number of words by the average words per minute.

## Code Example

When placed into a VueJS component, it looks like this:

```vue
<template>
  <span> {{ timeToRead }} minute read </span>
</template>

<script>
function readingTime(text) {
  const wpm = 225
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}

export default {
  data() {
    return {
      timeToRead: undefined,
    }
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.timeToRead = readingTime(this.text)
  },
}
</script>
```
