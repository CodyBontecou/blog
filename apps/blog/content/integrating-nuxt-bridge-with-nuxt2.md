---
type: post
title: Integrating Nuxt Bridge into a Nuxt 2 Project
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2022-05-04
description: 
category: tutorials
dropdown: NuxtJS
topics:
  - vue
  - Vite
  - Nuxt
meta:
  - name: og:title
    content: Integrating Nuxt Bridge into a Nuxt 2 Project
  - name: og:description
    content: 
  - name: og:image
    content: https://codybontecou.com/images/nuxt2-and-nuxt-bridge.png
  - name: og:image:alt
    content: Integrating Nuxt Bridge into a Nuxt 2 Project
  - name: og:title
    content: Integrating Nuxt Bridge into a Nuxt 2 Project
  - name: twitter:title
    content: Integrating Nuxt Bridge into a Nuxt 2 Project
  - name: twitter:text:title
    content: Integrating Nuxt Bridge into a Nuxt 2 Project
canonicalUrl: https://codybontecou.com/integrating-nuxt-bridge-with-nuxt2
created_at: 2024-10-31T14:26
last_modified: 2025-06-26T08:00
---

## Motivation

Nuxt-Bridge brings (bridges) a lot of the features Nuxt 3 has to offer to Nuxt 2 projects.
Features such as:

- Vue 3 and the Composition API
- Vite
- Built-in Typescript support
- Nitro Engine which gives us enhanced performance and serverless support.

## Pain

The biggest pain point is dealing with modules that have not been updated to work with post-Nuxt 2.

This is motivating me to focus further on separation of concern. This migration would be much easier if my code was less dependent on the framework and modules provided.

## Migration Steps

I followed the [Nuxt Bridge](https://v3.nuxtjs.org/bridge/overview/) documentation. The maintainers of the documentation did a great job of walking me through the process of migrating my project.

Here's the gist of the migration process:

- Replace nuxt with nuxt-edge

```shell
yarn remove nuxt
yarn add nuxt-edge@latest
yarn add --dev @nuxt/bridge@npm:@nuxt/bridge-edge
```

- Update package.json scripts. Replace all `nuxt` scripts to use `nuxi`.

```js
//package.json
{
  "scripts": {
    "dev": "nuxi dev",
    "build": "nuxi build", // build + start if using ssr
    "start": "nuxi preview"
    "generate": "nuxi generate" // If statically generating site (ssg)
  }
}
```

- Update nuxt.config by wrapping the previous config in the function `defineNuxtConfig`.

```js
// nuxt.config.js
import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Your existing configuration
})
```

- Replace or remove modules that are not compatible with non-Nuxt 2 or are now obsolete due to their features now being built in. You can search Nuxt's handy [module site](https://modules.nuxtjs.org/) to see what versions of Nuxt the module you are interested in supports.
  - If your module is no longer supported, you will have to delete it and create a [plugin](https://v3.nuxtjs.org/guide/directory-structure/plugins/) to bring in the functionality of the module/package that you depend on.

The migration documentation goes deeper into special cases. If what I mentioned doesn't fully migrate your project, dig into their documentation for a better understanding of what you need to do.

## Conclusion

I have to admit that the modules made the migration painful and make me question using them in the future. This experience has taught me to be more mindful of what dependencies I use, and how these dependencies are implemented.

While integrating already made Nuxt modules is easy, it reduces flexibility and forces reliance.

Outside of module complexity, the migration went quick and smoothly. I look forward to having the benefits of Nuxt Bridge within my Nuxt 2 apps.
