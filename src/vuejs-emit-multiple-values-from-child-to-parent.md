---
type: 'post'
title: 'Emit Multiple Values from Child to Parent in a VueJS Custom Event'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2020-08-07
description: Emit Multiple Values from Child to Parent in a VueJS Custom Event
category: tutorials
tags:
  - Vuejs
  - Vue
  - Nuxtjs
  - Nuxt
  - Code
meta:
  - name: og:image
    content: https://codybontecou.com/vuejs-emit-multiple-params-meta.png
  - name: og:image:alt
    content: Emit Multiple Values from Child to Parent in a VueJS Custom Event with code snippet showcasing example provided in blog post.
  - name: og:title
    content: Emit Multiple Values from Child to Parent in a VueJS Custom Event
  - name: twitter:title
    content: Emit Multiple Values from Child to Parent in a VueJS Custom Event
  - name: twitter:text:title
    content: Emit Multiple Values from Child to Parent in a VueJS Custom Event
canonicalUrl: https://codybontecou.com/vuejs-emit-multiple-values-from-child-to-parent.html
---

# Emit Multiple Values from Child to Parent in a VueJS Custom Event

<HeaderMeta :author=$frontmatter.author :date=$frontmatter.date />

VueJS's event bus only accepts two parameters:

1. The name of the event.
2. Data you want to pass.

## To emit more than one parameter, it's best to pass the data as an object:

```js
this.$emit('success', {
  username: 'CodyBontecou',
  error: false,
})
```

## Access the parameters from the parent component using an event listener:

1. @success calls the onSuccess method when success is emitted from the child component.
2. The username and message parameters are destructured from the object passed into the success emit

```js
<LoginForm @success="onSuccess" />

methods: {
  onSuccess({ username, error }) {
    ...
  },
}
```

<SimpleNewsletter />
<Post />
