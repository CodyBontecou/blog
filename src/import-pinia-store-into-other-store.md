---
type: 'post'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2022-09-28 20:16
last_modified_date: 2022-09-28 20:16
title: &title 'Import Pinia Store Into Other Store'
description: &description 'Learn how to access other stores within a store using Pinia.'
slug: 'import-pinia-store-into-other-store'
dropdown: 'Pinia'
tags:
  -  #blog
  -  #Pinia
  -  #vue
meta:
  - name: og:description
    content: *description
  - name: og:image
    content: https://codybontecou.com/images/cypress-component-testing-with-nuxt-3.png
  - name: og:image:alt
    content: *description
  - name: og:title
    content: *title
  - name: twitter:title
    content: *title
  - name: twitter:text:title
    content: *title
canonicalUrl: https://codybontecou.com/import-pinia-store-into-other-store.html
---

# {{ $frontmatter.title }}

> Pinia makes state management within Vue apps a breeze to work with.

A common problem I run into is needing to access state from a different store. This can be solved using Pinia's composition syntax rather than the option syntax.

```ts
// store/count.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count-store', () => {
  const count = ref(0)

  function increaseCount() {
    count = count + 1
  }

  return { count, increaseCount }
})
```

They can now be imported and used within other Pinia stores like so:

```ts
// store/api.js
import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useCountStore } from './count'

export const useApiStore = defineStore('api-store', () => {
  const countStore = useCountStore()
  const { count } = storeToRefs(countStore)
  const { increaseCount } = countStore

  function displayCount() {
    console.log(count)
  }

  function increment() {
    increaseCount()
  }

  return { displayCount, increment }
})
```
