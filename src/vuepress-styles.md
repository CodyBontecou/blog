---
title: Overriding VuePress CSS Styles
---

<span class="text-4xl font-semibold">Overriding VuePress CSS Styles</span>

> Every post I found about updating the default VuePress theme was outdated. Here's a quick post on how to do it.

<h2 class="text-2xl font-semibold">Reoccurring Styles with Variables</h2>

1. Create a `.vuepress/styles/palette.styl` file.
1. Change a variable such as `$accentColor = #3eaf7c` to a color you prefer.

[Here](https://vuepress.vuejs.org/config/#palette-styl) is a link to the latest VuePress documentation discussing this.

## <h3 class="text-2xl font-semibold">Example</h3>

<p class="text-gray-500">I decided the default Vue green #3eaf7c is a bit too Vuey.</p>

```sass
/* default $accentColor */
$accentColor = #3eaf7c
```

<p class="text-gray-500">So I swapped it with a nice purple/blue color to personalize the site a bit.</p>

```sass
/* .vuepress/styles/palette.styl */
$accentColor = #4979ff
```

<h2 class="text-2xl font-semibold">Individual CSS Elements</h2>

1. Create a `.vuepress/styles/index.styl` file.
1. Write CSS or [Stylus](https://stylus-lang.com/) to enhance your VuePress styles.

[Here](https://vuepress.vuejs.org/config/#index-styl) is a link to the latest VuePress documentation discussing this.

## <h3 class="text-2xl font-semibold">Example</h3>

<p class="text-gray-500">I find the default spacing that VuePress provides to be too close together.</p>

```css
/* default css */
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}
```

<p class="text-gray-500">So I took some inspiration from the default VitePress theme and edited my .vuepress.styles.index.styl file with</p>

```css
/* .vuepress.styles.index.styl */
blockquote,
ol,
p,
ul {
  margin: 1rem 0;
  line-height: 1.7;
}
```
