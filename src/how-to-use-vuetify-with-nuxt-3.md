---
type: 'post'
title: 'How to use Vuetify with Nuxt 3'
slug: 'vue/nuxtjs/how-to-use-vuetify-with-nuxt-3'
author: { 'name': 'Cody Bontecou', 'image': 'https://codybontecou.com/images/cody-abstract.jpeg' }
date: 2022-05-04
description: Get Vuetify to work with Nuxt 3 with this quick tutorial.
category: tutorials
dropdown: 'NuxtJS'
tags:
  - Vuejs
  - Vue
  - Vite
  - Vuetify
  - NuxtJS
meta:
  - name: og:title
    content: How to use Vuetify with Nuxt 3
  - name: og:description
    content: Get Vuetify to work with Nuxt 3 with this quick tutorial.
  - name: og:image
    content: https://codybontecou.com/images/nuxt3-and-vuetify-meta.png
  - name: og:image:alt
    content: How to use Vuetify with Nuxt 3
  - name: og:title
    content: How to use Vuetify with Nuxt 3
  - name: twitter:title
    content: How to use Vuetify with Nuxt 3
  - name: twitter:text:title
    content: How to use Vuetify with Nuxt 3
canonicalUrl: https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html
newsletter: false
---

# How to use Vuetify with Nuxt 3

> Utilize the latest versions of Vuetify and Nuxt together.

## Installation

Start by creating a Nuxt 3 project if you do not have one already.

```bash
npx nuxi init nuxt-app
```

Then run `cd nuxt-app` and run `yarn` to make sure your dependencies are installed.

Now that our Nuxt 3 project is setup, we are ready to integrate Vuetify. While you are in the nuxt application's root directory, run the following command to install Vuetify 3 and it's dependency, sass.

```bash
yarn add vuetify@next sass
```

Your `package.json` should now look similar to the following:

```json
// package.json
"devDependencies": {
  "nuxt": "3.0.0"
},
"dependencies": {
  "sass": "^1.51.0",
  "vuetify": "^3.0.1"
}
```

## Creating our Vuetify plugin

We have Vuetify installed, now we need it to talk to Nuxt. We will do this by using Nuxt's [plugin](https://v3.nuxtjs.org/guide/directory-structure/plugins/) feature.

Create a `plugins` folder then create a file named `vuetify.js` and put it in the newly created plugins folder.

Then, within the `vuetify.js` file, paste the following code into it:

```js
// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})
```

This is mostly documented [here](https://next.vuetifyjs.com/en/getting-started/installation/#usage) within Vuetify's explanation. The key difference is we use `nuxtApp.vueApp.use(vuetify)` rather than `app.use(vuetify)`.

## Configure Nuxt 3 to use our new plugin

Our last bit of configuration occurs in our `nuxt.config.ts` file. This is where we tell Nuxt how to properly find and build Vuetify's sass.

```js
// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
```

## Integrate Vuetify's mdi icons

It seems using `v-icon` requires additional configuration. Thank you @cbrhex for figuring this out [here](https://github.com/nuxt/framework/discussions/1183#discussioncomment-2682117).

1. Install mdi using `yarn add @mdi/font`
2. Add the css to your `nuxt.config.ts` file.

```js
// nuxt.config.ts
import {defineNuxtConfig} from 'nuxt'

export default defineNuxtConfig({
    css: [
        ....
        '@mdi/font/css/materialdesignicons.min.css',
        ...
    ],
})
```

## Customize Sass Variables

You're able to extend and modify the sass variables powering Vuetify. This requires installing `vite-plugin-vuetify` and importing a few Nuxt-specific modules:

```bash
yarn add vite-plugin-vuetify
```

and adding the following code to your nuxt config:

```ts
// nuxt.config.ts
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)
  ...
  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins.push(
        vuetify({
          styles: { configFile: resolve('./settings.scss') },
        })
      )
    }
  ...
```

This points Vuetify to a `settings.scss` file in the same directory as the `nuxt.config.ts` file. In your `.scss` file, you can provide global variable changes with the following syntax:

```scss
// settings.scss
@forward 'vuetify/settings' with (
  $button-color: green,
  $button-font-weight: 700
);
```

And in the component you want to apply these changes:

```vue
// app.vue
<template>
  <v-btn>Hello Sass Changes</v-btn>
</template>

<style lang="scss">
@use './settings';
</style>
```

Check out the [example repo](https://github.com/CodyBontecou/nuxt3-and-vuetify) if you want to see a working example.

If you've followed along this far, your `nuxt.config.ts` file should look like:

```js
// nuxt.config.ts
import vuetify from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  hooks: {
    'vite:extendConfig': config => {
      config.plugins.push(
        vuetify({
          styles: { configFile: resolve('./settings.scss') },
        })
      )
    },
  },
})
```

## Enjoy Vuetify alongside Nuxt 3

Everything should now be working as expected and you should now be able to utilize the wide array Vuetify components within your Nuxt pages!

Enjoy!

Here's the [repo](https://github.com/CodyBontecou/nuxt3-and-vuetify) if you'd like to see a working project.

## Resources

- [Component Specific Variables](https://next.vuetifyjs.com/en/features/sass-variables/#component-specific-variables)
- [vite:extendedConfig Syntax Docs](https://next.vuetifyjs.com/en/features/treeshaking/)
