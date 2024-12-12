---
type: post
title: Integrating Vue Devtools into an Electron Application
sidebarTitle: Adding Vue Devtools
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2021-12-15
description: Vue Devtools for an Electron application running VueJS on the frontend.
category: tutorials
dropdown: Electron
topics:
  - vue
  - Vite
  - Javascript
  - Electron
meta:
  - name: og:title
    content: Integrating Vue Devtools into an Electron Application
  - name: og:description
    content: Vue Devtools for an Electron application running VueJS.
  - name: og:image
    content: https://codybontecou.com/images/electron-app-with-vue-devtools-meta.png
  - name: og:image:alt
    content: Using Vue Devtools to debug Electron application running VueJS on the frontend.
  - name: og:title
    content: Integrating Vue Devtools into an Electron Application
  - name: twitter:title
    content: Integrating Vue Devtools into an Electron Application
  - name: twitter:text:title
    content: Integrating Vue Devtools into an Electron Application
canonicalUrl: https://codybontecou.com/electron-app-with-vue-devtools.html
created_at: 2024-10-31T14:26
last_modified: 2024-12-12T11:09
---

> Bringing the VueJS devtools into our Electron application to help debug. This post assumes you have followed along with my previous [post](https://codybontecou.com/global-state-management-in-an-electron-app.html).

## Installation

Vue Devtools provides a non-browser specific version of their devtools that they call [standalone](https://devtools.vuejs.org/guide/installation.html#standalone).

You can install the package globally:

```shell
npm install -g @vue/devtools@beta
# Or with yarn
yarn global add @vue/devtools@beta
```

Or within your project as a dependency:

```shell
npm install --save-dev @vue/devtools@beta
# Or with yarn
yarn add -D @vue/devtools@beta
```

_Because our application is using Vue 3, we must us version 6 beta of the devtools according to [this](https://github.com/vuejs/devtools/issues/1199) issue_

## Using the VueJS devtools globally

Once installed globally, you can now run the command `vue-devtools` on your command line.

This will spawn an instance of the devtools within its own window.

![Standalone vue-devtools that spawns when vue-devtools command is ran.](https://codybontecou.com/images/vue-devtools-waiting-for-connection.png)

Now, add the following to the `<head>` section of your applications HTML file:

```html
<script src="http://localhost:8098"></script>
```

If you want to debug your application remotely, use the following code snippet instead:

```html
<script>
  window.__VUE_DEVTOOLS_HOST__ = '<your-local-ip>' // default: localhost
  window.__VUE_DEVTOOLS_PORT__ = '<devtools-port>' // default: 8098
</script>
<script src="http://<your-local-ip>:8098"></script>
```

**Don't forget to remove this code before deploying to production!**

Once your application has the appropriate script tag within its HTML, run it _without_ killing the terminal that is running `vue-devtools`.

In our case,

```shell
npm run dev
```

## Running the Vue Devtools as a dependency

Within your project directory, run the following command should spawn the devtools:

```shell
./node_modules/.bin/vue-devtools
```

For convenience sake and ease-of-use, I moved the `./node_modules/.bin/vue-devtools` command into my `package.json` scripts:

```js
"devtools": "./node_modules/.bin/vue-devtools"
```

When using the devtools as a local dependency, we do not need the script tag within our `<head>`

Remove this code snippet if you added it earlier:

```html
<script src="http://localhost:8098"></script>
```

You should be all setup now. If you need additional help, check out their [documentation](https://devtools.vuejs.org/) or their github repo [documentation](https://github.com/vuejs/devtools/tree/legacy/packages/shell-electron#vue-remote-devtools).

Hope you enjoyed!
