---
title: My Mobile Blogging Stack
draft: false
ignore: false
topics:
  - obsidian
  - blogging
  - ios
date: 2024-12-13T11:16
created_at: 2024-12-13T11:16
last_modified: 2024-12-31T08:58
---

## Writing

My blog posts are written and stored within [Obsidian](https://obsidian.md/) and synced to [Obsidian Mobile](https://obsidian.md/mobile) using Working Copy and Github, which I document in my article [[obsidian-git-on-ios|Obsidian Git on iOS]].

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

![viewing the sky through rectangle building](https://i.imgur.com/G5GgecM.gif)

## Screen Recording

I use the default iOS screen recording feature. I do have it setup as a quick menu option so that when I pull down on my screen, it's one click away.

Maybe if I had a newer iPhone (15/16) with the physical quick action button I would set it to screen recording

Occasionally I record my phone screen from my Mac using the [iPhone Mirroring](https://support.apple.com/en-us/120421) application.

## Video Editing

I often do screen recordings on my phone to showcase the features I am using on my phone (like shown above). The default video editing software that comes on iPhones is severely lacking.

I use [Capcut](https://www.capcut.com/) to edit these videos. Capcut provides a surprising number of features for video editing. The main (only) feature I use is cutting out sections of the video and speeding up sections.

Capcut also provides a few features I'm interested in but haven't used yet.

1. Cloud storage with easy-to-share features.
2. Video-to-gif generation (premium)

## Current pain points

There are some pain points I think can be alleviated in my process that I will document here and update as I solve them.

### Alt text generation using AI

There is still a bit of manual action required for the image insertion. Images need an alt tag. I'm never confident in my ability to describe an image in a way that is beneficial to people that need it.

I figure this may be a good use of AI.

With iOS shortcuts allowing HTTP requests and image encoding/decoding, it shouldn't be too difficult to feed

### Video to Gif

iOS Shortcut's provide a default shortcut action to convert a video into a gif, but the quality is lacking.

Capcut has an export-to-gif option, but it's a premium feature requiring subscription.

My current solution is airdropping the video to my laptop, converting it into a gif using the open-source solution [Gifski](https://github.com/sindresorhus/Gifski) and then running the Image to Imgur to Markdown shortcut on my laptop. This works well enough... but is not ideal.