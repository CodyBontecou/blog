---
title: Automate your social media posts with Zapier
author:
  name: Cody Bontecou
  image: https://codybontecou.com/images/cody-abstract.jpeg
date: 2020-06-28
description: This is the page description that will be used
category: tutorials
dropdown: Marketing
topics:
  - automation
  - twitter
  - youtube
  - marketing
  - zapier
canonicalUrl: https://codybontecou.com/automate-with-zapier.html
created_at: 2024-10-31T14:26
last_modified: 2024-11-09T21:19
---

<h1 class="text-4xl font-semibold">Automate Social Media Content With Zapier</h1>

<div class="mt-6 w-full flex items-center justify-center">
  <div class="flex items-center justify-center w-1/2 md:w-full">
    <ZapierLogo/>
  </div>
</div>

Of all of the no-code solutions I've tried <a class="text-black font-medium" href='https://zapier.com/'>Zapier</a> has been the most powerful, intuitive tools to work with.

This article will show you how within a few clicks, you can create a "zap" or system of events that will automatically generate data-enriched messages that will be posted on Twitter whenever you upload a Youtube video.

## Lets get started

Log in and you'll be met with the dashboard with this "Create your own workflow" section.

<div class="flex flex-col items-center justify-center">
  <img
    src="https://lh3.googleusercontent.com/pw/ACtC-3c2Ic3xgKSnI3iYtXZPeaYc0_jq99Q9JEnWNxc6_4xKI-jf8Q_iV61pt84pI-hGKy8OhKltYQ5NgWWR1ogOeVRE48l_R5GqJlLwr_SePq9amgVa1KYPySERsQm5OAXw1zsGhb9or5dp3BuphR08Fo8=w1130-h387-no?authuser=0"
    alt="First step of creating a Zapier Zap, by connecting Youtube with Twitter in their Dashboard's dropdown menu."
  />
  <h4 class="mt-4 text-sm font-light text-gray-500">In the first row, connect Youtube to Twitter.</h4>
</div>

This step is simply connecting two applications together. In this example, I am using Youtube and Twitter. Zapier claims to have over 3000 applications you can integrate.

This is a simple example between two well known social media applications, but Zapier offers an amazing catalog of applications you can create automated workflows with.

<div class="mt-10 flex flex-col items-center justify-center">
  <img
    src="https://lh3.googleusercontent.com/pw/ACtC-3dKVYFDGkQ8h4TT2ZV9EWeiCthB8Wmjnt0qRZuhJaOuDD-SPp0YIa80O6TT8Y3vz11hmacdvpKnFA6GLaKXhEInfg3p0w8pVQ0-M6qMzkqZmDW5DYy9ygAlf7B-5uMEhBcNMBF8ay6xCpF0KZCBMVo=w1130-h257-no"
    alt="Create a Zapier trigger to Post a tweet on Twitter whenever a specific Youtube channel uploads a video."
  />
  <h4 class="mt-4 text-sm font-light text-gray-500">I state a <span class="font-semibold">trigger</span> when a new YouTube video is posted, and an <span class="font-semibold">action</span> to create a tweet.</h4>
</div>

Here is where we state a trigger, which is when a new YouTube video is posted by a particular YouTube channel and an action, which is to create a tweet once the video is posted.

In the .gif you can see there is a decent number of triggers and actions, such as adding a video to a playlist or updating your twitter profile picture.

### Creating a Zap

> Now comes the fun part.

This is where we begin fine tuning the parameters of the trigger and action.

## Zapier Trigger - Making the tweet

### Connect your Zapier to Youtube

<img
  class="mt-8"
  src="https://lh3.googleusercontent.com/pw/ACtC-3e6VrtfxfjJfcC3t45xxbDfBnSDi7iOE1DyM_uSU5kt-uak5omoctc_YZx_EdZ1nMWKrDufq01Ng132BNpKDKFmHDzC6Dk-JVaOf8DXsF0EB5V6u4__Acu2WeBUxfON41Kk5czaAf0csELVV5h1fuc=w1860-h1340-no?authuser=0"
  alt="Create a Zapier trigger to Post a tweet on Twitter whenever a specific Youtube channel uploads a video."
/>

You will have to connect your Youtube account to Zapier using Oauth, then specify the trigger event. In this case, I will be selecting **New Video In Channel**.

### Connect your Youtube's Channel ID

<img
  class="mt-8"
  src="https://lh3.googleusercontent.com/pw/ACtC-3c__qgDzvQNeKFQD1WKPiZeepvfyo_mYbF4GHc8FDz9wlCrbZCsqQPeFP9DiE8McqmG7O1UUiY-wKSzG3mOG2giH3L7_Temo79tEvW0Ea-JWV-zfScuPZOI3otFDn2dfZFjbTg0Ul6jB3m456MIMJI=w1858-h1162-no?authuser=0"
  alt="Connect Youtube Account ID that I want to watch using Zapier"
/>

Here, you will input the Channel ID that you want to watch. To find your Youtube's Channel ID, follow these four steps:

<ul>
  <li class="list-decimal">Sign in to YouTube.</li>
  <li class="list-decimal">In the top right, click your profile picture and then Settings Settings.</li>
  <li class="list-decimal">From the left Menu, select Advanced settings.</li>
  <li class="list-decimal">You’ll see your channel’s user and channel IDs.</li>
</ul>

### Test your trigger

You can test if the trigger is properly connected to your account. Please note: **the test will only work if the Youtube account has already posted a video and the video is public**.

<img
  class="mt-8"
  src="https://lh3.googleusercontent.com/pw/ACtC-3fLsjlrdi7CJMJ1LU2L1Cska8qT2BdC1kmFVZY5W7TbicHL5VCUsMG9PH6nZ_5HqvasId6rBP9J8nXgKGVkjivaFLBWk8sgh2wmZzAqiFyOgKZnT3lNkUal7k0khTtg6FHusibqfj8RwyOBFnhv5SE=w1644-h726-no?authuser=0"
  alt="Test your Zapier trigger"
/>

### Data returned from a successful trigger

If everything is connected properly, you will see a success message and a scrollable window containing the trigger's data that will be available to your actions.

<img
  class="mt-8"
  src="https://lh3.googleusercontent.com/pw/ACtC-3d2JT0dJFAYwkAzZ2JWNIPn6WdHj6VudAqb-ZOLPpRys8TajJn4uAZ04bfw3bX7X3Uh2CEYrNAL1OX3aK1bP3ONaEaxkGuiW87-bdk5qf0f45XXbQSnOrVsqL6M6fwafRvN8aSNokx694o3w2BJnww=w1636-h1252-no?authuser=0"
  alt="Data structure returned from your successful trigger test."
/>

Because we are making a tweet to advertise the video, I imagine a few data points we are interested include the `play_url`, `title`, and `description`. This screenshot doesn't due the data justice, but I will show you how I use this data in the following Twitter action.

## Zapier Action - Making the tweet

### Create Tweet when action is triggered

Fairly self-explanatory, but I'll include a screenshot just incase you need it.

<img
  class="mt-8"
  src="https://lh3.googleusercontent.com/pw/ACtC-3cxxJlY6uHaVZpFVoiKlSj9-xYesSsvYVpJKIGgpDoDzkmDZX4URs9AbkkqpAn5k-kYgukykI_dbDbwgI-1GPaMTESpu_UGIHTUHbi3_rB0P1YFxi8grkV1vxiamkoa-teElVulRkbBuJCBKvfHhqw=w1910-h1156-no?authuser=0"
  alt="Select Create Tweet for Twitter trigger."
/>

### Setting up the action

Setting up the action is where we can play with the data and generate our tweet.

<img
  class="mt-8"
  src="https://lh3.googleusercontent.com/pw/ACtC-3dOkE-3EMhBEnPmVlcTKnV10BFPhh_99ANgKFuccknTW2S-pfR1ltGPdJktEXVd03-1hxZifdKtYAqWA12mbh66uHRUgnud4fALSag2_mClJKIZiTCh5Ytqvn7mzEolGNI2kRr_Hm3zhbUT6A-WSIw=w1656-h1190-no?authuser=0"
  alt="Showcase of data provided by Youtube video trigger"
/>

While setting up the action, you are able to generate a message for your tweet. There is an "Insert Data ..." option that allows you to insert data that was gathered when the Youtube trigger occurred. In the screenshot above, you can see some of the video data points such as `title`, `url` and `description` are available to be used within the tweet.

I decide not to shorten the URl because I imagine users are more familiar with Youtube URL's than they are with Zapier's shortened URL's.

## The generated tweet

Now you should see the ability to test your action. **Testing this action will send the message to Twitter**. You can see within the action's `Message` field the Twitter tweet that was generated and will be sent to Twitter if the action is executed with this particular video that we tested it with.

In our case, we are getting an undefined because the video we uploaded to test this didn't actually have a description when uploaded. Keep that in mind when using this automated workflow.

<img
  class="mt-8"
  src="https://lh3.googleusercontent.com/pw/ACtC-3eAzg5ycqHYSnl2QA1ts3x__yIpO5pEkbWC0Vec4RO_h2jR6kXba3LrOUgoCoYzREJGlGxq2lQOWJ22PA7Uv1Uy9N2809zPjM1Y9gYMJuOdPQFHxMMQ7uI3EwLOOSlKcLE5llOS4bHARZSAPXhRO6I=w1680-h974-no?authuser=0"
  alt="Test your Twitter action and see the generated tweet"
/>

# Success!

If all went well, you should now be able to automate Twitter tweets alongside your Youtube video uploads. I hope this article was helpful. Best of luck with your automation journey!
