---
title: 'My blog'
description: The estimated reading time has become prevalent in most major spaces that provides articles and reading materials. I decided to look into how to calculate it myself and found it's quite simple.
tags:
  - VuePress
  - JavaScript
  - CSS
  - Refactor
  - Vue
  - Medium
  - Personal Blog
  - Software Tutorials
meta:
  - name: og:title
    content: My Blog | Cody Bontecou
  - name: og:image
    content: https://codybontecou.com/images/cody-meta.png
  - name: og:image:alt
    content: Cody Bontecou's blog
  - name: twitter:title
    content: My Blog | Cody Bontecou
  - name: twitter:text:title
    content: My Blog | Cody Bontecou

canonicalUrl: https://codybontecou.com/
---

<div class="flex flex-col items-center sm:flex-row sm:items-start">
  <img src="./assets/images/cody-abstract.jpeg" alt="Portrait of Cody Bontecou" class="rounded-full w-52" width="100%" height="100%" />
  <div class="flex flex-col max-w-xs h-full sm:ml-12">
    <h1 class="mt-6 text-4xl font-semibold">
      Cody Bontecou
    </h1>
    <p class="my-1 font-medium text-gray-500">
      is enjoying life as a digital nomad, building web apps one line at a time.
    </p>
    <div class="my-3 flex space-x-4">
      <Email />
      <Facebook />
      <Twitter />
      <Github />
      <Youtube />
      <Discord />
    </div>

  </div>
</div>

<div class="mt-12 sm:mt-20 border-b w-full border-gray-300"></div>

<div class="flex flex-col">
  <p class="mt-6 text-gray-500">
    China was an odd time in my life. A time where I was sick of the daily grind, so I jumped at the opportunity to work in a foreign country in which I only knew blurry bits of what was taught through textbooks. This broke me away from the structure I was so used to and allowed me to explore the world, and myself. I was able to find my passion: code. After self-teaching myself HTML through a mobile app, I decided to return to university, change my major to Computer Science, and enjoy the remaining years at school, learning what I wanted rather than what I felt I needed.
  </p>
  <p class="mt-6 text-gray-500">
    Now, I have an insatiable appetite to learn more. With exciting fields such as machine learning, AI, automated vehicles, data analytics, cybersecurity, and more becoming relevant and inviting, I hope to acquire as much knowledge as possible and apply what I know to an area I love and believe is making the world a better place.  
  </p>
</div>

<style>

#github-icon {
  filter: invert(0%) !important;
}

:root.dark #github-icon {
  filter: invert(100%) !important;
}

</style>
