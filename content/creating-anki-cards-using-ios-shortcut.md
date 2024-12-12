---
title: Creating Anki cards using iOS shortcut
draft: false
ignore: false
topics:
  - anki
  - ios
  - shortcut
date: 2024-12-08T12:45
created_at: 2024-12-08T12:45
last_modified: 2024-12-12T16:30
---

[Anki](https://apps.ankiweb.net/) is a modern approach to the classic flash cards. Where it excels is in the use of [spaced repitition](https://en.wikipedia.org/wiki/Spaced_repetition).

Rather than take a deck of cards and studying it from top to bottom, Anki provides a way to surface cards are the correct time right as it's about to leave your memory bank. 

This has proven to be a very powerful form of studying, and is becoming increasingly popular in fields like medicine and language where memorization is essential.

The goal here is to create an Apple shortcut that allows me to extract content from the native Books application, creating Anki cards that help me study the content I am reading.

Here's an example of the iOS Shortcut running:

![Converting copied Books text to Anki card](https://i.imgur.com/EVpwhVY.gif)
## Challenges

There were a few surprising challenges that came along with this shortcut.

1. iOS does not allow a Shortcut within the share sheet of Books
2. Copying content from Books appends a string that states "Excerpt From <BOOK_NAME>. This material may be protected by copyright."

I had hoped to use a share sheet with this shortcut. It makes sending input to a Shortcut quick and easy. But, I haven't found a solution to the share sheet issue.

 So, I decided I'll have to simply clean the "Expert ..." text that comes alongside a copy prior to inserting the content into Anki cards.

### Cleaning Book app's text

I split the text cleaning into it's own shortcut.  Here's a link to it if you wish to install it: https://www.icloud.com/shortcuts/9f9cfa9c71e24dee901590d185951323

It consists of receiving the text input, splitting away the "Excerpt..." string using a `Split` action, and then cleaning additional pieces of the text such as `\n`, `" "`, `"`, and `“`.

It then URL encodes the text due to the nature of our Anki solution.

### Creating the Anki Card

Here's a link to this Shortcut if you wish to install it: https://www.icloud.com/shortcuts/29bb096aaed54e0ca4236f8c1008d9d9

Given the share sheet limitation, I decided to use the clipboard for input.

When the action is ran, it will take the content in your clipboard and save it to the `Front` variable, which will be the front card of your new Anki card.

The action will then re-open the Books app. The next time you open your Shortcut, the Shortcut will accept whatever value is in your clipboard for the `Back` variable which will be the value placed on the back of your new Anki card.

So, in this case, I recommend copying a new value from the book you are reading and returning to the Shortcut app. 

At this point, it will clean both `Front` and `Back` strings, and appending these values to the following Text value:

```
anki://x-callback-url/addnote?profile=bonteq&type=Basic&deck=shortcut&fldFront=CleanedFront&fldBack=CleanedBack
```

The action will open this url, which opens Anki, adding the card to the deck.

In this case, my profile name is `bonteq` and I have a deck named `shortcut`. **You'll want to adapt this string to your personal settings.**

I've yet to find myself needing anything more than a `Basic` card type, so that's also set within this URL.

## Conclusion

These values could be adjusted to be a bit more dynamic. But, I personally don't want to have to manage input fields every time I want to create a card. 

This Shortcut setup is what I found to work best for me. Creating Anki cards from content I am reading with as little disruption to my reading as possible.

I hope you find this valuable and it's able to help you! Please, don't hesitate to suggest changes to the Shortcut. I'm fairly new to creating them and like to think there is a better way.