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
  <img src="./assets/images/cody-abstract.jpeg" alt="Portrait of Cody Bontecou" class="rounded-full w-52" />
  <div class="flex flex-col max-w-xs h-full sm:ml-12">
    <h1 class="mt-6 text-4xl font-semibold">
      Cody Bontecou
    </h1>
    <p class="my-1 font-medium text-gray-500">
      is enjoying life as a digital nomad, building web apps one line at a time.
    </p>
    <div class="my-3 flex space-x-4">
      <a href="mailto:codybontecou@gmail.com" target="_blank" class="w-min">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-500 hover:text-blue-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>    
      </a>
      <a href="https://www.facebook.com/cody.bontecou" target="_blank" class="w-min">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-500 h-6 w-6" viewBox="0 0 14222 14222">
          <circle cx="7111" cy="7112" r="7111" fill="#1977f3"/>zzzz<path d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z" fill="#fff"/>
        </svg>
      </a>
      <a href="https://twitter.com/CodyBontecou" target="_blank" class="w-min">
        <svg viewBox="328 355 335 276" xmlns="http://www.w3.org/2000/svg" class="text-gray-500 h-6 w-6">
          <path d="M630 425a195 195 0 01-299 175 142 142 0 0097-30 70 70 0 01-58-47 70 70 0 0031-2 70 70 0 01-57-66 70 70 0 0028 5 70 70 0 01-18-90 195 195 0 00141 72 67 67 0 01116-62 117 117 0 0043-17 65 65 0 01-31 38 117 117 0 0039-11 65 65 0 01-32 35z" fill="#3ba9ee"/>
        </svg>
      </a>
      <a href="https://github.com/codybontecou" target="_blank" class="h-6 w-6">
        <img src="https://codybontecou.com/images/github_logo.png" alt="Github's Octicon logo" class="h-6 w-6" id="github-icon">
      </a>
      <a href="https://www.youtube.com/channel/UCaynjLdmzjkwcsmPN-68iHA" target="_blank" class="h-6 w-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461.001 461.001" class="h-6 w-6"><path d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663l-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.881c3.748 1.899 3.683 7.274-.109 9.082z" fill="#f61c0d"/></svg>
      </a>
      <a href="https://discord.com/users/835349653599551499" target="_blank" class="h-6 w-6">
        <img src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png" alt="Round Discord icon" />
      </a>
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
.aside {
  display: none !important;
}

#github-icon {
  filter: invert(0%) !important;
}

:root.dark #github-icon {
  filter: invert(100%) !important;
}

</style>
