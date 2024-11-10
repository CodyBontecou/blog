---
type: post
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2023-01-29
last_modified_date: 2023-01-29 19:14
title: Getting Youtube Channel ID Using Their API
description: Getting a youtube channel's Channel Id using the Youtube v3 API.
slug: getting-youtube-channel-id-using-their-api
dropdown: Youtube
canonicalUrl: https://codybontecou.com/getting-youtube-channel-id-using-their-api.html
meta:
  - name: og:description
    content: Getting a youtube channel's Channel Id using the Youtube v3 API.
  - name: og:image
    content: https://codybontecou.com/images/getting-youtube-channel-id-using-their-api.png
  - name: og:image:alt
    content: Getting a youtube channel's Channel Id using the Youtube v3 API.
  - name: og:title
    content: Getting Youtube Channel ID Using Their API
  - name: twitter:title
    content: Getting Youtube Channel ID Using Their API
  - name: twitter:text:title
    content: Getting Youtube Channel ID Using Their API
topics:
  - youtube
created_at: 2024-10-31T14:26
last_modified: 2024-11-09T21:19
---

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

```shell
curl --location --request GET 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q={CHANNEL_NAME}&type=channel&key={YOUTUBE_API_KEY}' \

--header 'Accept: application/json'
```
