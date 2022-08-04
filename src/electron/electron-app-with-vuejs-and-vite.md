---
type: 'post'
title: 'Building an Electron App with VueJS and Vite'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2021-11-30
description: Combining the power of Electron with the Progressive Javascript frameworks VueJS and Vite
category: tutorials
tags:
  - Vuejs
  - Vue
  - Vite
  - Javascript
  - Electron
meta:
  - name: og:title
    content: Building an Electron App with VueJS and Vite
  - name: og:description
    content: Combining the power of Electron with the Progressive Javascript frameworks VueJS and Vite
  - name: og:image
    content: https://codybontecou.com/images/electron-app-with-vuejs-and-vite-meta.png
  - name: og:image:alt
    content: Showcase of Electron rendering VueJS code
  - name: og:title
    content: Building an Electron App with VueJS and Vite
  - name: twitter:title
    content: Building an Electron App with VueJS and Vite
  - name: twitter:text:title
    content: Building an Electron App with VueJS and Vite
canonicalUrl: https://codybontecou.com/electron-app-with-vuejs-and-vite.html
---

# Building an Electron App with VueJS and Vite

> Let's combine the power of Electron with VueJS and Vite to create incredible desktop applications using nothing but Javascript.

## TL: DR

Clone [this](https://github.com/Deluze/electron-vue-template) repo and use it as a starter template.

## [electron-vue](https://github.com/SimulatedGREG/electron-vue) is dead, long live [electron-vue-template](https://github.com/Deluze/electron-vue-template)

It appears [electron-vue](https://github.com/SimulatedGREG/electron-vue), the leading Github repository that combines VueJS and Electron hasn't had a commit since April 21, 2021. Prior to the April 21st commits, it hasn't had serious contribution activity since December 3rd, 2019 and before that October 23, 2018.

The repo may not be dead, but it's on its way out - failing builds, hundreds of open issues, and being locked into specific tooling versions all may be signs to be.

## [vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder) is neat, but it's not my cup of tea.

With 3.5k Github Stars and about the same amount of support as electron-vue, I decided to give it a shot. Their claim is to run the command `vue add electron-builder` to your existing application created using Vue CLI 3 or 4 and that's it, your VueJS web app now runs within an Electron instance.

With a fresh VueJS application built using `vue create` then immediately running `vue add electron-builder`, I was able to get an Electron instance running which truly is incredible.

Although it compiled and launched, it did give me an `ExtensionWarning` error message. Trying to move around the directory structure and changing the file names broke the application. Having to read the documentation to manage something as basic as filename and location is irritating.
I'm afraid this package has a bit too much magic going on behind the scenes for me to be comfortable using it.

## Why [electron-vue-template](https://github.com/Deluze/electron-vue-template)? It only has 14 stars!

> It's very simplistic, with no unnecessary dependency overhead.

electron-vue-template scaffolds the site in a transparent and easy-to-manage way. It comes with a very nice directory structure, making it easy to digest and understand where configuration or build code is occurring. **There's no magic happening behind the scenes in a node_module build script.**

Because of its transparent nature and well-structured code. This template works perfectly as a beginning spot to build out a desktop application using VueJS and Electron.

There is little loss of this repository loses its only contributor tomorrow. Because it's a template, you can clone it and pick apart the pieces you want.

### Not to mention, it comes with Vite!

[Vite](https://vitejs.dev/) is in a league of its own when it comes to Hot Module Replacement (HMR). Because of its on demand file serving, application build times are nearly instant - far, far quicker than any other build tool that exists.

Of the three packages mentioned, [electron-vue-template](https://github.com/Deluze/electron-vue-template) is the only one that comes with Vite built-in. This alone is a reason to utilize the template.

## What's next?

I've been using Electron these past few weeks on a personal app that I plan to reveal soon. It's gotten to a stage where the backend logic is hammered down and is in need of a UI boost as well as a state-management system like Vuex.

I'll be integrating a state-management system soon - either [Vuex](https://vuex.vuejs.org/) or [Pinia](https://github.com/posva/pinia). I'm curious to see what this process looks like within an Electron app utilizing Vue, but I'll try my best to write up a blog post as I go through the process.

<SimpleNewsletter />
<!-- <Post /> -->
