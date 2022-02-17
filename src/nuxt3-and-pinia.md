---
type: 'post'
title: 'Nuxt 3 and Pinia'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2022-2-15
description: Integrate Pinia as your state management library for your Nuxt 3 application.
category: tutorials
tags:
  - Vuejs
  - Vue
  - Vite
  - Route
  - NuxtJS
meta:
  - name: og:title
    content: Nuxt 3 and Pinia
  - name: og:description
    content: Integrate Pinia as your state management library for your Nuxt 3 application.
  - name: og:image
    content: https://codybontecou.com/images/nuxt3-and-pinia-meta.png
  - name: og:image:alt
    content: Nuxt 3 and Pinia
  - name: og:title
    content: Nuxt 3 and Pinia
  - name: twitter:title
    content: Nuxt 3 and Pinia
  - name: twitter:text:title
    content: Nuxt 3 and Pinia
canonicalUrl: https://codybontecou.com/nuxt3-and-pinia.html
---

![Integrate Pinia as your state management library for your Nuxt 3 application.](https://codybontecou.com/images/nuxt-3-and-pinia-meta.png)

# Nuxt 3 and Pinia

> Integrate Pinia as your state management library for your Nuxt 3 application.

<HeaderMeta :author=$frontmatter.author :date=$frontmatter.date />

## Vuex -> Pinia

Evan You, the creator of Vue himself, has stated "Pinia is de facto Vuex 5! At this point it’s really a naming/branding issue."

For the time being, it's probably best to be looking towards Pinia content rather than Vuex.

!["Pinia is de facto Vuex 5! At this point it’s really a naming/branding issue."](https://codybontecou.com/images/evan-pinia-tweet.png)

I recommend reading VueJS's official [post](https://vuejs.org/guide/scaling-up/state-management.html#pinia) regarding this to get a better understanding as to why Pinia > Vuex.

## Installing Pinia in Nuxt 3

Pinia nearly comes with first-class support for Nuxt 3. You'll need to install two packages:

```bash
yarn add pinia
yarn add @pinia/nuxt
```

## Add Pinia to your nuxt.config file

You'll need to add `'@pinia/nuxt'` to your buildModules array.

```js
// nuxt.config.js
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt'],
})
```

## Build your Pinia store

Now build a named store. For my use-case, I needed to manage state regarding filters, so the skeleton of my store looks like:

```js
// store/filters.js
import { defineStore } from 'pinia'

export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => {
    return {
      filtersList: ['youtube', 'twitch'],
    }
  },
  actions: {},
  getters: {
    filtersList: state => state.filtersList,
  },
})
```

This is just showing the general structure of your store. The key is to `defineStore` and make sure to include an `id`. In this case, I'm using `'filter-store'` as my id but it could be anything you prefer.

Read over Pinia's [Docs](https://pinia.vuejs.org/core-concepts/) to get a better grasp of how to use Pinia properly.

## Bring Pinia in Vue Component

With our store in place, simply import it into the component you want to use it in and have fun!

```js
<template>
  <div>
    {{ filtersList }}
  </div>
</template>

// components/FilterMenu.vue
<script>
import { useFiltersStore } from '~/store/filters'

export default defineComponent({
  setup() {
    const filtersStore = useFiltersStore()
    const filtersList = filtersStore.filtersList

    return { filtersList }
  },
})
</script>
```

<SimpleNewsletter />
<Post />
