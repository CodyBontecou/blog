---
type: post
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2022-09-28
last_modified_date: 2022-09-28
title: Import Pinia Store Into Other Store
description: Learn how to access other stores within a store using Pinia.
slug: import-pinia-store-into-other-store
dropdown: Pinia
meta:
  - name: og:description
    content: Learn how to access other stores within a store using Pinia.
  - name: og:image
    content: https://codybontecou.com/images/cypress-component-testing-with-nuxt-3.png
  - name: og:image:alt
    content: Learn how to access other stores within a store using Pinia.
  - name: og:title
    content: Import Pinia Store Into Other Store
  - name: twitter:title
    content: Import Pinia Store Into Other Store
  - name: twitter:text:title
    content: Import Pinia Store Into Other Store
canonicalUrl: https://codybontecou.com/import-pinia-store-into-other-store.html
topics:
  - vue
  - State
  - Pinia
created_at: 2024-10-31T14:26
last_modified: 2025-01-15T17:38
---

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
