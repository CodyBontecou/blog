---
type: post
title: Global State Management in an Electron Application
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2021-11-30
description: Learn to utilize Pinia alongside VueJS within an Electron app to easily manage UI state.
category: tutorials
dropdown: Electron
topics:
  - vue
  - Pinia
  - Javascript
  - Electron
  - state
meta:
  - name: og:title
    content: Global State Management in an Electron Application
  - name: og:description
    content: Learn to utilize Pinia alongside VueJS within an Electron app to easily manage UI state.
  - name: og:image
    content: https://codybontecou.com/images/global-state-management-in-an-electron-app-meta.png
  - name: og:image:alt
    content: State Management in an Electron Application
  - name: twitter:title
    content: Global State Management in an Electron Application
  - name: twitter:text:title
    content: Global State Management in an Electron Application
canonicalUrl: https://codybontecou.com/global-state-management-in-an-electron-app
created_at: 2024-10-31T14:26
last_modified: 2025-06-26T08:00
---

> Bringing the VueJS tool [Pinia](https://pinia.esm.dev/) into our Electron application to manage its internal state. This post assumes you have followed along with my previous [post](https://codybontecou.com/electron-app-with-vuejs-and-vite.html).

## What is a Store?

A Store is an entity that manages the global state of your application. It allows you to read and write to, regardless of the component you are working within.

You may have heard of other packages that help manage a store, Vuex is the standard for Vue and Redux is the standard for React.

## Installation

> This assumes you are using Vue 3. \
> If you are using Vue 2, please refer to their [documentation](https://pinia.esm.dev/getting-started.html#installation).

Because we are hooking this up to an Electron application, which is just Javascript with extra steps, we can utilize our favorite package manager such as `npm` or `yarn` to install Pinia.

```shell
yarn add pinia
# or with npm
npm install pinia
```

Use the `createPinia` function to attach it to the VueJS app:

```js
// renderer/main.js

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App)
  .use(createPinia())
  .mount('#app')
```

Pinia is now available throughout your Electron application where Vue is available.

## Creating our first store

A store is defined using `defineStore()` and requires a _unique_ name. In this case, I am using `main` as the unique id attached to this store.

```js
// renderer/stores/main.js

import { defineStore } from 'pinia'

// useMainStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useMainStore = defineStore('main', {
  state: () => ({
    msg: 'Hello World!',
  }),
  getters: {
    message: state => state.msg,
  },
  actions: {},
})
```

## Using our store within a VueJS component

Now that our store is made, we can import it into individual components, allowing our components to interact with the store.

```js
import { useMainStore } from '@/stores/main'
```

Within the `setup` function, I call our store function and set the value within a const variable:

```js
setup() {
  const main = useMainStore()
}
```

This allows me to interact with my store. For this simple example, I am displaying the message defined within the [getter](https://pinia.esm.dev/core-concepts/getters.html).

```js
setup() {
  const main = useMainStore()

  return {
    message: computed(() => main.message),
}
```

The entire component can be seen below:

```vue
// renderer/components/Hello.vue

<template>
  <div id="hello">
    <img src="https://vuejs.org/images/logo.png" />
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useMainStore } from '@/stores/main'

export default defineComponent({
  setup() {
    const main = useMainStore()

    return {
      message: computed(() => main.message),
    }
  },
})
</script>
```

## Getting HMR to work

> While HMR is built into Pinia, it doesn't play well with Electron and requires a bit of additional configuration.
> Pinia provides additional documentation of this topic [here](https://pinia.esm.dev/cookbook/hot-module-replacement.html).

HMR (Hot Module Replacement) allows you to edit your stores and see the changes within your app without having to reload the page or restart your server.

Here's what my `main` store looks like after updating it to allow for HMR:

```js
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    msg: 'Hello World!',
  }),
  getters: {
    message: state => state.msg,
  },
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
```

Passing `acceptHMRUpdate` your store (`useMainStore` in my case), it gives us HMR!

Hope you enjoyed!
