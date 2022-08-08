---
type: 'post'
title: Configuring TailwindCSS to work with Vitepress
---

<div class="text-4xl font-semibold">Configuring TailwindCSS to work with Vitepress</div>

<div class="flex flex-col sm:flex-row items-center mt-10">
  <img src="../assets/images/vite-logo.svg" alt="Vite package logo" width="200" height="200" style="float: left; margin-right: 12px;" />
  <p class="italic text-gray-500">
    I've found myself feeling limited by the styles provided by the framework so I looked into what it takes to use a stylesheet.
  </p>
</div>

A bit of searching around ended up pointing me towards [this Github issue](https://github.com/vuejs/vitepress/issues/62) which helps a user integrate [Tailwindcss](https://tailwindcss.com/), a framework I've been using professionally and in personal projects for awhile now.

According to the responses within the issue, there are two ways of bringing in TailwindCSS:

**1. Import TailwindCSS through their CDN:**

Edit your config file at `.vitepress/config.js` and add the following.

```js
module.exports = {
    head: [
        ['link', { rel: 'stylesheet', href='https://unpkg.com/tailwindcss@2.0.4/dist/tailwind.min.css' }]
    ]
};
```

This is quick and easy, but you miss out on some of the key TailwindCSS features as stated on [their site](https://tailwindcss.com/docs/installation#using-tailwind-via-cdn):

> Before using the CDN build, please note that many of the features that make Tailwind CSS great are not available without incorporating Tailwind into your build process.

<ul class="list-disc">
  <li>You can't customize Tailwind's default theme</li>
  <li>You can't use any directives like @apply, @variants, etc</li>
  <li>You can't enable additional variants like group-focus</li>
  <li>You can't install third-party plugins</li>
  <li>You can't tree-shake unused styles</li>
</ul>

**2. Download using npm/yarn:**

Github user ky-is posted an answer linking to [this repo](https://github.com/ky-is/vitepress-starter-tailwind) that is a blank Vitepress project with TailwindCSS working.

The first step is to update your package.json's so that it at least has:

```js
{
    ...,
    "devDependencies": {
      "@tailwindcss/postcss7-compat": "^2.0.4",
      "autoprefixer": "^9",
      "postcss": "^7",
      "vitepress": "^0.12.2"
  },
  "postcss": {
    "plugins": {
      "tailwindcss": {},
      "autoprefixer": {}
    }
  }
}
```

Make sure to run `yarn install` or `npm install` after updating your package.json file to update your dependencies.

Please note the comment by user neilmispelaar within the issue thread posted above:

> At time of writing, somewhere in the project dependencies postCSS version 7 is being referenced, but TailwindCSS uses PostCSS version 8. This is why in your package.json you have to reference a version of TailwindCSS that is compatible with PostCSS version 7. Fun Bonus: If you use this compatible version of TailwindCSS then you can not use AutoPrefixer past version 9.

It may also be worth going over https://tailwindcss.com/docs/installation#post-css-7-compatibility-build if you run into issues.

The next key step is adding the `theme` folder within your `.vitepress` directory.

Create an `index.js` file with the following:

```js
import './tailwind.postcss'

import DefaultTheme from 'vitepress/dist/client/theme-default'
export default { ...DefaultTheme }
```

and a `tailwind.postcss` file with the following:

```css
@tailwind base;

@tailwind components;

@tailwind utilities;
```

The last step is to create a `tailwind.config.js` file within your root directory and update the purgecss settings:

```js
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './docs/.vitepress/**/*.js',
      './docs/.vitepress/**/*.vue',
      './docs/.vitepress/**/*.ts',
    ],
    options: {
      safelist: ['html', 'body'],
    },
  },
}
```

**Congratulations! TailwindCSS should now be usable within your `.md` files.**

### Example:

Here is an example of this article using TailwindCSS alongside Vitepress' built in markdown formatting:

```md
# Configuring TailwindCSS to work with Vitepress

<div class="flex flex-col sm:flex-row items-center mt-10">
  <img src="../images/vite-logo.svg" alt="Vite package logo" width="200" height="200" style="float: left; margin-right: 12px;" />
  <p class="italic text-gray-500">
    I've found myself feeling limited by the styles provided by the framework so I looked into what it takes to use a stylesheet.
  </p>
</div>

A bit of searching around ended up pointing me towards [this Github issue](https://github.com/vuejs/vitepress/issues/62) which helps a user integrate [Tailwindcss](https://tailwindcss.com/), a framework I've been using professionally and in personal projects for awhile now.

According to the responses within the issue, there are two ways of bringing in TailwindCSS:

**1. Import TailwindCSS through their CDN:**
```

<SimpleNewsletter />
<Post repo="CodyBontecou/blog" theme="github-dark" />
