---
title: Remap MacOS keys with Karabiner Elements
draft: false
ignore: false
topics:
  - macos
  - keybinds
created_at: 2025-02-09T20:49
date: 2025-02-09T20:49
last_modified: 2025-02-09T21:48
---

I'm currently working on a project that requires me to remote in to a computer to write and deploy code. Being in Hawaii, I tend to get around 100ms of latency, making every interaction with the remote computer a pain.

Every click, keystroke, and scroll is hit with a 100ms lag. I can go on about how painful this is, but let's find the bright side.

The computer I remote into is a Windows machine. I haven't personally used a Windows machine as my daily driver in nearly fifteen years. The keybinds feel off - `alt + tab` instead of `cmd + tab`, `ctrl` instead of `cmd` - but we have a solution.

[Karabiner-Elements](https://karabiner-elements.pqrs.org/) is a free and open-sourced and claims to be "A powerful and stable keyboard customizer for macOS".

It's easy enough to [swap one key to another](https://karabiner-elements.pqrs.org/docs/manual/configuration/configure-simple-modifications/). But, I only want `ctrl` to be mapped to `cmd` while I'm inside of my remote Windows environment. This requires [adding your own complex modification](https://karabiner-elements.pqrs.org/docs/manual/configuration/add-your-own-complex-modifications/).

Here's my complex modification JSON config:

```json
{
    "manipulators": [
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^com\\.microsoft\\.rdc\\.macos"
                    ],
                    "type": "frontmost_application_if"
                }
            ],
            "from": {
                "key_code": "left_gui",
                "modifiers": { "optional": ["any"] }
            },
            "to": { "key_code": "left_control" },
            "type": "basic"
        }
    ],
    "title": "Command Key to Control in Windows App"
}
```

This explicitly states that while the Windows App (`^com\\.microsoft\\.rdc\\.macos`) is the frontmost application, my left cmd key is mapped to the left control key. I personally only use the left command key, so this fine for me.