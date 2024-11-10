---
type: post
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2023-01-29
last_modified_date: 2023-01-29
title: Reusable YAML Variables
description: Reusing YAML variables within grey matter to conveniently generate meta tags.
slug: reusable-yaml-variables
dropdown: Yaml
tags:
  - blogging
  - yaml
meta:
  - name: og:description
    content: Reusing YAML variables within grey matter to conveniently generate meta tags.
  - name: og:image
    content: https://codybontecou.com/images/reusable-yaml-variables.png
  - name: og:image:alt
    content: Reusing YAML variables within grey matter to conveniently generate meta tags.
  - name: og:title
    content: Reusable YAML Variables
  - name: twitter:title
    content: Reusable YAML Variables
  - name: twitter:text:title
    content: Reusable YAML Variables
canonicalUrl: https://codybontecou.com/reusable-yaml-variables.html
topics:
  - yaml
  - frontmatter
created_at: 2024-10-31T14:26
last_modified: 2024-11-09T21:19
---

Did you know you can reuse YAML code?

There are two parts to this:

- The anchor `&` which defines the value of the variable
- The alias `*` used to refer to the variable

```yaml
title: &title 'Reusable YAML Variables'
description: &description 'Reusing YAML variables within grey matter to conveniently generate meta tags.'
meta:
  - name: og:description
    content: *description
  - name: og:title
    content: *title
```

This will now provide the `title` and `description` values throughout the YAML file.

While working with YAML and Grey Matter, I found this very convenient and figured I'd share.
