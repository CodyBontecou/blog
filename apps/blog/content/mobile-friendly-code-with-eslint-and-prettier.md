---
title: Mobile-Friendly Code with ESLint and Prettier
description: Configure your linter and formatter to eliminate horizontal scrolling on mobile devices.
draft: false
topics:
  - ai
  - configuration
  - prettier
  - eslint
  - mobile
created_at: 2025-11-23T18:59
last_modified: 2025-11-23T20:07
---

Configure your linter and formatter to eliminate horizontal scrolling on mobile devices.

AI and cloud-based coding environments are enabling us to code from our mobile devices. Formatting tools haven’t caught up, providing default values that look good on desktop but poor on a mobile device.

## The Problem

Reading code on mobile means horizontal scrolling. It’s annoying.

The fix is simple: shorter lines.

## Choosing a Print Width

For an iPhone 13 (390pt screen width), a `printWidth` of **60-70 characters** works well.

I recommend `66` as a balanced default.

## Prettier Configuration

Create a `.prettierrc` file in your project root:

```json
{
  "printWidth": 66,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

The key setting is `printWidth`. This forces Prettier to wrap lines earlier.

## ESLint Configuration

Add `max-len` to your `.eslintrc.json`:

```json
{
  "rules": {
    "max-len": [
      "error",
      {
        "code": 66,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignoreComments": true
      }
    ]
  }
}
```

This catches any lines Prettier misses.

## Quick Reference

|Device           |Screen Width|Recommended `printWidth`|
|-----------------|------------|------------------------|
|iPhone SE        |375pt       |60                      |
|iPhone 13        |390pt       |66                      |
|iPhone 13 Pro Max|428pt       |72                      |

## Tradeoffs

Shorter lines mean more vertical scrolling and occasionally awkward line breaks in function signatures.

I think it may be worth it. Horizontal scrolling is a pain to read clearly.

## Done

Run Prettier across your codebase:

```bash
npx prettier --write .
```

Or adjust your IDE and/or CI settings to automatically apply these changes.

Enjoy reading code on your phone!