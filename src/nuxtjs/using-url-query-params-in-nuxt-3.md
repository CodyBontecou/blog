---
type: 'post'
title: 'Using URL Query Params in Nuxt 3'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2022-2-15
description: Use Nuxt3's useRoute function to use URL parameters to determine state.
category: tutorials
tags:
  - Vuejs
  - Vue
  - Vite
  - Route
  - NuxtJS
meta:
  - name: og:title
    content: Using URL Query Params in Nuxt 3
  - name: og:description
    content: Use Nuxt3's useRoute function to use URL parameters to determine state.
  - name: og:image
    content: https://codybontecou.com/images/using-url-query-params-in-nuxt-3-meta.png
  - name: og:image:alt
    content: Using URL Query Params in Nuxt 3
  - name: og:title
    content: Using URL Query Params in Nuxt 3
  - name: twitter:title
    content: Using URL Query Params in Nuxt 3
  - name: twitter:text:title
    content: Using URL Query Params in Nuxt 3
canonicalUrl: https://codybontecou.com/using-url-query-params-in-nuxt-3.html
---

# Using URL Query Params in Nuxt 3

> This is a continuation of my previous [post](https://codybontecou.com/silently-update-url-nuxt-3.html) on how to set query parameters in Nuxt 3. We'll be continuing with the code written there so make sure you check it out.

<HeaderMeta :author=$frontmatter.author :date=$frontmatter.date />

## The problem we're solving

We left off with our URL looking like `localhost:3000/test?streamer=faker`. This is nice but contained a few cases that are less than ideal.

Because the URL parameter is being updated using our input's v-model, if the page is refreshed, we lose that local state and the value stored in `twitchStreamer`.

## Using useRoute in Nuxt

NuxtJS relies on [vue-router](https://router.vuejs.org/) for most of its routing logic.

In our example, we are using the Composition API, one of the new features built into Nuxt 3.

In order to get our route, we use bring `useRoute()` into our `setup()`. Nuxt 3 auto-imports `useRoute()` so we can chose to be explicit or implicit.

```js
setup() {
  const route = useRoute()
}
```

Having our route unlocks all of the benefits of `vue-router`, including access to our query params!

## Making the query param persist

With access to our route, we can check the query variable (what's after the = in `streamer=`) using `route.query.streamer`.

Easy!

I now use this logic alongside a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) with the `twitchStreamer` variable.

```js
const twitchStreamer = ref(route.query.streamer ? route.query.streamer : '')
```

Now, every time the page is navigated to or refreshed, our `twitchStreamer` will check if our `route` has a streamer query parameter.

If it does, our `twitchStreamer` will contain the parameter's value. Otherwise, it'll be an empty string.

## Final code snippet

```html
<!-- pages/example.vue -->
<template>
  <input v-model="twitchStreamer" />
</template>

<script>
  setup() {
    const route = useRoute()
    const router = useRouter()
    const twitchStreamer = ref(route.query.streamer ? route.query.streamer : '')

    watch(twitchStreamer, (twitchStreamer, previous) => {
      router.push({
        path: '/test',
        query: { streamer: twitchStreamer },
      })
    })

    return { twitchStreamer }
</script>
```

<SimpleNewsletter />
<Post />
