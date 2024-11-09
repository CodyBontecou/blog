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
last_modified: 2024-11-09T11:37
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
2. Create new vault. **DO NOT toggle store in iCloud.**

![Create new vault](https://i.imgur.com/1eNKTPC.png)

3. Copy your repository downloaded by Working Copy and paste it into your newly created vault. 

*You may need to enable the Working Copy location to see it's files. This is shown in the gif.*

![](https://i.imgur.com/10q37FN.gif)

5. With this pasted over, you should now be able to see your repository in Obsidian.

![New files are in our vault](https://i.imgur.com/Rfs7qq3.png)

## Enabling Obsidian Git plugin

1. Create a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic) from Github
2. Install and enable the [Obsidian Git](https://github.com/denolehov/obsidian-git/wiki/Installation) community plugin
3. Input your Github username and personal access token

![Obsidian git settings menu](https://i.imgur.com/JaZXVQh.png)



## Resources

- [Reddit thread](https://www.reddit.com/r/ObsidianMD/comments/wtgi57/opening_an_existing_vault_on_ios/)
- [The Easiest Way to Connect Your Obsidian Vault with Github](https://linked-blog-starter.vercel.app/connect-obsidian-vault-with-github)
- [The Easiest Way to Setup Obsidian Git (4 Minutes) Video](https://www.youtube.com/watch?v=5YZz38U20ws)

## Inspiration

