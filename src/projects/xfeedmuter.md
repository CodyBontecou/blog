# X Feed Muter

## Project Overview
- **Type:** Chrome Extension
- **Duration:** June 25, 2024 - June 28, 2024
- **Brief Description:** Quickly mute users, keywords and phrases from your X feed.

## Inspiration
_What motivated you to start this project?_
- The X Feed can be overwhelming with irrelevant or unwanted content. I was tired of manually scrolling past or unfollowing users to avoid seeing their posts. I wanted a solution that allowed me to quickly and easily mute specific users, keywords, or phrases from my feed.

_Any specific problem you were trying to solve?_:
- X has a mute system built-in to the web application. But, it requires clicking through multiple levels of menus. I wanted a solution that was quick and easy to use, ideally right in the feed.

## Features
- Quick Actions: Our extension adds convenient mute buttons next to usernames and trending topics, allowing for instant muting without interrupting your browsing flow.
- Privacy-Focused: All muting preferences are stored within X. We don't store or interact with any of your data.
- Seamless Integration: Once installed, our muting features blend seamlessly with X's interface, providing a native feel to your customized experience.

## Tech Stack
- **Frontend:** Vue, TypeScript
- **Backend:** [Vitesse-Webext](https://github.com/antfu-collective/vitesse-webext)
- **APIs:** [ExtensionPay](https://extensionpay.com): Accept payment for premium features using Stripe.
- **Hosting/Deployment:** [Chrome Web Store](https://chromewebstore.google.com/detail/x-feed-muter/pkhppphhpgoohjablfokmepgfbkaomhj)

## Architecture
- Heavily utilizes `onMessage` and `sendMessage` for communication between extension layers using [webext-bridge](https://github.com/serversideup/webext-bridge).

## Business Model
- **Target Audience:** X Users
- **Monetization Strategy:** Free version with basic features with a premium version with additional features (e.g., inline word muting options, priority support) available for a one-time fee.

## Results/Impact
- **User Adoption:** 1 paid user
- **Performance Metrics:** 107 updates on ProductHunt,
- **Notable Outcomes:** First online dollar made!

## Lessons Learned
- **Technical Skills:** This project was a great opportunity to learn more about building Chrome extensions and working with the WebExtensions API. Communication between extension layers was a challenge, but I learned a lot about using the different utility functions provided by [webext-bridge](https://github.com/serversideup/webext-bridge). This project gave me the confidence that I could build and deploy a professional-grade web extension.
- **Non-Technical Lessons:** Actively sharing the progress of this application on X and ProductHunt were benefitial for the product's minor success.
- **Future Improvements:** I got caught up in the "fail fast, fail often" philosophy. I should have spent more time polishing up the UI and UX before launching. Then spent more time on marketing and outreach.

## Future Enhancements
- No future enhancements planned at this time. I'm not happy with the current state of X so I'll be focusing on other projects.

## Screenshots/Demo
> Apologies for relying on X for demo-links. All of the progress was shared there.

- [https://xfeedmuter.com](https://www.xfeedmuter.com)
- [Inline phrase muting](https://x.com/CodyBontecou/status/1806320715010019332)
- [Mute settings in extension](https://x.com/CodyBontecou/status/1806644727502270539)
