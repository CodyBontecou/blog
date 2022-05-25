---
type: 'post'
title: 'Building a Random Movie Picker Using Python and Selenium'
author: { 'name': 'Cody Bontecou', 'image': '/assets/img/cody.64b57256.jpg' }
date: 2020-09-07
description:
category: tutorials
tags:
  - Python
  - Selenium
  - Web-scraping
  - Automation
meta:
  - name: og:title
    content: Building a Random Movie Picker Using Python and Selenium
  - name: og:description
    content: Scraping a list of directors using Selenium with Python to query IMDb's database and randomly select a movie.
  - name: og:image
    content: https://codybontecou.com/images/selenium-movie-picker-meta.png
  - name: og:image:alt
    content: Building a Random Movie Picker Using Python and Selenium
  - name: twitter:title
    content: Building a Random Movie Picker Using Python and Selenium
  - name: twitter:text:title
    content: Building a Random Movie Picker Using Python and Selenium
canonicalUrl: https://codybontecou.com/selenium-movie-picker.html
---

# Building a Random Movie Picker Using Python and Selenium

My wife (Dany) has been reviewing movies every week and posting them on her [Youtube Channel](https://www.youtube.com/channel/UCcLR5qe7dzXR-5UB_nyK_2w). She recently asked me if it was possible to scrape [this list of directors](https://www.elacervo.com/directores)and return a random movie they directed in order to help her decide on which movie to review next.

Sounds like a job for some _good-ol-web-[selenium](https://selenium-python.readthedocs.io/)_.

## How I Chose to Approach this Problem.

> Scraping websites can be finicky. You're at the whim of the content creators markdown decisions.

The markup of [Elacervo](https://www.elacervo.com/directores) is tricky. Their director's page is consistent, but the individual director posts are not. Some director pages have their movie list individual `p` tags while some have their entire movie list formatted within a single `span` element. **This is a problem**.

Rather than trying to hack together a way to get _most_ of the directors videos, I chose to get the list of directors and gather their movie lists from a reliable source.

I chose IMDB's which has a convenient python wrapper around their API [IMDbPY](https://imdbpy.github.io/).

## Why did I pick Selenium as the Tool for this?

Dany is a beginner web developer and is curious about Python. Selenium provides the developer with visual confirmation with the automated browser interactions. Spawning a new browser instance and clicking through the site does impact performance, but I believe the benefits of the visual aspect of Selenium out-weighs the performance issues.

A framework such as [Scrapy](https://scrapy.org/) would provide the data quicker, but a big reason I'm building this is to help Dany learn Python.

## Setting up Selenium to Automate my Browser

Selenium takes a bit of setting up in order to start automating your browser.

Using Python 3's built in package manager [pip](https://pypi.org/project/pip/), download Selenium with the command `pip install selenium`.

> I highly recommend taking advantage of a [virtualenv](https://virtualenv.pypa.io/en/latest/) and creating an isolated Python environment.

You will also need to download the appropriate web driver. Selenium's [documentation](https://selenium-python.readthedocs.io/installation.html#drivers) has links to the most popular browser drivers. For this tutorial, I will be using Google Chrome and [Chromedriver](https://sites.google.com/chromium.org/driver/).

## Using Selenium and Python to Gather the Directors

Below is the code snippet I decided to use. I've appended numbers comments to describe important choices made within the snippet.

```python
import json
from selenium import webdriver

driver = webdriver.Chrome('chromedriver') // 1
driver.get('https://www.elacervo.com/directores') // 2

// 3
for i in range(4):
  time.sleep(5)
  driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

// 4
directors = driver.find_elements_by_css_selector(
  "a[href*='https://www.elacervo.com/post/']"
  )

// 5
unique_directors = []
for link in directors:
  if (link.get_attribute("href")) not in unique_directors:
    unique_directors.append(link.get_attribute("href"))

// 6
names = []
for link in unique_directors:
  slug = link.split('/')[-1]
  name = slug.replace('-', ' ').title()
  names.append({"name": name})

// 7
with open('directors.json', 'w') as outfile:
  json.dump(names, outfile)

// 8
driver.quit()
```

1. `driver = webdriver.Chrome('chromedriver')` - This is where we are telling Selenium to use spawn a new Google Chrome instance. The value, `chromedriver`, that we are passing to the `.Chrome()` method is the location of the chromedriver file we downloaded in the previous step.
2. `driver.get('https://www.elacervo.com/directores')` - Here we are telling our now made Selenium driver to navigate to the URL `https://www.elacervo.com/directores`.
3. The website I am scraping has some lazy-loading logic where only a certain number of directors are loaded until the page is scrolled to the bottom. This is executing some client-side javascript to scroll to the bottom of the page, wait a few seconds for the new directors to load, then scroll to the new bottom of the page.
4. Here I am gathering all of the html events that contain an `a` tag with and `href` that contains `https://www.elacervo.com/post/`. This is using the logic `href*=` which includes the wildcard character `*`.
5. This is extracting the directors URL that is inside the `href` source. It's then placing the URL into a `unique_directors` list. Some of the directors on this page have their link twice so I'm removing any duplicate URLs.
6. I'm cleaning the URL links to simply get the directors names from them. The links gathered look like `https://www.elacervo.com/post/martin-scorsese`. The logic here is taking everything after the last `/` character, replacing `-`'s with spaces, and then capitalizing the first letter of each word within their names.
7. I then using `json.dump` to write the gathered director names into a `json` file for quicker use later on. Reading from a `json` file is **much quicker** than spawning a browser to click around and extract data.
8. `driver.quit()` - This closes the a Selenium Chrome instance.

## Using IMDbPY to Query IMDBs Database

[IMDbPY](https://imdbpy.github.io/) is a pretty neat package for querying IMDB's data. With only a few lines of Python, we can see the entire filmography of a directory.

### This Python Snippet Will Return Every Film for Each Director

```python
import json
from imdb import IMDb

file = open('directors.json',)
directors = json.load(file)

movies = []
ia = IMDb()
for person in directors:
  try:
    director = ia.search_person(person['name'])[0]
    try:
      films = ia.get_person_filmography(director.personID)['data']['filmography']['director']
      for film in films:
        if film['kind'] == 'movie':
          try:
            if (film['year']):
              movies.append(film)
          except KeyError:
            continue
    except AttributeError:
      continue
  except IndexError:
    continue

  with open('movies.json', 'w') as outfile:
    json.dump([{"title": movie['title'], 'year': movie['year']} for movie in movies], outfile)
```

We use Python's built in [open](https://docs.python.org/3/library/functions.html#open) function to open the `directors.json` file we created in the Selenium section. Then using Python's [JSON decoder](https://docs.python.org/3/library/json.html), we can load data from the file into a usable JSON format.

Initializing an IMDb object gives us access to the packages functions, allowing us to query IMDb's database.

The method `.search_person(person['name'])` returns a list of people IMDb has within in their database. It appears the first result in the returned list is the most popular and reasoning behind the `[0]`. For this project, I'm making the assumption that is the director I want to work with.

### Differentiating Movie From Other Film Types

IMDbPY `Movie` objects properties can be seen documented [here](https://imdbpy.readthedocs.io/en/latest/usage/movie.html). For this project, I'm just interested in movies, so I apply a conditional to check, appending the accepted films to a movies list.

It turns out that IMDbPY's Movie object only has the property `year` if the movie has been released, otherwise, it has the property `status`. I only want movies that are watchable now, and filter out the data accordingly.

```python
movies = []
if film['kind'] == 'movie':
    try:
        if (film['year']):
            movies.append(film)
    except KeyError:
        continue
```

### Writing the Movie Data to a Reusable JSON File

Like the data extracted using Selenium, I decided to reduce the number of API requests to IMDb by writing the acquired data into a reusable JSON file.

Rather than extracting all of the IMDb Movie object's data, I decided to simply take the movie's title and year values. In the future, it could be cool to extract additional data allowing for advanced filtering. For example, wanting to only watch a movie between the years 1970 and 1980 with a rating greater than 9.0. Although the IMDb Movie object said it has certain properties, it ended up being a bit finicky and I decided against it for now.

```python
with open('movies.json', 'w') as outfile:
    json.dump([{"title": movie['title'], 'year': movie['year']} for movie in movies], outfile)
```

### Randomly Selecting the Movie From Our List

Now that we have a list of all of the movies from our group of directors in a json file, I can use Python's [random.choice](https://docs.python.org/3/library/random.html#random.choice) to randomly select a movie.

```python
import random
import json

file = open('movies.json')
data = json.load(file)
print(random.choice(data))
```

## Random Movie Watching is fun!

**Seriously** give it a shot. At the very least, randomly select a movie and watch its trailer. Many of these movies I had never heard of but they are fascinating, creative and artistic.

I hope this article was helpful!

<SimpleNewsletter />
<Post />
