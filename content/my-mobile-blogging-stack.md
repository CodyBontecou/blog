---
title: my-mobile-blogging-stack
draft: true
ignore: true
topics:
  - obsidian
  - blogging
  - ios
date: 2024-12-13T11:16
created_at: 2024-12-13T11:16
last_modified: 2024-12-13T12:26
---

## Writing

My blog posts are written and stored within [Obsidian](https://obsidian.md/) and synced to [Obsidian Mobile](https://obsidian.md/mobile) using Working Copy and Github, which I document in my article [[obsidian-git-on-ios]].

## iOS Shortcuts

I use a handful of iOS Shortcuts to make editing and posting my content more convenient. 

Bonus points for these shortcuts also working on my Mac device, as well as being easily shareable.

### Image to Imgur

Link to shortcut: [Image to Imgur](https://www.icloud.com/shortcuts/29967716bf954cdaa81a5f66d9b1aaa3)

Imgur provides an [easy-to-use API](https://apidocs.imgur.com/) that has allowed me to make an iOS shortcut that I can use directly from my phone's share sheet. 

This means, from my photo, I can share it to my action and it will upload it to Imgur and return the a link to the image.

Here's a gif showcasing what this looks like:

![Creating an imgur link using the image to imgur shortcut](https://i.imgur.com/d4UHkEr.gif)

### Link to Markdown Link

99% of the time, I simply want the Imgur link so I can add it into my markdown file that I am writing my blog post into.

With the Imgur link copied from the previous shortcut, I am able to run the string through an additional shortcut that convert's the string into markdown format `![alt text](imgur link here)`.

Link to shortcut: [Image Link to Markdown](https://www.icloud.com/shortcuts/009b724a598a4931a3abdee49dd31f61)

### Image to Imgur to Markdown

I combine the two shortcuts into a Image to Imgur to Markdown shortcut. This is a simple combination of the two.

The shortcut returns the string in markdown format, so I can simply copy and paste the returned value into my markdown file.

Link to shortcut: [Image to Imgur to Markdown](https://www.icloud.com/shortcuts/ac1a413814244e48a191ad5c3aab4dd1)


