---
title: Simple Obsidian CSS Adjustments
date: 2024-11-10T22:06
topics:
  - obsidian
  - css
draft: false
ignore: false
created_at: 2024-11-10T22:06
last_modified: 2024-11-11T09:39
---

## Problem

A recurring pain point for me in Obsidian is the default image behavior. I believe it simply renders the image to the image's default dimensions or the max Obsidian window dimensions, whichever is smaller.

Taking a screenshot on a Mac creates a relatively large image, so when I paste it into Obsidian, it takes up an uncomfortable amount of space, filling up the entire Obsidian editor, making it difficult to work in.

Ideally, the images I work with are re-sized and optimized for my blog and notes. But the reality is, I haven't found an effective solution that is as convenient as Imgur. I do a lot of my writing while on my phone, so having a mobile solution is essential.

## Inject CSS File

This solution is simple. We'll be inspecting the element(s) we want to change using the built-in dev tools, and writing css that will override it.

Create a directory called `snippets` in your Obsidian vault's `.obsidian` directory.

Within snippets, create a css file. I called mine `image_size.css` but you can name it whatever you want.

In your Obsidian settings, navigate to the Appearances tab and scroll to the `CSS Snippets` section. You should see it has loaded your newly created `image_size.css` file. Make sure to toggle it on.

Your css file should now be injected into your Obsidian view. Any changes you make to the css using this file will reflect in your Obsidian editor.

Here is my `image_size.css` file:

```
// image_size.css
img {
    max-height: 600px;
    border-radius: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

@media screen and (max-width: 768px) {
    img {
        max-height: 400px;
    }
}

.markdown-source-view.mod-cm6 .cm-content > img {
    margin: 0 auto !important;
}
```

This controls the image dimensions a bit and centers them. Here's an example:

![ios device screenshot centered in obsidian editor](https://cln.sh/N1XqL4Md+)

## Obsidian Devtools

To view the html and css Obsidian uses, we need to open the devtools.

The keyboard shortcut to open the devtools are `cmd + option + i ` on macOS and `ctrl + shift + i` on a windows machine.

Obsidian is a Chromium application, so the interface will look similar if you've worked in Chromium browsers before.

You should be able to identify the element(s) you are interested in adjusting and now write the css needed to make the adjustments.

![devtools open in an obsidian editor](https://cln.sh/PcWLJY4g+)

## Resources

- [Obsidian CSS Snippets](https://help.obsidian.md/Extending+Obsidian/CSS+snippets)
- [How to Style Obsidian](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/Guides/How+to+Style+Obsidian)