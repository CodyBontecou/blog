---
title: Obsidian Git on iOS
date: 2024-11-08T00:00:00.000Z
topics:
  - mobile
  - iOS
  - obsidian
  - blogging
draft: false
ignore: false
created_at: 2024-11-09T10:02
last_modified: 2024-11-09T20:44
---

A step-by-step guide on how to connect your obsidian vault that is stored on Github to your iOS device. 

The [obsidian-git](https://github.com/Vinzent03/obsidian-git) plugin works for iOS and Android, but it claims it is unreliable and in some cases, simply does not work. 

I tried many of the options and guides discussed online, but after hours of work, only the steps I'm sharing worked for me.

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


**Note**: I  ran into issues when including the `.obsidian` directory in my git repo. There are plugins that work on desktop that are not supported on mobile, resulting in mobile-specific bugs. Sometimes crashing the application and making the vault unusable. 

I recommend removing this directory from source when using this method to sync vaults between devices. 

Instead, maintain two `.obsidian` directories, one for your mobile environment and one for your desktop environment.

## Importing the repo into Obsidian

1. Install & open Obsidian on your mobile device.
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

4. Adjust the base path to represent our directory structure. In this case, `blog-nuxt-content` is the base directory of the git repo.

![](https://i.imgur.com/y5UmLfO.png)

5. With a successful Github connection, you should now see a few new `Authentication/commit author` settings. Input your desired commit author name and email address

![New authentication/commit settings](https://i.imgur.com/Hg59OPM.png)

6. You should now be able to run git commands from your iOS device.

## Inspiration

I run my blog through Obsidian. Obsidian-git allows for automatic commit-and-sync functionality that keeps my writing backed up in Github on a regular interval. I combine this with Github Actions to continuously deploy my writing to my blog.

It's a nice and fluid system that works well for me.

Extending this to work with Obsidian on my phone is a blessing. Now I can write my thoughts on the go, which is ideal. 

The easier I can document my thoughts, the better.

## Resources

 > Credit to these resources that helped me along the way.

- [Opening an existing vault on IOS](https://www.reddit.com/r/ObsidianMD/comments/wtgi57/opening_an_existing_vault_on_ios/)
- [The Easiest Way to Connect Your Obsidian Vault with Github](https://linked-blog-starter.vercel.app/connect-obsidian-vault-with-github)
- [The Easiest Way to Setup Obsidian Git (4 Minutes) Video](https://www.youtube.com/watch?v=5YZz38U20ws)