---
title: Fix for Karabiner Elements not working after sleep
draft: false
ignore: false
topics:
  - macos
  - keybinds
created_at: 2025-02-24T09:25
date: 2025-02-24T09:25
last_modified: 2025-02-24T15:21
---

I recommended [[remap-macos-keys-with-karabiner-elements|Karabiner Elements]] recently for MacOS key remapping. But after using it for a bit, I ran into an issue where it stopped working after my computer went to sleep or restarted.

It's a confusing bug, because the application still runs and shows no sign of an issue, but the remapped keybinds do not respond.

After a bit of tinkering and exploration, I found [this Reddit comment](https://www.reddit.com/r/Karabiner/comments/15z0cv5/comment/jy7klhn/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) that provided the solution for me.

Basically, I just need to run this command (twice for some reason), and then re-open Karabiner Elements and it works again.

```bash
sudo pkill -f Karabiner -9 # Kills the main Karabiner UI
sudo pkill -f karabiner -9 # Kills the background processes
```

It's a bit frustrating to have to continuously do as I rely on this software for my day-to-day work, but I'm glad there's a solution.

Hope it helps!