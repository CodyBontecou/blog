---
---

## Code Snippet

Change all `G-XXXXXXXXXX` with the Tracking ID provided by [Google Analytics (GA4)](https://support.google.com/analytics/answer/9539598?hl=en).

```ts
// src/.vitepress
module.exports = {
  head: [
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
      },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-XXXXXXXXXX');",
    ],
  ],
}
```

## Resources

- [Github discussion](https://github.com/vuejs/vitepress/issues/1131)
- [Find your "G-" ID](https://support.google.com/analytics/answer/9539598?hl=en).

## Inspiration

If you're coming from [Vuepress](https://vuepress.vuejs.org/), you may be used to the plugin system that provides features such as Google Analytics. Vitepress is (arguably) simpler in this regard. Just add the script provided by Google to your HTML head, and it should work.
