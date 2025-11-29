---
type: post
title: Generating Twitter Lists with Python
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2020-09-15
description: 
category: tutorials
dropdown: Python
topics:
  - python
  - tweepy
  - twitter
  - automation
meta:
  - name: og:title
    content: Generating Twitter Lists with Python
  - name: og:description
    content: Automatically generating a Twitter List of Paul Grahams feed with Python and Tweepy
  - name: og:image
    content: https://codybontecou.com/images/generate-twitter-lists-with-python-meta.png
  - name: og:image:alt
    content: Automatically generating a Twitter List of Paul Grahams feed with Python and Tweepy
  - name: twitter:title
    content: Generating Twitter Lists with Python
  - name: twitter:text:title
    content: Generating a Twitter List with Python
canonicalUrl: https://codybontecou.com/generate-twitter-lists-with-python
newsletter: false
created_at: 2024-10-31T14:26
last_modified: 2025-06-26T08:00
---
> The finished project can be seen [here](https://github.com/CodyBontecou/Generating-Twitter-Lists-with-Python/blob/main/tweepy_lists/app.py)

[Paul Graham](https://twitter.com/paulg) is an influential man in the tech and startup space.

His Twitter activity keeps me entertained and informed, spanning from discussions about [air quality significantly impacting life expectancy](https://twitter.com/paulg/status/1437423926980841472) to interesting [discussions he has with his kids](https://twitter.com/paulg/status/1437453828606070784).

The air pollution discussion this morning motivated me to want to see his feed and all of the interesting things a man like Paul sees. I started to follow the accounts he follows and after about 30 or so clicks I decided to investigate Twitter's API for a way to automate this.

This is where I discovered [Twitter Lists](https://help.twitter.com/en/using-twitter/twitter-lists).

## Twitter Lists are a great way to create custom feeds

> Viewing a List timeline will show you a stream of Tweets from only the accounts on that List.

Twitter Lists are the perfect solution. It gives me the ability to create custom feeds.

If I feel like delving into Paul Grahams feed, it's a click away. Same with Elon Musk or any of the other influential users on Twitter.

## Using Tweepy to automatically generate our Twitter Lists

> [Tweepy](https://www.tweepy.org/) is an easy-to-use Python library for accessing the Twitter API.

Tweepy provides built in methods to easily interact with the Twitter API.

In this project, I use the following from Tweepy:

- [API class](https://docs.tweepy.org/en/stable/api.html?highlight=API#API)
- [Client class](https://docs.tweepy.org/en/latest/client.html)
- [.create_list()](https://docs.tweepy.org/en/latest/api.html?highlight=create_list#tweepy.API.create_list)
- [.get_user()](https://docs.tweepy.org/en/v3.10.0/api.html?highlight=get_user#API.get_user)
- [.get_users_following()](https://docs.tweepy.org/en/latest/client.html?highlight=get_users_following#tweepy.client.get_users_following)
- [.add_list_members](https://docs.tweepy.org/en/latest/api.html?highlight=add_list_members#tweepy.api.add_list_members)

## Authenticating with Twitter's API using Tweepy

> This tutorial will assume you already have a Twitter developer account. If you do not, I went into detail [here](https://codybontecou.com/programmatically-tweeting-with-nodejs.html#getting-authenticated) on how to generate the proper authentication keys needed to access Twitter's API.

Tweepy provides the helper function `.OAuthHandler` that requires you to pass it your _consumer key_ and _consumer secret_ initializing the auth object, you then must call its method `.set_access_token()` which requires your _access token_ and _access token secret_ given to you when creating your developer account and [generating your app](https://codybontecou.com/programmatically-tweeting-with-nodejs.html#getting-authenticated).

```python
import tweepy

auth = tweepy.OAuthHandler(os.getenv("consumer_key"), os.getenv("consumer_secret"))
auth.set_access_token(os.getenv("access_token"), os.getenv("access_token_secret"))
```

## Initializing Tweepy's API and Client objects

We can now utilize our auth variable to create [API](https://docs.tweepy.org/en/stable/api.html?highlight=API#API) and [Client](https://docs.tweepy.org/en/latest/client.html) objects using the following code:

```python
api = tweepy.API(auth)
client = tweepy.Client(
    bearer_token=os.getenv("bearer_token"),
    consumer_key=os.getenv("consumer_key"),
    consumer_secret=os.getenv("consumer_secret"),
    access_token=os.getenv("access_token"),
    access_token_secret=os.getenv("access_token_secret"),
    wait_on_rate_limit=True,
)
```

With these objects, we can now access every Twitter endpoint.

## Creating a List using Tweepy's API

Tweepy methods used:

- [.create_list()](https://docs.tweepy.org/en/latest/api.html?highlight=create_list#tweepy.API.create_list): Takes three parameters: name, mode, and description. Name and description are self-explanatory and mode can either be `"public"` or `"private"` to define the visibility status of the List.

The response from a successfully List creation returns the List data. I will be using this list later on, so I decided to extract it's id into the variable `list_id`.

```python
list_name = "Paul Grahams's Feed"
list_description = "A list of everyone Paul Graham follows"

twitter_list = api.create_list(name=list_name, description=list_description)
list_id = twitter_list._json["id"]
```

## Getting a User and the accounts they follow

Tweepy methods used:

- [.get_user()](https://docs.tweepy.org/en/v3.10.0/api.html?highlight=get_user#API.get_user)
- [.get_users_following()](https://docs.tweepy.org/en/latest/client.html?highlight=get_users_following#tweepy.client.get_users_following)

By passing `client.get_user()` a twitter handle - in this case, Paul Graham - I can get all of the public data Twitter provides regarding that user.

I then use that user's data with `client.get_users_following()` alongside max_results. The argument `max_results` defines how many user objects Twitter will pass back. In this case, I used the max of 1000. The default is 100.

```python
twitter_handle = "paulg"
user = client.get_user(username=twitter_handle)

followers = client.get_users_following(id=user.data.id, max_results=1000)
```

## Automatially adding users to the list

Tweepy methods used:

- [.add_list_members](https://docs.tweepy.org/en/latest/api.html?highlight=add_list_members#tweepy.api.add_list_members)

Now that we have the List we want to populate and the followers we want populate it with, we use the `api.add_list_members()` method.

This method takes a list of up to 100 Twitter User ID's. The code snippet below chunks out follower data into sections of 100 Users and generates a list of ids to pass.

We are also passing this method the `list_id` that was saved when we created the list.

```python
for i in range(0, len(followers.data), 100):
    ids = [follower["id"] for follower in followers.data[i : i + 100]]
    api.add_list_members(list_id=list_id, user_id=ids)
```

## Things to keep in mind when working with Twitter's API

Twitter rate limits just about all of their endpoints. [Here](https://developer.twitter.com/en/docs/twitter-api/v1/rate-limits) is Twitter's documentation on what the rate limits are. Keep this is mind when developing Twitter-based applications because you may find yourself with an odd error.

Thank you for reading! I hope you enjoyed it.
