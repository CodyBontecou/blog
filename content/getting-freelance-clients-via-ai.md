---
title: Getting freelance clients via AI
draft: true
ignore: true
topics:
  - video
  - script
  - youtube
  - coding
created_at: 2025-02-14T17:17
last_modified: 2025-02-17T06:57
---

This is a brain dump of a video idea I'm interested in making. [Michael Reeves recently posted a video](https://www.youtube.com/watch?v=LwOITqr_fz4) where he used a combination of web scraping, ChatGPT, and Facebook (FB) Marketplace to creatively negotiate for a lower price.

It was very entertaining.

I have this idea of using ChatGPT alongside web scrapers to handle cold-email marketing in an attempt to sell websites to businesses. Cold-email marketing is most likely to succeed when the email is personal. The thought of manually reviewing businesses and emailing them personally sounds awful.

I think a mixture of modern coding tools can automate this. <-- This is the thesis of my experiment.

I will:

1. Automate the retrieval of businesses in a particular category (dermatology, plumbing, etc.)
2. Scrape their current website, google reviews, email, etc.
3. Capture images of each page via the scraper and have ChatGPT/Claude/Deepseek critique the design
4. Create a custom + personal email using an LLM and send it to them.

I think it's a good idea to call out Michael Reeves. I imagine the very first scene being a video of myself watching his video that I mentioned earlier and have it be the blast off to my own process and implementation.

## Update 1:

I wrote out a [basic implementation](https://github.com/CodyBontecou/automated-website-critique) that does the steps 2-4 (I've already implemented step 1 using [AgentQL](https://www.codybontecou.com/scraping-business-data-from-google-maps-using-ai-and-agentql)) from above. So far, I'm not happy with the emails that are being generated. I think it's worth playing this with further to truly automate the entire process. 

TODO:
- [ ] Tweak prompt
- [ ] Try different models
- [ ] Research if there's a dedicated email-generation solution

The generated emails were not great, but the data seems valuable. So, I've begun building a [dashboard](https://github.com/CodyBontecou/website-analysis-dashboard) that sales can use to have insights into selling our services.

![v0 of the dashboard](https://cln.sh/PQJ7hr8w+)

