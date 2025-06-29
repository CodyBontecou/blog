export default {
  paths() {
    // All actual topics extracted from your blog posts
    const topics = [
      "a11y", "agentql", "agents", "ai", "anki", "art", "atlas", "authentication", 
      "automation", "aws", "blogging", "caffeine", "california", "carbon", "cars", 
      "cli", "coding", "communication", "components", "composition", "configuration", 
      "consistency", "construction", "css", "cypress", "data", "diy", "driving", 
      "drugs", "electron", "elixir", "events", "frontmatter", "gaming", "google", 
      "huggingface", "i18n", "imdb", "interview", "ios", "javascript", "job", 
      "keybinds", "learning", "life", "llm", "localization", "macos", "mailchimp", 
      "marketing", "mcp", "minimalism", "mobile", "mocking", "mongodb", "mswjs", 
      "nextjs", "nitro", "nodejs", "nuxt", "nuxt content", "obsidian", "onboarding", 
      "open-source", "organization", "pinia", "plugins", "putter", "putterville", 
      "python", "ramble", "rant", "react", "recipe", "reddit", "reflection", 
      "repair", "rv", "sagemaker", "scraping", "script", "selenium", "seo", 
      "shortcut", "startup", "state", "stripe", "stylus", "tailwind", "talks", 
      "tdd", "terminal", "testing", "transformers", "transformers.js", "travel", 
      "tweepy", "twitter", "typescript", "ui", "vanlife", "vercel", "video", 
      "vite", "vitepress", "vue", "vue-router", "vuepress", "vuetify", "warcraft", 
      "web-scraping", "work", "writing", "yaml", "youtube", "zapier", "zsh"
    ]
    
    return topics.map(topic => ({
      params: { topic }
    }))
  }
}