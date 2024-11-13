---
title: Hidden Files for Cleaner Obsidian
topics:
  - obsidian
  - organization
draft: false
ignore: false
created_at: 2024-11-13T12:25
last_modified: 2024-11-13T13:01
---

In this guide, I'll show you how I achieved a cleaner, more focused writing environment without sacrificing any of Obsidian's powerful functionality

## Problem

My Vault hooked into content directory within a [Nuxt Content](https://content.nuxt.com) project. This allows easy [git syncing](http://codybontecou.com/obsidian-git-on-ios) between devices as well as a powerful CI/CD system using Nuxt Studio and Github Actions.

But, this clutters my vault with code-related files like `node_modules` that appear in the sidebar and search results. I don't like this. 



![vault cluttered with code-related files](https://cln.sh/77tDZQ7c+)


I want this to be my zen garden, with a structure that inspires writing.

Luckily, Obsidian is the bomb digitty and built-in features and community plugins that allows us to fix this up.

## Cleaning up the sidebar

There's a handy community plugin called [File Hider](https://github.com/Oliver-Akins/file-hider) by Oliver Akins. When installed and enabled, you can right-click the folders and files you want to hide from the sidebar.

![hiding node_modules directory using file hider plugin](https://cln.sh/mm4xqf8Q+)

Click `Hide Folder` and *poof* the folder is now hidden. You can hide as many files and folders as you want to make the space as clean as you want.

If you ever want to re-show the folder, you have to go to the `File Hider` settings in the Community Plugins section and click the toggle to show the files again.

**NOTE:** If you hide the folders and then disable and/or remove the File Hider plugin, the files and folders will continue to be hidden. To fix this, re-install and enable the plugin and ensure you re-show the hidden folders.


### Filter relevant search results

You can "exclude" files and folders from search results. 

Exclude is in quotes because Obsidian will still show these files in Quick Switcher and link suggestions. But, it looks like they are less likely to appear as a suggestion and only appear when explicitly searched for.

Here is my Excluded files list:

![my excluded files](https://cln.sh/Sth4lDRJ+)

I hide the same directories and files that I hid using the File Hider plugin.

## Conclusion

Our Obsidian vaults are now cleaned up and less likely to distract us with unnecessary files and search results.

Slowly but surely we'll achieve the perfect digital zen garden.