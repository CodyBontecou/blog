---
type: 'post'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2023-03-20 11:01
last_modified_date: 2023-03-20 11:01
title: &title 'Cypress Component Testing with Nuxt 3'
description: &description 'Showing the setup needed to get Cypress Component Testing working alongside Nuxt 3'
slug: 'cypress-component-testing-with-nuxt-3'
dropdown: 'Cypress'
tags:
  -  #blog
  -  #nuxt
  -  #cypress
  -  #vue
  -  #testing
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
canonicalUrl: https://codybontecou.com/cypress-component-testing-with-nuxt-3.html
---

# {{ $frontmatter.title }}

> This is a guide on setting up Cypress Component Testing with Nuxt 3.

## Initialize Nuxt project

```bash
npx nuxi init nuxt-project
cd nuxt-project
npm install
```

## Install + initialize Cypress

```bash
npm install cypress typescript --save-dev
npx cypress open
```

## Configure Cypress

Create a `cypress.config.ts` file in your root directory and add the following:

```ts
// cypress.config.ts
import { defineConfig } from 'cypress'

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
```

This is the baseline configuration that works for Vue projects. Nuxt projects require more configuration to get going.

In your root directory, create an additional configuration file. I use `vite.config.cypress.component.ts`. In it, paste the following:

```ts
// `vite.config.cypress.component.ts`
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('-'),
        },
      },
    }),
  ],
}
```

Now, add this config to your `cypres.config.ts` file so that it looks like so:

```ts
// cypress.config.ts
import { defineConfig } from 'cypress'
import viteConfig from '~/vite.config.cypress.component.js'

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig,
    },
  },
})
```

Unfortunately, I don't know exactly what this configuration is doing behind the scenes. I just know it works.

I found this code snippet in [this Github thread](https://github.com/cypress-io/cypress/discussions/21184#discussioncomment-4971326) by [@elwinvaneede](https://github.com/elwinvaneede).

### Additional Cypress Component Config

> We need a few more files to make Cypress happy.

Create a cypress directory containing a component and a support directory in our root directory.

```
├── nuxt-project/
└── component/
│ ├── Hello.cy.ts
└── support/
│ ├── component-index.html
│ ├── component.ts
```

- **component-index.html** is the base HTML file that Cypress mounts our components to.
  - This file looks like so:

```html
// support/component-index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Components App</title>
  </head>
  <body>
    <div data-cy-root></div>
  </body>
</html>
```

- **component.ts** is where we write specific configurations for our component tests.

This file will provide the `mount` function:

```ts
// support/component.ts
import { mount } from 'cypress/vue'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
```

## Running the Component Test Runner

When you run `npx cypress open`, you should see the component test dashboard with a green configured button. Click it, then Chrome, then Start Component Testing in Chrome, and now we should see our spec runner.

In our Nuxt project, let's create a basic component to test against.

For funsies, I'm just creating a `Hello.vue` component with the following:

```vue
// components/Hello.vue
<template>
  <button>Hello World</button>
</template>
```

I'm rendering this within my root `app.vue` file:

```vue
// app.vue
<template>
  <div>
    <Hello />
  </div>
</template>
```

Now we can mount this component in a cypress test. In our `cypress/component/Hello.cy.ts` file, paste the following:

```ts
// cypress/component/Hello.cy.ts
import Hello from '../../components/Hello.vue'

describe('Hello.cy', () => {
  it('renders', () => {
    cy.mount(Hello)
  })
})
```

## Styling Our Components with TailwindCSS Within the Tests

You're probably using a library such as [TailwindCSS](https://tailwindcss.com/) to style your component. If that's the case, you'll notice your component isn't styled when running within the component test runner.

Let's fix that.

Every tutorial I found said I should be able to import my css file within my `cypress/support/component.ts` file or link to it using the `component-index.html` file. I'm not sure why, but neither of these solutions worked for me.

Instead, I needed to create a Cypress plugin for tailwind at `cypress/plugins/tailwind.ts` with the following:

```ts
// cypress/support/component.ts
before(() => {
  cy.exec('npx tailwindcss -i ./assets/css/main.css -m').then(({ stdout }) => {
    if (!document.head.querySelector('#tailwind-style')) {
      const link = document.createElement('style')
      link.id = 'tailwind-style'
      link.innerHTML = stdout

      document.head.appendChild(link)
    }
  })
})
```

Then import this plugin into your `cypress/support/component.ts` file:

```ts
// cypress/support/component.ts
import { mount } from 'cypress/vue'
import '../plugins/tailwind'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
```

From what I understand, this is compiling Tailwind and appending the css output to a style tag that is then loaded into the component test runner's HTML.

This does create a bit of lag, but it's the only way I've been able to solve this problem.

## Source Code

You can view the code for this project at this [repository](https://github.com/CodyBontecou/cypress-component-testing-with-nuxt-3).
