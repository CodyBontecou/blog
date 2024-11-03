---
type: post
title: Nuxt 3 and Pinia
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2022-02-15
description: Integrate Pinia as your state management library for your Nuxt 3 application.
category: tutorials
dropdown: NuxtJS
tags:
  - vue
  - Vue
  - Vite
  - Route
  - nuxt
meta:
  - name: og:title
    content: Nuxt 3 and Pinia
  - name: og:description
    content: Integrate Pinia as your state management library for your Nuxt 3
      application.
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
topics:
  - Nuxt
  - Pinia
  - State
  - Vue
---

# Nuxt 3 and Pinia

> Integrate Pinia as your state management library for your Nuxt 3 application.

## Vuex -> Pinia

Evan You, the creator of Vue himself, has stated "Pinia is de facto Vuex 5! At this point it’s really a naming/branding issue."

For the time being, it's probably best to be looking towards Pinia content rather than Vuex.

!["Pinia is de facto Vuex 5! At this point it’s really a naming/branding issue."](https://codybontecou.com/images/evan-pinia-tweet.png)

I recommend reading VueJS's official [post](https://vuejs.org/guide/scaling-up/state-management.html#pinia) regarding this to get a better understanding as to why Pinia > Vuex.

## Installing Pinia in Nuxt 3

Pinia nearly comes with first-class support for Nuxt 3. You'll need to install two packages:

```shell
yarn add pinia
yarn add @pinia/nuxt
```

## Add Pinia to your nuxt.config file

You'll need to add `'@pinia/nuxt'` to your modules array.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
})
```

## Build your Pinia store

Now build a named store. For my use-case, I needed to manage state regarding filters, so the skeleton of my store looks like:

```ts
// store/filters.ts
import { defineStore } from 'pinia'

export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => {
    return {
      filtersList: ['youtube', 'twitch'],
    }
  },
  actions: {
    addValueToFilterList(value: string) {
      this.filtersList.push(value)
    },
  },
  getters: {
    filtersList: state => state.filtersList,
  },
})
```

This is just showing the general structure of your store. The key is to `defineStore` and make sure to include an `id`. In this case, I'm using `'filter-store'` as my id but it could be anything you prefer.

Read over Pinia's [Docs](https://pinia.vuejs.org/core-concepts/) to get a better grasp of how to use Pinia properly.

## Alternative Pinia Store Syntax

The above example is a valid Pinia store using a pattern similar to Vue's Options API. You can also define your store using a syntax similar to the Composition API.

Here's how you can build the above example in a composable way:

```js
// store/filters.ts
import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filterStore', () => {
  const filtersList = ref(['youtube', 'twitch'])

  function addValueToFilterList(value: string) {
    filtersList.value.push(value)
  }
  return { addValueToFilterList, filtersList }
})
```

We just reduced the amount of code significantly. Pretty cool, right? I personally prefer the composition.

Instead of relying on the `state`, `action`, and `getter` boilerplate, we use Vue's `ref`, `computed`, and traditional Javascript functions to manage our state.

## Bring Pinia in Vue Component

With our store in place, simply import it into the component you want to use it in and have fun!

```vue
// components/FilterMenu.vue
<script setup>
import { useFiltersStore } from '~/store/filters'
import { storeToRefs } from 'pinia'

const inputVal = ref('')

const filtersStore = useFiltersStore()
const { addValueToFilterList } = filtersStore
const { filtersList } = storeToRefs(filtersStore)
</script>

<template>
  <div>
    {{ filtersList }}
    <input v-model="inputVal" />
    <button @click="addValueToFilterList(inputVal)">+</button>
  </div>
</template>
```

The line `import { storeToRefs } from 'pinia'` allows us to maintain a reactive getter. In this case, we are destructuring the `filterList` getter from our `filtersStore`.

Here's the [repo](https://github.com/CodyBontecou/nuxt3-and-pinia) if you'd like to see a working project.
