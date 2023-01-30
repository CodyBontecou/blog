---
type: 'post'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2023-01-29 19:14
last_modified_date: 2023-01-29 19:14
title: &title 'Getting Youtube Channel ID Using Their API'
description: &description "Getting a youtube channel's Channel Id using the Youtube v3 API."
slug: 'getting-youtube-channel-id-using-their-api'
dropdown: 'Youtube'
tags:
  - blog
  - Youtube
canonicalUrl: https://codybontecou.com/getting-youtube-channel-id-using-their-api.html
meta:
  - name: og:description
    content: *description
  - name: og:image
    content: https://codybontecou.com/images/getting-youtube-channel-id-using-their-api.png
  - name: og:image:alt
    content: *description
  - name: og:title
    content: *title
  - name: twitter:title
    content: *title
  - name: twitter:text:title
    content: *title
---

# {{ $frontmatter.title }}

This is for people wanting to programmatically get the Channel ID of a Youtube Channel using Youtube's API and a Youtube Channel name.

Supposedly there are ways to look through the web UI to find the appropriate ID, but I want to get this information using code.

## API Endpoint

```
https://youtube.googleapis.com/youtube/v3/search?part=snippet&q={CHANNEL_NAME}&type=channel&key={YOUTUBE_API_KEY}
```

Be sure you:

- Replace the `{CHANNEL_NAME}` variable with the name of the Youtube channel you want to get the Channel Id of.
- Replace the `{YOUTUBE_API_KEY}` with the api key provided by Google. Follow the [docs](https://support.google.com/googleapi/answer/6158862?hl=en) to get this.

## Example cURL Request

```bash
curl --location --request GET 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q={CHANNEL_NAME}&type=channel&key={YOUTUBE_API_KEY}' \

--header 'Accept: application/json'
```
