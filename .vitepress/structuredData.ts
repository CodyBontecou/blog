export interface BlogPostStructuredData {
  '@context': string
  '@type': string
  headline: string
  description: string
  author: {
    '@type': string
    name: string
    url?: string
  }
  datePublished: string
  dateModified?: string
  url: string
  image?: string
  publisher: {
    '@type': string
    name: string
    logo?: {
      '@type': string
      url: string
    }
  }
  mainEntityOfPage: {
    '@type': string
    '@id': string
  }
}

export const generateBlogPostStructuredData = (post: {
  title: string
  description: string
  date: string
  url: string
  image?: string
  lastModified?: string
}): BlogPostStructuredData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: 'Cody Bontecou',
      url: 'https://codybontecou.com/about'
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.lastModified ? new Date(post.lastModified).toISOString() : new Date(post.date).toISOString(),
    url: post.url,
    image: post.image || 'https://codybontecou.com/apple-touch-icon.png',
    publisher: {
      '@type': 'Organization',
      name: 'Cody Bontecou',
      logo: {
        '@type': 'ImageObject',
        url: 'https://codybontecou.com/apple-touch-icon.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url
    }
  }
}

export const generateWebsiteStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cody Bontecou',
    description: 'Personal blog covering web development, Vue.js, TypeScript, and tech insights',
    url: 'https://codybontecou.com',
    author: {
      '@type': 'Person',
      name: 'Cody Bontecou',
      url: 'https://codybontecou.com/about'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://codybontecou.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}