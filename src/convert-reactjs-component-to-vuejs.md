---
type: 'post'
title: 'Convert a ReactJS Component to VueJS'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2020-09-07
description: In this tutorial, we're going to convert a Timeline component built in ReactJS to VueJS.
category: tutorials
dropdown: 'VueJS'
tags:
  - Vuejs
  - Vue
  - ReactJS
  - Javascript
  - Component
meta:
  - name: og:title
    content: Convert a ReactJS Component to VueJS
  - name: og:description
    content: In this tutorial, we're going to convert a Timeline component built in ReactJS to VueJS.
  - name: og:image
    content: https://codybontecou.com/images/convert-reactjs-component-to-vuejs-meta.png
  - name: og:image:alt
    content: Meta image stating Convert a Component Built in ReactJS to VueJS alongside Timeline component
  - name: og:title
    content: Convert a React Component to VueJS
  - name: twitter:title
    content: Convert a React Component to VueJS
  - name: twitter:text:title
    content: Convert a React Component to VueJS
canonicalUrl: https://codybontecou.com/convert-reactjs-component-to-vuejs.html
---

# Convert a ReactJS Component to VueJS

> In this tutorial, we're going to rewrite a Timeline component built in ReactJS by [Florin Pop](https://www.youtube.com/watch?v=tcUVUBlyXX8) to VueJS. You can see the component in action [here](https://www.florin-pop.com/timeline/).

## Scaffold your VueJS app using [Vite](https://vitejs.dev/)

I try to use Vite whenever given the opportunity.

It increases development speed by an incredibly amount due to features such as Instant Server Start and Lightning Fast HMR (Hot Module Replacement).

1. Let's init our project:

```bash
npm init vite@latest
```

2. Follow the prompt and select `vue` as our framework and and as our variant.
3. `cd` into the generated directory and install the dependencies with `npm install`.
4. Run your new vite + vuejs project using `npm run dev`.

### This will generate a project that has the following directory structure:

<img src="../assets/images/timeline-directory-structure.png" alt="ViteJS generated directory structure" class="mt-6 rounded shadow-lg w-1/2" />

## Building the VueJS Component

Now, the fun stuff. Let's work on converting the ReactJS code.

### `App.vue` looks very similar to the ReactJS version:

```vue
// App.vue
<script setup>
import Timeline from './components/Timeline.vue'
</script>

<template>
  <Timeline />
</template>
```

```js
// React Version
const App = () => (
  <>
    <h1>React Timeline</h1>
    <Timeline />
  </>
)
```

The key difference here is the [template tag](https://vuejs.org/v2/guide/syntax.html), an essential part of VueJS syntax.

### Lets now dig into the Timeline component - `Timeline.vue`

The Timeline component is where the data gathering and container occur.

In this example, we are gathering the data from our local `data.json` file. It shouldn't require too much additional work to get this component to work with live data using a package such as [axios](https://axios-http.com/).

While the ReactJS version takes up less vertical space, the VueJS version is much easier to read. Rather than applying an inline map function, we use a `v-for` to apply the same functionality.

VueJS attaches dynamic data a property called [v-bind](https://vuejs.org/v2/api/#v-bind). The shorthand for v-bind is `:`. As you can see `:data=data` is the VueJS equivalent to `data={data}`.

Also note, VueJS doesn't use `className` to apply its CSS. Instead, you can use the classic `class` keyword.

```js
// React Version
const Timeline = () =>
  timelineData.length > 0 && (
    <div className="timeline-container">
      {timelineData.map((data, idx) => (
        <TimelineItem data={data} key={idx} />
      ))}
    </div>
  )
```

```vue
// components/Timeline.vue

<template>
  <div class="timeline-container">
    <TimelineItem v-for="(data, idx) in timelineData" :data="data" :key="idx" />
  </div>
</template>

<script>
import json from '../assets/data.json'
import TimelineItem from './TimelineItem.vue'

export default {
  components: {
    TimelineItem,
  },
  data: () => ({
    timelineData: json,
  }),
}
</script>
```

Here's an example of what the data looks like:

```json
[
  {
     "text": "Started working on the app-ideas repository",
     "date": "February 25 2021",
     "category": {
        "tag": "app-ideas",
        "color": "#FFDB14"
     },
     "link": {
        "url": "https://github.com/florinpop17/app-ideas",
        "text": "Check it out on GitHub"
     }
  },
  ...
]
```

### Converting the TimelineItem Component to VueJS

The TimelineItem Component is where the majority of the UI logic is taking place. We are now playing with the data we gathered within the Timeline component.

There isn't much happening outside of destructing the data object and styling as needed.

We destructure data in VueJS differently than in ReactJS.

- When using the data between two HTML elements, you must destructure it using two curly brackets `{{}}`
- When accessing the data within a `v-bind:`, you destructure it using single curly brackets `{data}`
- When accessing the data within a directive such as `v-if`, you type in the data `v-if="data"`

```js
const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span className="tag" style={{ background: data.category.color }}>
        {data.category.tag}
      </span>
      <time>{data.date}</time>
      <p>{data.text}</p>
      {data.link && (
        <a href={data.link.url} target="_blank" rel="noopener noreferrer">
          {data.link.text}
        </a>
      )}
      <span className="circle" />
    </div>
  </div>
)
```

```vue
// components/TimelineItem.vue
<template>
  <div class="timeline-item">
    <div class="timeline-item-content">
      <span class="tag" :style="{ background: `${data.category.color}` }">
        {{ data.category.tag }}
      </span>
      <time>{{ data.date }}</time>
      <p>{{ data.text }}</p>
      <a
        v-if="data.link"
        :href="data.link.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ data.link.text }}
      </a>
      <span class="circle" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
```

### Additional VueJS config

To get the CSS provided below to style our component, we need to expose the CSS to work within our VueJS application. For this example, I placed an import statement within my `main.js` file.

```js
import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')
```

### Styling the component using CSS

For this component, I am using the `main.css` file placed within our `assets` directory. Here is the css used within this component:

```css
/* assets/main.css */
@import url('https://fonts.googleapis.com/css?family=Lato');

* {
  box-sizing: border-box;
}

body {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  margin: 0;
}

h1 {
  text-align: center;
}

#app {
  padding: 0 20px;
  width: 100%;
}

.timeline-container {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 40px 0;
}

.timeline-container::after {
  background-color: #e17b77;
  content: '';
  position: absolute;
  left: calc(50% - 2px);
  width: 4px;
  height: 100%;
}

.timeline-item {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  position: relative;
  margin: 10px 0;
  width: 50%;
}

.timeline-item:nth-child(odd) {
  align-self: flex-end;
  justify-content: flex-start;
  padding-left: 30px;
  padding-right: 0;
}

.timeline-item-content {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 15px;
  position: relative;
  width: 400px;
  max-width: 70%;
  text-align: right;
}

.timeline-item-content::after {
  content: ' ';
  background-color: #fff;
  box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  right: -7.5px;
  top: calc(50% - 7.5px);
  transform: rotate(45deg);
  width: 15px;
  height: 15px;
}

.timeline-item:nth-child(odd) .timeline-item-content {
  text-align: left;
  align-items: flex-start;
}

.timeline-item:nth-child(odd) .timeline-item-content::after {
  right: auto;
  left: -7.5px;
  box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
}

.timeline-item-content .tag {
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  top: 5px;
  left: 5px;
  letter-spacing: 1px;
  padding: 5px;
  position: absolute;
  text-transform: uppercase;
}

.timeline-item:nth-child(odd) .timeline-item-content .tag {
  left: auto;
  right: 5px;
}

.timeline-item-content time {
  color: #777;
  font-size: 12px;
  font-weight: bold;
}

.timeline-item-content p {
  font-size: 16px;
  line-height: 24px;
  margin: 15px 0;
  max-width: 250px;
}

.timeline-item-content a {
  color: #333;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
}

.timeline-item-content a::after {
  content: ' ►';
  font-size: 12px;
}

.timeline-item-content .circle {
  background-color: #fff;
  border: 3px solid #e17b77;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 10px);
  right: -40px;
  width: 20px;
  height: 20px;
  z-index: 100;
}

.timeline-item:nth-child(odd) .timeline-item-content .circle {
  right: auto;
  left: -40px;
}

@media only screen and (max-width: 1023px) {
  .timeline-item-content {
    max-width: 100%;
  }
}

@media only screen and (max-width: 767px) {
  .timeline-item-content,
  .timeline-item:nth-child(odd) .timeline-item-content {
    padding: 15px 10px;
    text-align: center;
    align-items: center;
  }

  .timeline-item-content .tag {
    width: calc(100% - 10px);
    text-align: center;
  }

  .timeline-item-content time {
    margin-top: 20px;
  }

  .timeline-item-content a {
    text-decoration: underline;
  }

  .timeline-item-content a::after {
    display: none;
  }
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
```

## Additional Resources

- Github Repository with source code - [https://github.com/CodyBontecou/timeline-component-vuejs](https://github.com/CodyBontecou/timeline-component-vuejs)
- Florin Pop made a [Youtube video](https://www.youtube.com/watch?v=tcUVUBlyXX8) walking through building this component using ReactJS.
- [ReactJS Codepen](https://codepen.io/FlorinPop17/pen/GLEPZy)
