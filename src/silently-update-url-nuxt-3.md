---
type: 'post'
title: 'Silently Update URL in Nuxt 3'
author: { 'name': 'Cody Bontecou', 'image': 'https://codybontecou.com/images/cody-abstract.jpeg' }
date: 2022-02-14
description: Update your URL using vue-router within Nuxt 3 so that your page does not refresh on variable change.
category: tutorials
dropdown: 'NuxtJS'
tags:
  - Vuejs
  - Vue
  - Vite
  - Javascript
  - NuxtJS
meta:
  - name: og:title
    content: Silently Update URL in Nuxt 3
  - name: og:description
    content: Update your URL using vue-router within Nuxt 3 so that your page does not refresh on variable change.
  - name: og:image
    content: https://codybontecou.com/images/dynamic-search-queries-meta.png
  - name: og:image:alt
    content: Silently Update URL in Nuxt 3
  - name: og:title
    content: Silently Update URL in Nuxt 3
  - name: twitter:title
    content: Silently Update URL in Nuxt 3
  - name: twitter:text:title
    content: Silently Update URL in Nuxt 3
canonicalUrl: https://codybontecou.com/silently-update-url-nuxt-3.html
---

# Silently Update URL in Nuxt 3

> We often need to update a query parameter like `?search=hello` within our URL without refreshing the page. I'll quickly show you how to do that using Nuxt 3.

## Collecting User Input

For this tutorial, I'll be using a simple `<input>` field with `v-model` to gather the query parameter.

```html
<!-- pages/example.vue -->
<template>
  <input v-model="twitchStreamer" />
</template>
```

`twitchStreamer` is now a [reactive variable](https://vuejs.org/guide/extras/reactivity-in-depth.html) that we can work with within `setup()`.

```js
// pages/example.vue
<script>
  setup() {
    const twitchStreamer = ref('')

    return { twitchStreamer }
</script>
```

## Nuxt 3's useRouter()

> I'm not sure what differences there are between Nuxt 2 and Nuxt 3, but so far there haven't been any.

Within `setup()`, call the auto-imported functions `useRouter()` to gain access to the `router` object.

```js
// pages/example.vue
<script>
  setup() {
    const router = useRouter()
    const twitchStreamer = ref('')

    return { twitchStreamer }
</script>
```

## Connecting v-model input to our URL

Now, set up a watcher to watch our `twitchStreamer` v-model value so that every time it's value is updated, a bit of code is ran.

```js
// pages/example.vue
<script>
  setup() {
    const router = useRouter()
    const twitchStreamer = ref('')

    watch(twitchStreamer, (twitchStreamer, previous) => {
      router.push({
        path: '/test',
        query: { streamer: twitchStreamer },
      })
    })

    return { twitchStreamer }
</script>
```

Every time the twitchStreamer value is changed, we push to our URL using [vue-router](https://router.vuejs.org/guide/essentials/navigation.html) with the updated query.

The query parameter of `.push` takes in a key and value. The key in this example is `streamer`.

Because of this, the url that is updated will look like `/test?streamer=` with the `twitchStreamer` value beind after the = sign.

## What about when you refresh or navigate?

There's a bit more to this topic but I decided to write a separate article [here](https://codybontecou.com/using-url-query-params-in-nuxt-3.html). Be sure to check if out if you are interested in how to deal with the query param on page refresh or direct navigation.

## Final code snippet

```html
<!-- pages/example.vue -->
<template>
  <input v-model="twitchStreamer" />
</template>

<script>
  setup() {
    const router = useRouter()
    const twitchStreamer = ref('')

    watch(twitchStreamer, (twitchStreamer, previous) => {
      router.push({
        path: '/test',
        query: { streamer: twitchStreamer },
      })
    })

    return { twitchStreamer }
</script>
```

![Silently Update URL in Nuxt 3](https://codybontecou.com/images/update-url.gif)
