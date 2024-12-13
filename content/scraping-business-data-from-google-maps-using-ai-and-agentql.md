---
title: Scraping business data from Google Maps using AI and AgentQL
draft: false
ignore: false
topics:
  - ai
  - scraping
  - agentql
date: 2024-12-05T16:04
created_at: 2024-12-05T16:04
last_modified: 2024-12-12T16:58
---

Writing web scraping scripts by hand typically follows a development pattern like:

1. Find the xpath/locator for a piece of data I'm interested in
2. Select the data needed
3. Make it resilient if the element/data isn't there

This can be an exhausting process, taking tons of time clicking through the rendered web page to find the code you want to use as your locator.

## Using AI to solve this

[AgentQL](https://agentql.com/) provide what they call "an AI-native query language" to make the developer experience of web scraping much easier to do.

Rather than having to write complex DOM selection code, you can instead query the rendered pages using a custom query language that AgentQL provicdes. Here is an example query that I use to target [Google's](https://google.com) search input and Google Search button:

```js
{
	search_box
	submit_btn
}
```


This query returns these two elements:

![highlighted Google landing page showcasing what elements the agentql query locates](https://i.imgur.com/gtDt10y.png)

And now I have the ability to type into the search box and click the submit button.

## Comparing AgentQL to traditional Playwright

Written out in Javascript using Playwright, this looks like:

```js
// playwright_example.js
const inputQuery = "'plumbing' inurl:business.site santa rosa"
const searchBox = await page.$('xpath=//*[@id="APjFqb"]')

if (searchBox) {
	await searchBox.fill(inputQuery)
	await searchBox.press('Enter')
} else {
	console.error('Search box not found.')
}
```

Using AgentQL, it looks like:

```js
// agentql_example.js
const inputQuery = "'plumbing' inurl:business.site santa rosa"
const formQuery = `{
	search_box
	submit_btn
}`

const response = await page.queryElements(formQuery)
await response.search_box.type(inputQuery)
await response.submit_btn.click()
```

I find the AgentQL example to be more explicit. Querying the page using natural language makes understanding what the code is doing easier.

Querying the xpath `'xpath=//*[@id="APjFqb"]'` in Playwright provides zero information for me in this example. It's worth mentioning, the id `APjFqb` is likely auto-generated and will change in the future, making this script fragile.

This is a basic example that only accesses a single element, but later on we will need to iterate over many businesses, gathering multiple pieces of data from each business.

### inputQuery

The `inputQuery` value of `"'plumbing' inurl:business.site santa rosa"` is using an alternative Google search syntax to find the businesses I'm interested in processing. 

Here’s a breakdown of the components of the query:

1.  `plumbing`: This part specifies that the search results should include the term “plumbing”. It’s a keyword that indicates the type of service or business you are interested in.
2. `inurl:business.site`: The ⁠inurl: operator tells Google to look for web pages that contain “business.site” in their URL. This is typically associated with Google My Business websites or pages created on Google’s business site platform, which allows small businesses to create a free website. Therefore, this portion of the query is targeting business webpages that are likely to represent local businesses, possibly small plumbing companies.
3. `santa rosa`: This part of the query specifies a geographic location, in this case, Santa Rosa. Google will prioritize results that are relevant to this location.

## Gathering business data

Let's scrap the example from earlier, and now explore Google Maps.

The problem we're solving is gathering business data within specific locations. I'm not sure of a better source for this than Google Maps. Let me know if you know of a better option!

### Installation

First, install the AgentQL library:

```bash
npm install agentql
```
### API Key

You'll also need an API key. Navigate to https://dev.agentql.com/api-keys and create one. In the code examples I show, you'll see `configure({ apiKey: '' })`. Assume the `''` is actually the api key AgentQL provided.

I recommend utilizing a `.env` file but for the simplicity of this project, we'll avoid any setup or further mention of proper environment variable management.
### Script

Start with this basic script:

```js
// main.js
const { wrap, configure } = require('agentql')
const { chromium } = require('playwright')

const queryMap = async () => {
    // Configure the AgentQL API key
    configure({ apiKey: '' })

	// Launch a headless browser using Playwright.
    const browser = await chromium.launch({ headless: false })

    // Create a new page in the browser and wrap it to get access to the AgentQL's querying API
    const page = await wrap(await browser.newPage())
    await page.goto('https://www.google.com/maps')
}
```

Bring in what we discussed earlier, using AgentQL to query for the search box using the `.queryElements()` function:

```js
// main.js
const elements = await page.queryElements(`{ search_box }`)
await elements.search_box.type("'plumbing' inurl:business.site santa rosa")
await elements.search_box.press('Enter')
```

This will search Google Maps, showing all of the businesses listed on Google Maps that are classified as plumbing and in the Santa Rosa area.

```js
// main.js
const data = await page.queryData(`{
  business[] {
	name
	website_url
	address
	rating
	review_count
	service_type
  }
}`)

console.log(data)
```

Now we can use the `.queryData()` function to extract data to fit the structure we provide. 

In this query, I am defining a data structure `business[]`. This forces AgentQL to return a business array that contains objects with the name, website_url, ..., service_type fields.

Running the queryData code above, I received this response:

```json
{
  business: [
    {
      name: 'United States Plumbing',
      website_url: 'http://unitedstatesplumbing.net/',
      address: '445 S E St #12',
      rating: 4.9,
      review_count: 57,
      service_type: 'Plumber'
    },
    {
      name: '707 Plumbers, Inc. & Electric',
      website_url: 'https://707plumbersinc.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp-listing',
      address: '860 Piner Rd Suite 18',
      rating: 5,
      review_count: 93,
      service_type: 'Plumber'
    },
    {
      name: 'PACE Supply',
      website_url: 'http://www.pacesupply.com/',
      address: '3033 Dutton Ave',
      rating: 4.6,
      review_count: 91,
      service_type: 'Plumbing supply store'
    },
    {
      name: 'Curoso Plumbing Inc.',
      website_url: 'http://curosoplumbing.com/?utm_campaign=gmb',
      address: '1925 Fulton Rd',
      rating: 5,
      review_count: 151,
      service_type: 'Plumber'
    },
    {
      name: 'A Better Plumbing Company | Plumber Santa Rosa',
      website_url: 'https://abetterplumbingcompany.com/',
      address: '1410 Neotomas Ave',
      rating: 5,
      review_count: 14,
      service_type: 'Plumber'
    },
    {
      name: 'Maples Plumbing & Heating',
      website_url: 'https://www.maplesservice.com/',
      address: '280 Castro Ct',
      rating: 4.9,
      review_count: 101,
      service_type: 'Plumber'
    },
    {
      name: 'Custom Plumbing of Northern California, Inc.',
      website_url: 'http://gocustomplumbing.com/',
      address: '3100 Dutton Ave Suite 128',
      rating: 4.2,
      review_count: 5,
      service_type: 'Plumber'
    },
    {
      name: 'Super Service Plumbing',
      website_url: 'https://superserviceplumbing.com/',
      address: '2833 Dowd Dr A',
      rating: 4.9,
      review_count: 48,
      service_type: 'Plumber'
    }
  ]
}
```

## Conclusion

> And there we have it.

I haven't found a fundamental shift in how the problem is being solved. You can still write the scraping logic by hand and have it be every bit as robust and probably more efficient. But these tools are allowing me to extract data using web scraping much quicker than before.

With a bit of creative engineering, I can see patterns appear that allow for much broader queries that are flexible and applicable to a wide array of websites. I've enjoyed my initial dip into this tool and am excited to see where it goes.

You can find the code repository on Github [here](https://github.com/CodyBontecou/scraping-business-data-from-google-maps-using-ai-and-agentql).