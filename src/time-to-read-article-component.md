---
title: 'Building a VueJS component to render the expected reading time.'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2020-07-03
description: This is the page description that will be used
category: tutorials
tags:
  - VuePress
  - JavaScript
  - CSS
  - Refactor
  - Vue
  - Medium
image: /assets/img/time-to-read component.ca659223.png
canonicalUrl: https://codybontecou.com/reading-time-vuejs-component.html
---

<span class="text-4xl font-semibold">VueJS component to estimate the reading time of an article.</span>

> The estimated reading time has become prevalent in most major spaces that provides articles and reading materials. I decided to look into how to calculate it myself and realized it's quite simple.

<HeaderMeta :author=$frontmatter.author :date=$frontmatter.date />

<img class="mt-8 rounded" src="./assets/images/time-to-read-component.png" alt="Portrait of Cody Bontecou" />

<p class="mt-8 font-semibold text-gray-800">A big thank you to Michal Burrows' <a href="https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l" target="_blank">post</a> for providing me with the baseline of this source code.</p>

1. You get the container of the content that you wish to read.
1. Count all of the words
1. Provide average words read per minute by your target audience.
1. Divide the number of words by the average words per minute.

When placed into a VueJS component, it looks like this:

```html
<template>
  <span> {{ timeToRead }} minute read </span>
</template>

<script>
  export default {
    computed: {
      timeToRead() {
        const text = document.getElementById('container').innerText
        const words = text.trim().split(/\s+/).length
        const wpm = 225

        return Math.ceil(words / wpm)
      },
    },
  }
</script>
```
