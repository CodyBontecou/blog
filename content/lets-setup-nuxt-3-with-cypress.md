---
type: post
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2023-02-02
last_modified_date: 2023-02-02
title: Lets setup Nuxt 3 with Cypress
description: Cypress is an excellent E2E testing tool. Let's set it up in a fresh Nuxt 3 project to connect two modern web tools.
slug: lets-setup-nuxt-3-with-cypress
dropdown: NuxtJS
topics:
  - nuxt
  - cypress
  - vue
  - testing
meta:
  - name: og:description
    content: Cypress is an excellent E2E testing tool. Let's set it up in a fresh Nuxt 3 project to connect two modern web tools.
  - name: og:image
    content: https://codybontecou.com/images/lets-setup-nuxt-3-with-cypress.png
  - name: og:image:alt
    content: Cypress is an excellent E2E testing tool. Let's set it up in a fresh Nuxt 3 project to connect two modern web tools.
  - name: og:title
    content: Lets setup Nuxt 3 with Cypress
  - name: twitter:title
    content: Lets setup Nuxt 3 with Cypress
  - name: twitter:text:title
    content: Lets setup Nuxt 3 with Cypress
canonicalUrl: https://codybontecou.com/lets-setup-nuxt-3-with-cypress.html
created_at: 2024-10-31T14:26
last_modified: 2024-11-09T21:19
---

> This is a quick guide on setting up Cypress End-to-End Testing with Nuxt 3.

I noticed [this Github thread](https://github.com/cypress-io/cypress/discussions/21184) about users struggling to get Cypress working with Nuxt 3.

I found the setup straightforward and decided to share how to do it.

## Initialize Nuxt project

```shell
npx nuxi init nuxt-project
cd nuxt-project
npm install
```

## Install + initialize Cypress

```shell
npm install cypress --save-dev
npx cypress open
```

Running `npx cypress open` should spawn the cypress test runner. Click `E2E Testing`, then `Chrome` for the browser option, and then click `Start E2E Testing in Chrome`.

## Cypress E2E Tests

During the Cypress initialization, the `cypress` folder should have been created.

By default, Cypress looks for any `*.cy.*` file within your `cypress/e2e` directory.

For simplicity's sake, I have the following test in `cypress/e2e/spec.cy.js`

```js
// cypress/e2e/spec.cy.js
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})
```

This test should pass while your Nuxt 3 application runs on port 3000. It just opens the browser and asserts it loaded.

And that's it. We now have Cypress E2E tests running against our Nuxt 3 application. Hope you enjoyed.

Here's the [Github Repo](https://github.com/CodyBontecou/lets-setup-nuxt-3-with-cypress) for reference.
