---
type: 'post'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2023-01-29 20:01
last_modified_date: 2023-01-29 20:01
title: &title 'Reusable YAML Variables'
description: &description 'Reusing YAML variables within grey matter to conveniently generate meta tags.'
slug: 'reusable-yaml-variables'
dropdown: 'Yaml'
tags:
  - blog
  - yaml
meta:
  - name: og:description
    content: *description
  - name: og:image
    content: https://codybontecou.com/images/reusable-yaml-variables.png
  - name: og:image:alt
    content: *description
  - name: og:title
    content: *title
  - name: twitter:title
    content: *title
  - name: twitter:text:title
    content: *title
canonicalUrl: https://codybontecou.com/reusable-yaml-variables.html
---

# {{ $frontmatter.title }}

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
