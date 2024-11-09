---
title: Obsidian Git sync on iOS
date: 2024-11-08T00:00:00.000Z
topics:
  - mobile
  - iOS
  - obsidian
  - blogging
draft: false
ignore: false
created_at: 2024-11-09T10:02
last_modified: 2024-11-09T11:12
---

## Stack

> This solution probably works with your device, I'm just sharing the explicit details of what I have.

- iPhone 13 Pro Max
- iOS v18.1
- Obsidian v1.7.5.
- Working Copy v6.1.8

## Cloning the git repo to iPhone

1. Install Working Copy
2. Clone your repository to your iPhone

![Clone repository in Working Copy](https://i.imgur.com/LWqHzTp.gif)


3. You should now be able to view your repository within the Working Copy interface.

![Browse repo in Working Copy](https://i.imgur.com/2SCcfvZ.gif)


Note: I  ran into issues when I included the `.obsidian` directory in my git repo. There are plugins that work on desktop that are not supported on mobile, resulting in bugs. I recommend removing this directory from source when using this method to sync vaults between devices. 

Instead, maintain two .obsidians, one for your mobile environment and one for your desktop environment.

## Importing the repo into Obsidian

> I tried many of the options listed online, but after hours of work, only the steps I'm sharing worked for me.

1. Install & open Obsidian
2. Create new vault 
3. Go to Files -> On my iPhone -> Obsidian 
4. Copy your existing vault to the Obsidian folder
5. Delete the new vault you created

## Resources

- [Reddit thread](https://www.reddit.com/r/ObsidianMD/comments/wtgi57/opening_an_existing_vault_on_ios/)

## Inspiration

