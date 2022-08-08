---
type: 'post'
title: Overriding VuePress CSS Styles
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
description: This is the page description that will be used
date: 2020-07-02

# If using vuepress-plugin-blog, the category for the post
category: tutorials
dropdown: 'VueJS'

# The list of tags for the post
tags:
  - VuePress
  - JavaScript
  - CSS
  - stylus
  - Vue

# Absolute path to the main image preview for this page
# Example location: ./vuepress/public/images/posts/page-image.jpg
image: /images/path/page-image.jpg

# Add canonical URL to the frontmatter of each page
# Make sure this is the final, permanent URL of the page
canonicalUrl: https://codybontecou.com/vuepress-styles.html
---

<span class="text-4xl font-semibold">Overriding VuePress CSS Styles</span>

> Every post I found about updating the default VuePress theme was outdated. Here's a quick post on how to do it.

## Reoccurring Styles with Variables

1. Create a `.vuepress/styles/palette.styl` file.
1. Change a variable such as `$accentColor = #3eaf7c` to a color you prefer.

[Here](https://vuepress.vuejs.org/config/#palette-styl) is a link to the latest VuePress documentation discussing this.

### Example

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

## Individual CSS Elements

1. Create a `.vuepress/styles/index.styl` file.
1. Write CSS or [Stylus](https://stylus-lang.com/) to enhance your VuePress styles.

[Here](https://vuepress.vuejs.org/config/#index-styl) is a link to the latest VuePress documentation discussing this.

### Example

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

<SimpleNewsletter />
<Post
  repo="CodyBontecou/blog"
  theme="github-dark"
/>
