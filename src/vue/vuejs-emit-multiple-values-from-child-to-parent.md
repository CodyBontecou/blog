---
type: 'post'
title: 'VueJS Custom Event - Emit Multiple Values'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2020-09-07
description: Use a VueJS's custom event to emit multiple parameters between components.
category: tutorials
tags:
  - Vuejs
  - Vue
  - Nuxtjs
  - Nuxt
  - Code
meta:
  - name: og:title
    content: VueJS Custom Event - Emit Multiple Values
  - name: og:description
    content: Use a VueJS's custom event to emit multiple parameters between components.
  - name: og:image
    content: https://codybontecou.com/images/vuejs-emit-multiple-params-meta.png
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

> VueJS custom events are a great way to communicate between child and parent components.

I was recently was in need of a way to pass more than one value from child to parent within a single custom event. The [VueJS Docs](https://vuejs.org/v2/guide/components-custom-events.html) do not provide any example showcasing this and instead I needed to refer to some comments within a Stack Overflow thread.

Here is what I found.

## To emit more than one parameter, it's best to pass the data as an object:

```js
this.$emit('success', {
  username: 'CodyBontecou',
  error: false,
})
```

VueJS's custom events only accepts two parameters:

1. The name of the event. In this case, the event name is `success`.
2. Data you want to pass. This can be a string, object, number, boolean, or function.

## Access the parameters from the parent component using an event listener:

We emitted the `success` event from the child component. This event can be captured within the parent component where the child is rendered using the `@` sign, in this case, `@success`.

1. @success calls the onSuccess method when success is emitted from the child component.
2. The username and message params are destructured from the object passed into the success emit and are now usable within the onSuccuss function to do as you please.

```js
<LoginForm @success="onSuccess" />

methods: {
  onSuccess({ username, error }) {
    ...
  },
}
```

It took me a little while to find the solution to this problem, so I figured it was best to document it within a blog post for others to benefit from.

I hope it helped!

<SimpleNewsletter />
<!-- <Post /> -->
