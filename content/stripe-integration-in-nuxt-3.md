---
type: post
author:
  name: Cody Bontecou
  image: /assets/img/cody.64b57256.jpg
date: 2024-08-21
last_modified_date: 2024-08-21
title: Stripe Integration in Nuxt 3
description: Learn how to seamlessly integrate Stripe's powerful payment processing system into your Nuxt 3 web application. This comprehensive guide covers everything from initial setup to implementing secure checkout flows, enabling you to accept payments and manage transactions with ease. Perfect for developers looking to add robust e-commerce capabilities to their Nuxt 3 projects.
slug: stripe-integration-in-nuxt-3
dropdown: NuxtJS
meta:
  - name: og:description
    content: Learn how to seamlessly integrate Stripe's powerful payment processing system into your Nuxt 3 web application. This comprehensive guide covers everything from initial setup to implementing secure checkout flows, enabling you to accept payments and manage transactions with ease. Perfect for developers looking to add robust e-commerce capabilities to their Nuxt 3 projects.
  - name: og:image
    content: https://codybontecou.com/images/stripe-integration-in-nuxt-3.png
  - name: og:image:alt
    content: Learn how to seamlessly integrate Stripe's powerful payment processing system into your Nuxt 3 web application. This comprehensive guide covers everything from initial setup to implementing secure checkout flows, enabling you to accept payments and manage transactions with ease. Perfect for developers looking to add robust e-commerce capabilities to their Nuxt 3 projects.
  - name: og:title
    content: Stripe Integration in Nuxt 3
  - name: twitter:title
    content: Stripe Integration in Nuxt 3
  - name: twitter:text:title
    content: Stripe Integration in Nuxt 3
canonicalUrl: https://codybontecou.com/stripe-integration-in-nuxt-3.html
topics:
  - nuxt
  - stripe
  - authentication
created_at: 2024-10-31T14:26
last_modified: 2025-01-15T17:38
---
## 01 - Introduction

Welcome to my Nuxt + Stripe tutorial.
This course covers Authentication with @sidebase/nuxt-auth and Github, Stripe Checkout, Stripe Billing Portal, Stripe Webhooks, Stripe Subscriptions, and more.

Each branch of this repo represents a different section of the course. For example, branch 01-installation should be 1:1 with the first video of the course.

At the end of this course, you will have a page similar to this setup and deployed online, accepting payments with Stripe.

All of the code is hosted on my Github in my [nuxt-stripe](https://github.com/codybontecou/nuxt-stripe) repo. Each branch represents the specific section of the course.


![landing page|500](https://cln.sh/dKfgxlB3+)

## 02 - Installation

Let's get your project installed and running. This lesson is all about front-loading our dependencies so we don't have to worry about them in later lessons.

Start by creating a Nuxt application if you do not already have one set up. Run the following command to do this:

`npx nuxi init nuxt-stripe`
### Auth Dependencies

We'll be relying on [Nuxt Auth](https://auth.sidebase.io) for our authentication needs. This is a wrapper around Next Auth that makes it easy to use with Nuxt. There is an issue that makes Nuxt Auth reliant on next-auth version 4.21.1, so we'll install that version specifically.

`npm install @auth/core @sidebase/nuxt-auth@^0.9.0 next-auth@4.21.1`

### DB Dependencies

[Prisma](https://www.prisma.io) is my go-to ORM for Node.js projects. It's easy to use and has a great query builder. We'll be using it to interact with our database.

If you prefer a different solution, use it. There's nothing specific that Prisma solves that other ORM's and database drivers don't. It's just my preference and what I will be showing in the code snippets.

`npm install prisma @prisma/client @next-auth/prisma-adapter`

### UI Dependencies

The UI for this project will be built with [Tailwind CSS](https://tailwindcss.com) and [Headless UI](https://headlessui.com). Headless UI is a collection of unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.

I'm using components directly from [TailwindUI](http://tailwindui.com). Because this is a course on Nuxt and Stripe, I won't be explaining much about the UI. I'm just bringing these dependencies in for presentation reasons.

`npx nuxi@latest module add @nuxtjs/tailwindcss`

`npm install @headlessui/vue @heroicons/vue`

### Stripe Dependencies

Stripe is easy. We'll only need one dependency: the Stripe Node.js library.

`npm install stripe`

### TLDR:

You can expedite this running these commands:

`npx nuxi init nuxt-stripe`

`npm install @auth/core @sidebase/nuxt-auth next-auth@4.21.1 prisma @prisma/client @next-auth/prisma-adapter @headlessui/vue @heroicons/vue stripe`

`npx nuxi@latest module add @nuxtjs/tailwindcss`

## 03 - Auth

> Now we can begin!

Authentication requires setting up a few things:

1. The `auth` and `runtimeConfig` sections of the `nuxt.config.ts` file.
2. `.env` file to manage environment variables.
3. The `[...].ts` file located at `server/api/auth/[...].ts`.
4. Prisma and our database schema
5. Clientside code to sign in and sign out

### `nuxt.config.ts`

### 1. nuxt-auth module

We need to add our newly installed `@sidebase/nuxt-auth` package to our Nuxt config's `module` array.

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  ...,
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth']
})
```

#### Runtime Config

The recommended way of exposing our environment variables is to use Nuxt's [Runtime Config](https://nuxt.com/docs/guide/going-further/runtime-config). This enables us to utilize the `useRuntimeConfig` composable on both client and server which gives us access to environment variables.

Let's add the environment variables we need to roll out authentication.


```ts
// nuxt.config.ts

export default defineNuxtConfig({
  ...,
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  runtimeConfig: {
	AUTH_SECRET: process.env.AUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  }
})
```

I'll explain where `AUTH_SECRET`, `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` come from later in this article.

#### auth config

Now, we need to add the `auth` config. The configuration options be explored further in [Sidebase's docs](https://auth.sidebase.io/guide/application-side/configuration).

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  ...,
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  runtimeConfig: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  },
  auth: {
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs',
      defaultProvider: 'github',
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    },
  },
})
```

**Note:** I am not doing any custom `auth` configuration and am simply providing the default configuration that their [documentation](https://auth.sidebase.io/guide/application-side/configuration) suggests.

### 2. .env file

The `.env` file is where we manage environment variables, specifically, secret keys that we do not want to to end up in source control. Create the file if you do not already have one, and place it in your project's root directory. This file will grow with time, but initially, we just need three keys:

```toml
// .env
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
AUTH_SECRET=
```

To get the values, you'll need to fill out this [Github application](https://github.com/settings/applications/new).  Here's what my form looks like:

![image|500](https://cln.sh/kJjW3vSQ+)

- **Application Name**: Name this whatever you like
- **Homepage URL:** This should be set to the port you are developing your application on. Nuxt's default is on port 3000 so that is what I set it to. Configure this as needed.
- **Authorization callback URL:** Same as the Homepage URL, I am using the default port 3000. What is **important** here is the `/api/auth/callback/github`. This is the default endpoint Nuxt Auth provides and is important for our authentication flow.

You should now see the Client ID and the ability to generate a Client Secret:

![github oauth panel|500](https://share.cleanshot.com/XM6tYFt8+)

Place **your** Client ID and Client Secret values into your .env file.

```toml
// .env
GITHUB_CLIENT_ID=Ov23liXNQBrzCfy450re
GITHUB_CLIENT_SECRET=ab00828302cd662072eaffe70c41f048d3879536
AUTH_SECRET=
```

> The values I am showing have already been deleted and will not work. You must generate your own.

`AUTH_SECRET` is a secret key that we must generate ourselves. The secret is a random string used to hash tokens, sign and encrypt cookie and generate cryptographic keys. This isn't necessary for development, but is **required** once the application is deployed.

Run `openssl rand -base64 32` in your terminal to generate this value. Copy and paste the output into your `.env` file and store it within `AUTH_SECRET`.

You can read more about in the [NuxtAuth docs](https://auth.sidebase.io/guide/authjs/nuxt-auth-handler#secret).

### 3. `server/api/auth/[...].ts`

Next up is our `[...].ts` file. This will be where the majority of the code that configures our authentication logic is held.

If you're not familiar, [...] is the Nuxt syntax for a [catch-all route](https://nuxt.com/docs/guide/directory-structure/server#catch-all-route).

By placing it at the endpoint `api/auth/[...].ts`, it allows there to be many valid values after `api/auth/`. Some of the defaults that are included with @sidebase/nuxt-auth include `api/auth/signin` and `api/auth/signout`.

Let's start with this code snippet:

```ts
// server/api/auth/[...].ts
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const runtimeConfig = useRuntimeConfig()
const prisma = new PrismaClient()

export default NuxtAuthHandler({
  secret: runtimeConfig.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    // @ts-expect-error
    GithubProvider.default({
      clientId: runtimeConfig.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
    }),
  ],
})
```

1. **Secret:** We use our `runtimeConfig` to access our `AUTH_SECRET` and `GITHUB_*` environment variables.
2. **Adapter:** We create a new `PrismaClient` that is passed to the NuxtAuthHandler's `adapter`.
	- "Adapters are the bridge we use to connect NuxtAuth to your database." ([docs](https://authjs.dev/getting-started/database?_gl=1*1ry7ee*_gcl_au*NDc1MTI5NzEzLjE3MjM3Njg4Njk.)) Adapter's provide the functions that NuxtAuth call when authentication occurs. For example, when a user is created, NuxtAuth will call the PrismaAdapter's `createUser` function.
	- [Here's a reference to the PrismaAdapter code if you are curious.](https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-prisma/src/index.ts)
4. **Providers**: This is an array of the authentication providers we enable.
	- In this course, we will only use Github. You can see we import the `GithubProvider` from `next-auth/providers/github`. There are lots of providers you can hook into in a similar way. Check out [Auth.js' docs](https://authjs.dev/getting-started/providers/github) for a larger list of built-in provider options.

### 4. Prisma ORM + Database Schema

[Prisma ORM](https://www.prisma.io/orm) is the database management tool I chose to use for this tutorial. It helps manage the database schema, database migrations, and database queries using Typescript.

When a user logs in, we use the `PrismaAdapter` to save the logged in user into our database. This is essential if we are to collect payments from them and persist their subscription status.

You should already have Prisma installed. But there is an additional command we have to run:

`npx prisma init --datasource-provider sqlite`

This will:
- Create a prisma directory in your application.
- Set the `DATABASE_URL` environment variable in your `.env` file to a local sqlite database
- Create a base `schema.prisma` file within the prisma directory pointing to your `DATABASE_URL`

```ts
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Following Auth.js [Prisma Adapter docs](https://authjs.dev/getting-started/adapters/prisma), we need to update the schema to:

```ts
// schema.prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String          @id @default(cuid())
  name          String?
  email         String?         @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model VerificationToken {
  identifier String
  token      String
  expires    DateTime

  @@unique([identifier, token])
}
```

**Note:** I deleted the optional `Authenticator` table from the documentation. We will not be implementing WebAuthn support.

This schema creates the tables used for the authentication flow. But, we need to run two additional commands:

`npx prisma generate` - This generates Typescript types that mirror your database schema, giving us excellent auto-complete and type-errors.

`npx prisma migrate dev` - This creates the migration file that contains the SQL that is then applied to your database. This command will prompt you to enter a name for the migration. This can be anything and should be used to describe the changes made to your database.

Your prisma directory should now look like:

```shell
prisma
- migrations
-- migrationName directory
--- migration.sql
-- migration_lock.toml
- dev.db
- dev.db-journal
- schema.prisma
```

We should now be hooked up and ready to authenticate on the client.
### 5. Client-side Authentication

> Let's now interact with the server-side code on the client.

First, convert your `app.vue` file to navigate users to `NuxtPage`:

```html
// app.vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

And create a `pages` directory with the file `index.vue`:

```html
// pages/index.vue
<script lang="ts" setup></script>

<template>
  <div>Hello World</div>
</template>
```

We can now hook into the [useAuth](https://auth.sidebase.io/guide/application-side/session-access#useauth-composable) composable exposed by @sidebase/nuxt-auth and create signin and signout buttons as well as dynamically rendering the user's authentication status.

```html
// pages/index.vue
<script lang="ts" setup>
const { status, signIn, signOut } = useAuth()
</script>

<template>
  <div>You are currently {{ status }}.</div>
  <div v-if="status === 'authenticated'">
    <button @click="signOut()">Sign out</button>
  </div>
  <div v-else>
    <button @click="signIn('github')">Sign in with GitHub</button>
  </div>
</template>
```

**Optional:** Here's a code snippet with a bit of styling:

```html
// pages/index.vue

<script setup lang="ts">
const { status, signIn, signOut } = useAuth()
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="flex flex-col gap-4">
      <div>You are currently {{ status }}.</div>
      <div>
        <div v-if="status === 'authenticated'">
          <button
            class="flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            @click="signOut()"
          >
            Sign out
          </button>
        </div>
        <div v-else>
          <button
            @click="signIn('github')"
            class="flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clip-rule="evenodd"
              />
            </svg>
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```

You should now be able to sign in and out using Github!

## 04 - Pricing Page

> This section is optional but I think many people will appreciate it.

We will create the pricing page that people tend to expect when buying an online product:

![Pricing Page|800](https://cln.sh/dKfgxlB3+)

### Auth Menu / Avatar

Let's start with the avatar in the top right corner.

When logged in, this will show the avatar image you are using on Github. When logged out, this will be a simple sign in button. It also has a few dropdown menu options.

![Auth Menu|300](https://cln.sh/Pq0tptg2+)

This component heavily relies on TailwindCSS and [HeadlessUI](https://headlessui.com/v1/vue).

I start with the `AuthAvatar`, which is simply the circle with the image in it:

```html
// components/AuthAvatar.vue
<script lang="ts" setup>
interface Props {
  src: string | null | undefined
}
defineProps<Props>()
</script>

<template>
  <img
    v-if="src"
    class="inline-block h-10 w-10 rounded-full bg-gray-500"
    :src="src"
    alt="User avatar"
  />
  <span
    v-else
    class="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100"
  >
    <svg
      class="h-full w-full text-gray-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </span>
</template>
```

And then I use this within the `AuthMenu` component. It's a relatively simple component once HeadlessUI does the heavy lifting:

```html
// components/AuthMenu.vue
<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
const { data, signOut } = useAuth()
const solutions = [
  { name: 'Manage Billing', fn: () => {} },
  { name: 'Sign Out', fn: signOut },
]
</script>

<template>
  <Popover class="relative">
    <PopoverButton
      class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
    >
      <AuthAvatar :src="data?.user?.image" />
    </PopoverButton>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <PopoverPanel
        class="absolute left-1/2 z-10 mt-2 flex w-screen max-w-min -translate-x-[90%] px-4"
      >
        <div
          class="w-44 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5"
        >
		 <button
            v-for="item in solutions"
            :key="item.name"
            @click="() => item.fn()"
            class="block p-2 hover:text-indigo-600"
          >
            {{ item.name }}
          </button>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
```

### Pricing Section

Now, let's implement the `PricingSection`, which contains the cards and the majority of the UI:

```html
// components/PricingSection.vue
<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'
const { status, signIn } = useAuth()
const handleBuyNow = () => {
  if (status.value === 'authenticated') {
  } else {
    signIn('github')
  }
}
const tiers = [
  {
    name: 'Freelancer',
    id: 'tier-freelancer',
    href: '#',
    priceMonthly: '$24',
    description: 'The essentials to provide your best work for clients.',
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
    mostPopular: false,
  },
  {
    name: 'Startup',
    id: 'tier-startup',
    href: '#',
    priceMonthly: '$32',
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$48',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
    ],
    mostPopular: false,
  },
]
</script>

<template>
  <div class="bg-white py-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base font-semibold leading-7 text-indigo-600">
          Pricing
        </h2>
        <p
          class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          Pricing plans for teams of&nbsp;all&nbsp;sizes
        </p>
      </div>
      <p
        class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600"
      >
        Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi
        iusto modi velit ut non voluptas in. Explicabo id ut laborum.
      </p>
      <div
        class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <div
          v-for="(tier, tierIdx) in tiers"
          :key="tier.id"
          :class="[
            tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
            tierIdx === 0 ? 'lg:rounded-r-none' : '',
            tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
            'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
          ]"
        >
          <div>
            <div class="flex items-center justify-between gap-x-4">
              <h3
                :id="tier.id"
                :class="[
                  tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8',
                ]"
              >
                {{ tier.name }}
              </h3>
              <p
                v-if="tier.mostPopular"
                class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600"
              >
                Most popular
              </p>
            </div>
            <p class="mt-4 text-sm leading-6 text-gray-600">
              {{ tier.description }}
            </p>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-4xl font-bold tracking-tight text-gray-900">{{
                tier.priceMonthly
              }}</span>
              <span class="text-sm font-semibold leading-6 text-gray-600"
                >/month</span
              >
            </p>
            <ul
              role="list"
              class="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li
                v-for="feature in tier.features"
                :key="feature"
                class="flex gap-x-3"
              >
                <CheckIcon
                  class="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {{ feature }}
              </li>
            </ul>
          </div>
          <button
            @click="handleBuyNow"
            :aria-describedby="tier.id"
            :class="[
              tier.mostPopular
                ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
              'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            ]"
          >
            Buy plan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```

These component's are entirely UI-related right now with some auth-related logic sprinkled in. In later sections, we will expand on them and implement the Stripe-related code.

### App.vue

One thing I like to do is place the `AuthMenu` within my `app.vue` file in my root. This ensures the user menu is available throughout the web application, giving users the ability to logout and manage their settings.

```html
// app.vue
<script setup lang="ts">
const { status, signIn } = useAuth()
</script>

<template>
  <div>
    <div class="right-4 top-4 absolute">
      <AuthMenu v-if="status === 'authenticated'" />
      <button v-else @click="() => signIn('github')">Sign In</button>
    </div>
    <NuxtPage />
  </div>
</template>
```

## 05 - Stripe Customer

> Let's begin integrating Stripe into our Nuxt application

We're going to begin by creating a [Stripe Customer](https://docs.stripe.com/api/customers) when a user is created in our system, and syncing our data with Stripe's. The customer will maintain the relationship between our data and Stripe's and be how we access Stripe's endpoints.

### Stripe environment setup

Like with most 3rd-party API's we integrate with, we will need to add a few API keys. We'll place these values into our `.env` file.
The last time we worked with our `.env` file, it looked like this:

```shell
// .env
GITHUB_CLIENT_ID=<YOUR_VALUE>
GITHUB_CLIENT_SECRET=<YOUR_VALUE>
AUTH_SECRET=<YOUR_VALUE>
```

Let's add a few variables to this file:

```shell
# .env

# OAUTH
GITHUB_CLIENT_ID=<YOUR_VALUE>
GITHUB_CLIENT_SECRET=<YOUR_VALUE>

# AUTH
AUTH_SECRET=<YOUR_VALUE>

# DB
DATABASE_URL=<YOUR_VALUE>

# STRIPE
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET_KEY=
```

**Note:** When you ran `npx prisma init --datasource-provider sqlite` earlier, the `DATABASE_URL` value should have been generated. It's the a path to your database.

The new keys we'll be adding are `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET_KEY`.

To get these, navigate to [stripe.com](https://stripe.com) and create an account. You should then see a banner similar to this:

![stripe banner|500](https://cln.sh/1kcXgYJR+)

 > The highlighted regions are the `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` values.

 **Note:** We'll add the `STRIPE_WEBHOOK_SECRET_KEY` value in the next lesson.

With these environment variables in place, make sure to add them to your `runtimeConfig` within your `nuxt.config.ts` file:

```ts
export default defineNuxtConfig({
  ...,
  runtimeConfig: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET_KEY: process.env.STRIPE_WEBHOOK_SECRET_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
  ...,
})
```

### DB Schema Changes

We need to make a few minor adjustments to our Database's `Account` table. We need a `stripe_customer_id` value which connects our user's Account to Stripe so we can query [customer endpoints](https://docs.stripe.com/api/customers). We're also going to use a basic `is_subscribed` boolean to keep track of whether the user is subscribed or not.

Add these values to your `schema.prisma` file:

```ts
  stripe_customer_id String? @unique
  is_subscribed      Boolean @default(false)
```

Your `Account` schema should now look like this:

```ts
// schema.prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  stripe_customer_id String? @unique
  is_subscribed      Boolean @default(false)

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

After these changes, make sure to run `npx prisma generate` and `npx prisma migrate dev`. Name the migration whatever you think is appropriate.

### Stripe Util

Create a file located at `server/util/stripe.ts`. This is a simple utility file that will create a new stripe object that we will pass around our application as needed.

```ts
// server/util/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(useRuntimeConfig().STRIPE_SECRET_KEY)
```

### Create Customer on Sign Up

The goal here is after we create a User's Account in our database we create the Stripe Customer and save the Stripe Customer's id in our Account table.

To do this, we need to hook into the `PrismaAdapter` that is used within our `api/auth/[...].ts` endpoint, and extend it to call Stripe's API.

In [...].ts, import our stripe utility:

```ts
import { stripe } from '~/server/utils/stripe'
```

Then in our `NuxtAuthHandler`, we need to use the spread operator on our `PrismaAdapter` and override the `linkAccount` function:

```ts
 adapter: {
    ...PrismaAdapter(prisma),
    async linkAccount(account) {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: account.userId },
      })

      if (!user.email) {
        throw new Error('User email is required to create a Stripe customer')
      }

      const customer = await stripe.customers.create({ email: user.email })

      return prisma.account.create({
        data: {
          ...account,
          stripe_customer_id: customer.id,
        },
      })
    },
  },
```

You can read further into the `PrismaAdapter`'s source code on [Github](https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-prisma/src/index.ts#L48). It's simply running `p.account.create({ data })`.
We extend this and first get the new user's email which is required to create a Stripe customer. With the newly acquired user's email, we create a stripe customer and then run:

```ts
prisma.account.create({
    data: {
        ...account,
        stripe_customer_id: customer.id,
    },
})
```

This is nearly the same as the original `linkAccount` function, just with the addition of `stripe_customer_id: customer.id,`.

Your `api/auth/[...].ts` file should now look like this:

```ts
import { NuxtAuthHandler } from '#auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { stripe } from '~/server/utils/stripe'

const runtimeConfig = useRuntimeConfig()
const prisma = new PrismaClient()

export default NuxtAuthHandler({
  secret: runtimeConfig.AUTH_SECRET,
  adapter: {
    ...PrismaAdapter(prisma),
    async linkAccount(account) {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: account.userId },
      })

      if (!user.email) {
        throw new Error('User email is required to create a Stripe customer')
      }

      const customer = await stripe.customers.create({ email: user.email })

      return prisma.account.create({
        data: {
          ...account,
          stripe_customer_id: customer.id,
        },
      })
    },
  },
  providers: [
    // @ts-expect-error
    GithubProvider.default({
      clientId: runtimeConfig.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
    }),
  ],
})
```

Now, when you create an account, you should see the `stripe_customer_id` column in your `Account` database have a unique identifier. You can run `npx prisma studio` to serve a a [Prisma Studio](https://www.prisma.io/studio) instance where you can view the data in your browser.

Navigate to https://dashboard.stripe.com/nuxt-stripe/customers and you should see the Customer table with that a new value. If you click on the customer, you should see somewhere on that page a Customer ID with a value that matches what is in your database.

## 06 - Stripe Checkout

We're going to be using [Stripe Checkout](https://stripe.com/payments/checkout) for our payment flow. If you've used Stripe in the past, this was probably the flow you used. We will run a function on our server that talks to Stripe and returns a URL.

This URL is then passed to our client and redirects users to a page that Stripe hosts. This page handles the transactions, billing information, and subscription information.

### Product

Before we dive into code, we need to create the product that the user will purchase. Navigate to https://dashboard.stripe.com/nuxt-stripe/products and click `+ Add product`.

I am using three different products in this project to match the three subscription tiers I plan to support: `startup`, `freelance`, and `enterprise`. You may create as many products as you wish with the specific prices and details that match your needs.

What is **important** is clicking the More pricing options option in the Add product drawer. This will bring up a second drawer with a detailed view of our product. Scroll down a bit and you should see a `Lookup key` set this to something logical. The lookup key for my Freelancer tier is `tier-freelancer`. We will reference these keys in our code.

### Stripe Checkout Endpoint

> We'll start with the Checkout Session endpoint.

Create a file at `server/api/stripe/create-checkout-session.ts` that contains the code:

```ts
// 1
import { stripe } from '~/server/utils/stripe'
import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default eventHandler(async event => {
  // 2
  const { lookup_key } = await readBody(event)
  // 3
  const authSession = await getServerSession(event)

  if (authSession && authSession.user?.email) {
    const account = await prisma.account.findFirst({
      where: {
        user: {
          email: authSession.user.email,
        },
      },
    })

	// 4
    if (account && account.stripe_customer_id && !account.is_subscribed) {
     // 5
      const prices = await stripe.prices.list({
        lookup_keys: [lookup_key],
        expand: ['data.product'],
      })

	  // 6
      const session = await stripe.checkout.sessions.create({
        customer: account.stripe_customer_id,         // 6.1
        billing_address_collection: 'auto',           // 6.2
        line_items: [                                 // 6.3
          {
            price: prices.data[0].id,
            quantity: 1,
          },
        ],
        mode: 'subscription',                         // 6.4
        success_url: `http://localhost:3000/success`, // 6.5
        cancel_url: `http://localhost:3000/cancelled`,
      })

      if (session.url) {
        return { url: session.url }
      }
    }
  }
})
```

I understand this endpoint is a bit hefty, but I'll try my best to explain what it's doing:

1. We import the `stripe` that's created in our `server/utils/stripe.ts` file.
	- This will be used to get the product and the checkout session.

2. Within our endpoint (`eventHandler`), we read from the request body.
	- In our use case, `body` is only used to acquire the `lookup_key` so we de-structure the body object and extract the `lookup_key` variable.

3. We use Nuxt Auth's [getServerSession](https://auth.sidebase.io/guide/authjs/server-side/session-access) function to ensure whoever is calling this endpoint is logged in and save the session data into a variable.
	- This session variable has the user's email, which we will use to get access to the `Account` table which then gives us access to the `account.stripe_customer_id`.

4. We do a basic check `if (account && account.stripe_customer_id && !account.is_subscribed)` to ensure the account exists, it has a stripe customer id, and it is not currently subscribed.

5. If this is the case, we run `stripe.prices.list()` with the `lookup_key` that is specific to our product to get the **prices** of the product.
	- Prices is plural because this will eventually be used to manage monthly and/or yearly subscriptions.

6. With the prices and `stripe_customer_id`, we are able to call `stripe.checkout.sessions.create()`.
	1. We set the customer to stripe_customer_id
	2. `billing_address_collection` is set to `'auto'`.
	3. `line_items` is set to the price and quantity of the product we are selling. In this case, a single subscription.
	4. `mode` defines the fact that we are selling a recurring subscription.
	5. `success_url` and `cancel_url` are defined to tell Stripe where to redirect users based on certain actions they interact with on the generated checkout page. We'll build these pages later on in this lesson.

### Client-side Checkout

With our endpoint setup, let's interact with it on the frontend. We'll implement this login within our `PricingSection.vue` component.

I'm able to encompass the majority of this logic with a new `checkout` function:

```ts
// components/PricingSection.vue
const checkout = async () => {
  // 1
  const PRICE_LOOKUP_KEY = 'tier-freelancer'
  // 2
  const res = await $fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    body: {
      lookup_key: PRICE_LOOKUP_KEY,
    },
  })

  if (res) {
    // 3
    await navigateTo(res.url, {
      external: true,
    })
  }
}
```

1. We are manually setting the lookup_key that we pass to our `create-checkout-session` endpoint.
	- This will eventually be dynamic and adjust based on the card we click on.
2. Here is a simple fetch request to our endpoint.
3. We use Nuxt's [navigateTo](https://nuxt.com/docs/api/utils/navigate-to) helper function with the `external` option to redirect users to the url that's returned.

We then hook this in to our `handleBuyNow` function:

```ts
// components/PricingSection.vue
const handleBuyNow = async () => {
  if (status.value === 'authenticated') {
    await checkout()
  } else {
    signIn('github')
  }
}
```


### Success/Cancel Pages

Remember our `create-checkout-session` endpoint had the following lines in the `stripe.sessions.create()` function call?

```ts
success_url: `http://localhost:3000/success`,
cancel_url: `http://localhost:3000/cancelled`,
```

The `success` and `cancelled` pages are technically optional, but you do need to implement some client-side logic to handle the success and cancelled states that occur in the checkout session. So, we'll go the easy route and just create proper pages.
- The success state is the page that Stripe redirects a user to after successfully subscribing.
- The cancelled state is the page that Stripe redirects a user to after clicking the back button during the checkout session.

Let's create them.

In your `pages` directory, create `success.vue` and `cancelled.vue` file.

I'm not going to do anything creative here, and instead just be direct. I recommend in a proper production app you implement a nice UI state and flow for users that hit these pages.

```html
// pages/success.vue
<template>
  <div>Success!!</div>
</template>
```

```html
// pages/cancelled.vue
<template>
  <div>Cancelled!!</div>
</template>
```

### Stripe Checkout Page

Now, when you're logged in and click a Buy plan button, you should see the Stripe Checkout page open:

![checkout page|500](https://cln.sh/FZDtmlLr+)

You can fill in the form using Stripe's [test card numbers](https://docs.stripe.com/testing). I typically use their Visa example because it's easy to remember: `4242424242424242`.

When you properly fill in the form and click subscribe you should expect to see a few things:
1. You should be redirected to your `/success` page.
2. You should see a new row in your Stripe Transactions located here: https://dashboard.stripe.com/nuxt-stripe/payments
3. You should **NOT** see `is_subscribed` set to true in your database.

There is still some work to do before the subscription status is reflected in our application, but we are getting close. We now have the transaction taking place and are accepting money through Stripe. We are just missing the step where Stripe tells our server that a successful payment took place. We'll implement this in the next section.

## 07 - Stripe Webhook

We'll receive Stripe events by creating a webhook endpoint that Stripe can communicate through. ([docs](https://docs.stripe.com/webhooks)).

We'll need to populate the `STRIPE_WEBHOOK_SECRET_KEY` environment variable from earlier.

### Ngrok

To do this, we'll need to expose our site to the web so that Stripe can access it.

My go-to for rapidly exposing my endpoints to the web is [ngrok](https://ngrok.com). Download it [here](https://ngrok.com/download) and follow the documentation, get your auth token, and set up ngrok's CLI.

You should be able to run the following command in your terminal:

```shell
ngrok http 3000
```

**Note:** Make sure your Nuxt application is running on port 3000 (the default port) before you run the ngrok command

Your terminal should now look like this:

![ngrok terminal|500](https://cln.sh/h2gqjQmz+)

The `Forwarding` URL is important. I'm highlighting it here so that you see it. We will carry this over into the next section.

### STRIPE_WEBHOOK_SECRET_KEY

With our server online, navigate to https://dashboard.stripe.com/nuxt-stripe/webhooks and click `+ Add endpoint` and add the following:

`Endpoint URL`: Paste the ngrok `Forwarding` url from earlier. Then, add `/api/stripe/webhook` to the end. This endpoint hasn't been created yet, but we will take care of that soon.

`Description` is optional.

`Listen to`: Events on your account

`Select events to listen to`: Click `+ Select events` and search for *subscription*. Toggle on `customer.subscription.created` and `customer.subscription.deleted` and click `Add events`.

Your form should similar to this:

![Stripe events webhook|500](https://cln.sh/W9ZDN7Cm+)


Now submit the form with `Add endpoint`.

This should redirect you to a details page on Stripe for your newly submitted Webhook. Look for `Signing secret` and click `Reveal`. The value that is shown is your `STRIPE_WEBHOOK_SECRET_KEY`. Copy and paste it into your `.env` file.

### Webhook Endpoint

This one may seem a bit meaty, but a good portion of it is simple error handling. I'll try my best to explain the code snippet to you:

```ts
// server/api/stripe/webhook.ts
import { PrismaClient } from '@prisma/client'
import { stripe } from '~/server/utils/stripe'

const prisma = new PrismaClient()
const runtimeConfig = useRuntimeConfig()

export default eventHandler(async event => {
  // 1
  const body = await readRawBody(event, false)
  let stripeEvent: any = body
  let subscription
  let status
  // 2
  const signature = getHeader(event, 'stripe-signature')

  if (!body) {
    return { error: 'Invalid request body' }
  }

  if (!signature) {
    return { error: 'Invalid stripe-signature' }
  }

  try {
    // 3
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      runtimeConfig.STRIPE_WEBHOOK_SECRET_KEY
    )
  } catch (err) {
    const error = createError({
      statusCode: 400,
      statusMessage: `Webhook error: ${err}`,
    })
    return sendError(event, error)
  }
  // 4
  switch (stripeEvent.type) {
    // 5
    case 'customer.subscription.deleted':
      subscription = stripeEvent.data.object
      status = subscription.status

      await prisma.account.update({
        where: {
          stripe_customer_id: subscription.customer,
        },
        data: {
          is_subscribed: false,
        },
      })

      break
    // 6
    case 'customer.subscription.created':
      subscription = stripeEvent.data.object
      status = subscription.status

      await prisma.account.update({
        where: {
          stripe_customer_id: subscription.customer,
        },
        data: {
          is_subscribed: true,
        },
      })

      break
    default:
      console.log(`Unhandled event type ${stripeEvent.type}.`)
  }
  return { received: true }
})
```

> At this point, I assume you are familiar with useRuntimeConfig, Prisma, and Stripe constants.

1. [readRawBody](https://h3.unjs.io/utils/request#readrawbodyevent-encoding) - Stripe requires the raw body when running `stripe.webhooks.constructEvent()`, so we use `readRawBody` here. The second parameter, `false`, returns it as a `Buffer`.
2. `stripe-signature` - Stripe will send us this header which is passed to the `constructEvent` function.
3. We pass the `body`, `signature`, and `STRIPE_WEBHOOK_SECRET_KEY` to construct the Webhook that Stripe sent to us.
4. Now we create a switch statement against the stripe event. I'm only interested in the `customer.subscription.deleted` and `customer.subscription.created` events, but you can extend this to receive any of the events listed during the `STRIPE_WEBHOOK_SECRET_KEY` setup.
5. On the `customer.subscription.deleted` event, we find the `Account` that contains the `stripe_customer_id` that matches the subscription's customer id. Then we update the `is_subscribed` value to false.
6. On the `customer.subscription.created` event, we do the same, just this time we update `is_subscribed` value to true.

With this in place, you should be able to go through the Stripe Checkout form and this time, when you successfully submit it, your webhook's detail page should show the `customer.subscription.created` event log:

![subscription created log|700](https://cln.sh/b0scQrQ5+)

> It should be successful, but if it's not, read the logs. 99% of the time, it's an API key issue.

With a successful creation webhook event, you should now see `is_subscribed` is `true` within your Database's Account table.

![is subscribed true|500](https://cln.sh/fZbV8B7q+)

With this in place, we have successfully implemented a basic subscription system. In the next few sections we will expand on this further to allow our users to manage their subscriptions in a Stripe Portal, chose between multiple subscription tiers, chose between yearly and monthly with dynamic pricing, and manage site permissions based on the subscription chosen.

## 08 - Stripe Customer Portal

The next step in our Stripe integration is subscription management. We're accepting users money and updating their subscription status in our database to reflect whether they've paid or not.

Now we need to give users the ability to manage their subscription. This includes cancelling it, changing their payment method, and seeing their payment history.

Luckily for us, the majority of this is taken care of within Stripe. Similar to the Checkout experience, we  need to create the dashboard session url and redirect our users to it.

### Generate BillingPortal URL

```ts
// server/api/stripe/create-portal-session.ts
import { stripe } from '~/server/utils/stripe'
import { getServerSession } from '#auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const baseUrl = 'http://localhost:3000'

export default eventHandler(async event => {
  const session = await getServerSession(event)

  if (!session?.user?.email) {
    return { error: 'User not authenticated' }
  }

  const account = await prisma.account.findFirst({
    where: {
      user: {
        email: session.user.email,
      },
    },
  })

  if (!account?.stripe_customer_id) {
    return { error: 'Stripe customer not found' }
  }
  // 1
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: account.stripe_customer_id,
    return_url: baseUrl,
  })

  return { url: portalSession.url }
})
```

I'm assuming most of this is getting repetitive and you understand it. But a quick refresher, we get the auth session to ensure the user is logged in and then get their Account so we have access to `stripe_customer_id`.

1. With `stripe_customer_id`, we call `stripe.billingPortal.sessions.create()` which generates a URL that we can navigate to on the frontend.

### useStripe Composable

Consuming this endpoint and navigating to the billing portal is straight forward and very similar to the checkout experience:

```ts
const navigateToStripeDashboard = async () => {
    const res = await $fetch('/api/stripe/create-portal-session', {
      method: 'POST',
    })

    if (res && 'url' in res) {
      await navigateTo(res.url, {
        external: true,
      })
    } else {
      console.error('Error creating portal session:', res.error)
    }
}
```

But at this stage, our `PricingSection` component is becoming a bit cluttered, so I decided to move the Stripe-specific functions into a [composable](https://vuejs.org/guide/reusability/composables) called `useStripe`.

Create a new directory called `composables` and within it a file called `useStripe`.

Extract the checkout function and the tiers from `PricingSection` and place them along with our new `navigateToStripeDashboard` function into our new file.

```ts
// composables/useStripe
export function useStripe() {
  const checkout = async () => {
    const PRICE_LOOKUP_KEY = 'tier-freelancer'

    const res = await $fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: {
        lookup_key: PRICE_LOOKUP_KEY,
      },
    })

    if (res) {
      await navigateTo(res.url, {
        external: true,
      })
    }
  }

  const navigateToStripeDashboard = async () => {
    const res = await $fetch('/api/stripe/create-portal-session', {
      method: 'POST',
    })

    if (res && 'url' in res) {
      await navigateTo(res.url, {
        external: true,
      })
    } else {
      console.error('Error creating portal session:', res.error)
    }
  }

  const tiers = [
    {
      name: 'Freelancer',
      id: 'tier-freelancer',
      href: '#',
      priceMonthly: '$24',
      description: 'The essentials to provide your best work for clients.',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics',
        '48-hour support response time',
      ],
      mostPopular: false,
    },
    {
      name: 'Startup',
      id: 'tier-startup',
      href: '#',
      priceMonthly: '$32',
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      mostPopular: true,
    },
    {
      name: 'Enterprise',
      id: 'tier-enterprise',
      href: '#',
      priceMonthly: '$48',
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations',
      ],
      mostPopular: false,
    },
  ]

  return { checkout, navigateToStripeDashboard, tiers }
}
```

Now, we can easily re-use these functions throughout our application. You may notice that we've been using a composable this entire time with `useAuth`.

We'll start using it in our `AuthMenu` component. Extract the `navigateToeStripeDashboard` function from the `useStripe` composable:

```ts
const { navigateToStripeDashboard } = useStripe()
```

Then update the `solutions` array, replacing the Manage Billing object's function with our newly defined `navigateToStripeDashboard`.

```html
// components/AuthMenu.vue
<script setup lang="ts">
...
const { data, signOut } = useAuth()
const { navigateToStripeDashboard } = useStripe()
const solutions = [
  { name: 'Manage Billing', fn: navigateToStripeDashboard },
  { name: 'Sign Out', fn: signOut },
]
</script>
<template>
	...
</template>
```

Now, when you click the `Manage Billing` button within your `AuthMenu` dropdown, it should navigate you to a `billing.stripe.com` url.

![stripe billing portal|500](https://cln.sh/TBQ7mHth+)

Here you can update or cancel your plan!

## 09 - Composable Refactor

### isSubscribed Check

I want to check against the `isSubscribed` value we have attached to our user's Account to dynamically render content based on this value.

To do this, we're going to tap into Authjs' [session callback](https://next-auth.js.org/configuration/callbacks#session-callback). The session callback is ran whenever a session is checked.

Navigate to our `api/auth/[...]ts` file and add a `callback` within our `NuxtAuthHandler`:

```ts
// api/auth/[...].ts
export default NuxtAuthHandler({
  ...,
  callbacks: {
    // Adding subscription status to default useAuth data object.
    async session({ session }) {
      if (session.user?.email) {
        const accounts = await getAccountsByEmail(session.user.email)

        return {
          ...session,
          user: {
            ...session.user,
            isSubscribed: accounts[0].is_subscribed,
          },
        }
      }

      return {
        ...session,
        user: {
          ...session.user,
          isSubscribed: undefined,
        },
      }
    },
  },
})

```

```ts
if (session.user?.email) {
	const accounts = await getAccountsByEmail(session.user.email)

	return {
	  ...session,
	  user: {
		...session.user,
		isSubscribed: accounts[0].is_subscribed,
	  },
	}
}
```

This is checking if the user is logged in and if it does, it queries for the user's Account. Once we have the Account, we return the `...session`, which is the default returned object, but we go into it's nested `user` object and extend it with `isSubscribed: accounts[0].is_subscribed`.

Here I am using a utility query called `getAccountsByEmail`. Create a file at `server/utils/queries/getAccountsByEmail.ts` and in it, the code:

```ts
// server/utils/queries/getAccountsByEmail.ts`
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAccountsByEmail = async (email: string) => {
  return await prisma.account.findMany({
    where: {
      user: {
        email: email,
      },
    },
  })
}
```

It's a basic Prisma query. But I can see myself using this one often so I decided to extract it into its own function.

Now, when we run extract `data` from `useAuth` and navigate through the `data` object to get the `isSubscribed` value::

```ts
const { data } = useAuth()
data.value?.user?.isSubscribed
```

I use this in our `PricingSection` component to adjust the pricing card's text and functionality.

```html
// components/PricingSection.vue
<script setup lang="ts">
const { status, signIn, data } = useAuth()
const { checkout, navigateToStripeDashboard, tiers } = useStripe()

const handleBuyNow = async () => {
  if (data.value?.user?.isSubscribed) {
    await navigateToStripeDashboard()
  } else if (status.value === 'authenticated') {
    await checkout()
  } else {
    signIn('github')
  }
}

const buttonText = computed(() => {
  if (data.value?.user?.isSubscribed) {
    return 'Manage Subscription'
  } else if (status.value === 'authenticated') {
    return 'Buy Now'
  } else {
    return 'Sign In to Buy'
  }
})
</script>

<template>
...
  <button
	@click="handleBuyNow"
	:aria-describedby="tier.id"
	:class="..."
>
	{{ buttonText }}
  </button>
...
</template>
```

I cut away the majority of the html and css here, just to showcase the button's dynamic `handleBuyNow` function and computed `buttonText`.

Now, if the user is subscribed, the button will say "Manage Subscription" and clicking it will navigate the user to the Billing Portal.

If the user is logged in but not subscribed, it will say "Buy Now" and navigate the user to the Checkout Portal.

If the user is not logged in, it will say "Sign in to Buy" and clicking it will log the user in.

### Typescript adjustment

If you're using Typescript, you may see a few red lines yelling at you. This is because we are extending the Auth's User object within the Session Callback, but we are not informing our client side Typescript that this is happening.

To clean this up and make Typescript happy, create a file at `types/next-auth.d.ts` and add the following code:

```ts
// types/next-auth.d.ts
mport NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider`
   */
  interface Session {
    user: {
      /** The user's Stripe subscription status. */
      isSubscribed: boolean
    } & DefaultSession['user']
  }
}
```

This overrides the `Session` interface defined by next-auth and extends it with the `user.isSubscribed` field.

## 10 - Multiple Plans

Awhile back I mentioned we would get rid of the hard coded `PRICE_LOOKUP_KEY`. The reason we don't like it is because it's limiting our checkout to a single subscription plan. Our goal is to support multiple prices and plans, so let's make the necessary adjustments.

### Multiple Products

Before digging into the code we need to add additional products in our Stripe dashboard.

Navigate to Stripe's [Product catalog](https://dashboard.stripe.com/nuxt-stripe/products?active=true) and add two additional products. Ensure your product's information matches whatever you have within `composables/useStripe`'s tiers object.

Here is my `tiers` for reference:

```ts
// composables/useStripe
const tiers = [
    {
      name: 'Freelancer',
      id: 'tier-freelancer',
      href: '#',
      priceMonthly: '$24',
      description: 'The essentials to provide your best work for clients.',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics',
        '48-hour support response time',
      ],
      mostPopular: false,
    },
    {
      name: 'Startup',
      id: 'tier-startup',
      href: '#',
      priceMonthly: '$32',
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      mostPopular: true,
    },
    {
      name: 'Enterprise',
      id: 'tier-enterprise',
      href: '#',
      priceMonthly: '$48',
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations',
      ],
      mostPopular: false,
    },
  ]
```

Ensure the new products you create have a `lookup_key` that matches the `tier`  object's `id` field.
In my case, I have `tier-freelancer`, `tier-startup`, and `tier-enterprise`.

Also ensure the rest of the data matches what you create in Stripe's dashboard i.e. Price, name, etc.

### Code Adjustments

In our `useStripe` composable, adjust `checkout` to take a lookup_key parameter:

```ts
// composables/useStripe
export function useStripe() {
  const checkout = async (lookupKey: string) => {
    const res = await $fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: {
        lookup_key: lookupKey,
      },
    })

    if (res) {
      await navigateTo(res.url, {
        external: true,
      })
    }
  }
  ...
}
```

Now let's adjust where we are calling `checkout` in our `PricingSection` component:

```ts
// components/PricingSection
const handleBuyNow = async (lookupKey: string) => {
  if (data.value?.user?.isSubscribed) {
    await navigateToStripeDashboard()
  } else if (status.value === 'authenticated') {
    await checkout(lookupKey)
  } else {
    signIn('github')
  }
}
```

We adjust our `handleBuyNow` function to accept a `lookupUp` parameter that we then pass into our `checkout` function.

Then in our template, we can adjust the button that calls the `handleBuyNow` function to take in a parameter:

```html
// components/PricingSection
<template>
...
  <button
	@click="() => handleBuyNow(tier.id)"
	:aria-describedby="tier.id"
	:class="..."
>
	{{ buttonText }}
  </button>
...
</template>
```

We are iterating over each tier earlier in the template code, so we have access to the tier's id which we can then setup in Stripe's dashboard as our Product's lookup keys.

With this in place, you should be able to go through the Checkout flow and see that the plan changes based on which tier's Card you click on. It should match the price, name, and other values you set in Stripe's Product Catalog when creating the new Product(s).

### Plans

There's nothing in our Database that saves this information so we are unable to render things based on which plan the user paid for.

#### Account Table

The solution I take for this problem is to extend my database schema to hold onto this information using a `plan` column in my Account schema:

```ts
// prisma/schema.prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  stripe_customer_id String? @unique
  is_subscribed      Boolean @default(false)

  plan               String  @default("tier-free")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}```

> I set the default value to `tier-free`.

The reason I keep `is_subscribed` as well as `plan` as two separate database columns is because you may want to have logic that recommends users to re-subscribe to their old plan using deals or other methods.

With this updated schema, run our Prisma commands again:

```shell
npx prisma generate
npx prisma migrate dev
```

#### Auth Endpoint

Now update our Auth endpoint's session `callback` to expand on the returned user object, providing the user Account's `plan`.

```ts
// server/api/auth/[...].ts
callbacks: {
    // Adding subscription status to default useAuth data object.
    async session({ session }) {
      if (session.user?.email) {
        const accounts = await getAccountsByEmail(session.user.email)

        return {
          ...session,
          user: {
            ...session.user,
            isSubscribed: accounts[0].is_subscribed,
            plan: accounts[0].plan,
          },
        }
      }
      return {
        ...session,
        user: {
          ...session.user,
          isSubscribed: false,
          plan: 'tier-free',
        },
      }
```

#### Webhook Updates

We also have to update our Webhook so that Stripe passes us back the plan information when the subscription is successfully created.

```ts
// server/api/stripe/webhook.ts
case 'customer.subscription.created':
  subscription = stripeEvent.data.object
  plan = stripeEvent.data.object.items.data[0].price.lookup_key

  await prisma.account.update({
	where: {
	  stripe_customer_id: subscription.customer,
	},
	data: {
	  is_subscribed: true,
	  plan,
	},
  })
```

Now that there are multiple plans, the user will have the ability to modify their plan in the Billing Portal. They can now go from Plan A → Plan B and visa-versa.

In my case, they may start out as a Freelancer, and decide they want additional pro features and sign up for an Enterprise user.

Stripe will send a webhook event called `customer.subscription.updated` when this occurs. So, let's listen for it and update our user's Account accordingly:

```ts
// server/api/stripe/webhook.ts
case 'customer.subscription.updated':
  subscription = stripeEvent.data.object
  plan = stripeEvent.data.object.items.data[0].price.lookup_key

  await prisma.account.update({
	where: {
	  stripe_customer_id: subscription.customer,
	},
	data: {
	  plan,
	},
  })
```

Be sure to update your Webhook in Stripe's webhook settings so that Stripe sends this additional event.

![webhook settings|350](https://cln.sh/7ZBMSsq9+)

#### Typescript Session Interface

Let's quickly extend the Session interface so that Typescript doesn't yell at us when we decide to access this `plan` variable on the client.

```ts
// types/next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider`
   */
  interface Session {
    user: {
      /** The user's Stripe subscription status. */
      isSubscribed: boolean
      plan: string
    } & DefaultSession['user']
  }
}
```

## 11 - Yearly Plans

> "Buy 10 months, get two free!"

Site's love to provide a discount with annual billing. So, let me show you how to incorporate it into your application.

I'm sure many of you have seen this toggle:

![yearly plan toggle!500](https://cln.sh/mxcRdNZB+)

Good news is, it's easy! The majority of the work is frontend-related, with a minor bit of Stripe work within their dashboard.

### Additional Product Pricing

Visit each Product's details page on Stripe's Product Catalog page. Right now, we should only have one Price in the Pricing table. Click the `+` button and add a new price. This time, make sure the `Billing period` is yearly, the price reflects this new period, and add a `Lookup key` that's unique to the yearly price.

![Additional Pricing|500](https://cln.sh/PGN833RN+)

### UI

We need to create a Toggle component. I'll call this component `ToggleWithText`.

```html
// components/ToggleWithText.vue
<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
const enabled = defineModel<boolean>({ default: false })
</script>

<template>
  <SwitchGroup as="div" class="flex items-center">
    <Switch
      v-model="enabled"
      :class="[
        enabled ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        ]"
      />
    </Switch>
    <SwitchLabel as="span" class="ml-3 text-sm">
      <span class="font-medium text-gray-900">Annual Billing</span>
    </SwitchLabel>
  </SwitchGroup>
</template>
```

This gives us the ability to pass a `v-model` and have a reusable toggle component.

```html
<ToggleWithText v-model="yearlyEnabled" />
```

Now we're going to use this toggle in our `PricingSection` component. Add a new ref:

```ts
const yearlyEnabled = ref(false)
```

As well as a new computed property:

```ts
const filteredTiers = computed(() => {
  return tiers.filter(tier =>
    yearlyEnabled.value ? tier.type === 'yearly' : tier.type === 'monthly'
  )
})
```

Our `PricingSection` component's `script` should now look like the following:

```ts
// components/PricingSection
<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'

const yearlyEnabled = ref(false)
const { status, signIn, data } = useAuth()
const { checkout, navigateToStripeDashboard, tiers } = useStripe()

const handleBuyNow = async (lookupKey: string) => {
  if (data.value?.user?.isSubscribed) {
    await navigateToStripeDashboard()
  } else if (status.value === 'authenticated') {
    await checkout(lookupKey)
  } else {
    signIn('github')
  }
}

const buttonText = computed(() => {
  if (data.value?.user?.isSubscribed) {
    return 'Manage Subscription'
  } else if (status.value === 'authenticated') {
    return 'Buy Now'
  } else {
    return 'Sign In to Buy'
  }
})

const filteredTiers = computed(() => {
  return tiers.filter(tier =>
    yearlyEnabled.value ? tier.type === 'yearly' : tier.type === 'monthly'
  )
})
</script>
```

Now let's add the toggle with our new `yearlyEnabled` ref to our template. We'll also iterate over `filteredTiers` rather than just `tiers`:

```html
// components/PricingSection

<template>
  <div class="bg-white py-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base font-semibold leading-7 text-indigo-600">
          Pricing
        </h2>
        <p
          class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          Pricing plans for teams of&nbsp;all&nbsp;sizes
        </p>
      </div>
      <p
        class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600"
      >
        Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi
        iusto modi velit ut non voluptas in. Explicabo id ut laborum.
      </p>

      <div class="flex items-center justify-center mt-10 -mb-14">
        <ToggleWithText v-model="yearlyEnabled" />
      </div>

      <div
        class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <div
          v-for="(tier, tierIdx) in filteredTiers"
          :key="tier.id"
          :class="[
            tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
            tierIdx === 0 ? 'lg:rounded-r-none' : '',
            tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
            'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
          ]"
        >
          <div>
            <div class="flex items-center justify-between gap-x-4">
              <h3
                :id="tier.id"
                :class="[
                  tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8',
                ]"
              >
                {{ tier.name }}
              </h3>
              <p
                v-if="tier.mostPopular"
                class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600"
              >
                Most popular
              </p>
            </div>
            <p class="mt-4 text-sm leading-6 text-gray-600">
              {{ tier.description }}
            </p>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-4xl font-bold tracking-tight text-gray-900">
                {{ tier.price }}
              </span>
              <span class="text-sm font-semibold leading-6 text-gray-600">
                {{ yearlyEnabled ? '/year' : '/month' }}
              </span>
            </p>
            <ul
              role="list"
              class="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li
                v-for="feature in tier.features"
                :key="feature"
                class="flex gap-x-3"
              >
                <CheckIcon
                  class="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {{ feature }}
              </li>
            </ul>
          </div>
          <button
            @click="() => handleBuyNow(tier.id)"
            :aria-describedby="tier.id"
            :class="[
              tier.mostPopular
                ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
              'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            ]"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```

Now, we need to update our tiers to include the yearly amounts.

Here's an example of one of the yearly tiers:

```ts
{
  name: 'Freelancer',
  id: 'tier-freelancer-yearly',
  href: '#',
  price: '$240',
  description: 'The essentials to provide your best work for clients.',
  features: [
	'5 products',
	'Up to 1,000 subscribers',
	'Basic analytics',
	'48-hour support response time',
  ],
  mostPopular: false,
  type: 'yearly',
},
```

The only difference between this tier and the monthly version is the `id` and `type` field. But, this is up to you. You can adjust this object however you like. The key is `type: 'yearly'` - this is how we will filter the tier.

Here's my entire `tiers` value when updated with the yearly objects:

```ts
const tiers = [
	{
	  name: 'Freelancer',
	  id: 'tier-freelancer',
	  href: '#',
	  price: '$24',
	  description: 'The essentials to provide your best work for clients.',
	  features: [
		'5 products',
		'Up to 1,000 subscribers',
		'Basic analytics',
		'48-hour support response time',
	  ],
	  mostPopular: false,
	  type: 'monthly',
	},
	{
	  name: 'Startup',
	  id: 'tier-startup',
	  href: '#',
	  price: '$32',
	  description: 'A plan that scales with your rapidly growing business.',
	  features: [
		'25 products',
		'Up to 10,000 subscribers',
		'Advanced analytics',
		'24-hour support response time',
		'Marketing automations',
	  ],
	  mostPopular: true,
	  type: 'monthly',
	},
	{
	  name: 'Enterprise',
	  id: 'tier-enterprise',
	  href: '#',
	  price: '$48',
	  description: 'Dedicated support and infrastructure for your company.',
	  features: [
		'Unlimited products',
		'Unlimited subscribers',
		'Advanced analytics',
		'1-hour, dedicated support response time',
		'Marketing automations',
	  ],
	  mostPopular: false,
	  type: 'monthly',
	},

	{
	  name: 'Freelancer',
	  id: 'tier-freelancer-yearly',
	  href: '#',
	  price: '$240',
	  description: 'The essentials to provide your best work for clients.',
	  features: [
		'5 products',
		'Up to 1,000 subscribers',
		'Basic analytics',
		'48-hour support response time',
	  ],
	  mostPopular: false,
	  type: 'yearly',
	},
	{
	  name: 'Startup',
	  id: 'tier-startup-yearly',
	  href: '#',
	  price: '$320',
	  description: 'A plan that scales with your rapidly growing business.',
	  features: [
		'25 products',
		'Up to 10,000 subscribers',
		'Advanced analytics',
		'24-hour support response time',
		'Marketing automations',
	  ],
	  mostPopular: true,
	  type: 'yearly',
	},
	{
	  name: 'Enterprise',
	  id: 'tier-enterprise-yearly',
	  href: '#',
	  price: '$480',
	  description: 'Dedicated support and infrastructure for your company.',
	  features: [
		'Unlimited products',
		'Unlimited subscribers',
		'Advanced analytics',
		'1-hour, dedicated support response time',
		'Marketing automations',
	  ],
	  mostPopular: false,
	  type: 'yearly',
	},
]
```

With these changes in place, you should now see the `plan` value reflected in your database.

## 12 - Permissions

I want to show you how we can easily adjust permissions on our site with our `plan` value.

Our user's `plan` value is being passed to the client in the `data` variable extracted from `useAuth`:

```ts
const { data } = useAuth()
// data.user.plan
```

Let's play with it in our `AuthMenu` component:

```html
// components/AuthMenu.vue
<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
const { data, signOut } = useAuth()
const { navigateToStripeDashboard } = useStripe()
const solutions = [
  { name: 'Manage Billing', fn: navigateToStripeDashboard },
  { name: 'Sign Out', fn: signOut },
]
</script>
<template>
	...
      <AuthAvatar :src="data?.user?.image" :plan="data?.user?.plan" />
    ...
</template>
```

Pass our `AuthAvatar` component a new prop: `:plan="data?.user?.plan"`

And update the `Prop` interface in our `AuthAvatar` component:

```ts
interface Props {
  src: string | null | undefined
  plan: string | null | undefined
}
```

Then add this dynamic class to your Avatar's img element.

```ts
:class="{
  'border-indigo-500': plan?.includes('tier-freelance'),
  'border-red-500': plan?.includes('tier-startup'),
  'border-green-500': plan?.includes('tier-enterprise'),
}"
```

So now the Avatar image should have a colorful border depending on which tier you're in.

Final `AuthAvatar` code:

```html
<script lang="ts" setup>
interface Props {
  src: string | null | undefined
  plan: string | null | undefined
}
defineProps<Props>()
</script>
<template>
  <img
    v-if="src"
    class="inline-block h-10 w-10 rounded-full bg-gray-500 border-2"
    :class="{
      'border-indigo-500': plan?.includes('tier-freelance'),
      'border-red-500': plan?.includes('tier-startup'),
      'border-green-500': plan?.includes('tier-enterprise'),
    }"
    :src="src"
    alt="User avatar"
  />
  <span
    v-else
    class="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100"
  >
    <svg
      class="h-full w-full text-gray-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </span>
</template>
```

This is a very simple example, but it showcases how easy it is to now dynamically show content based on the user's subscription tier.

## 13 - Deploy

> Coming soon...

## Conclusion

> And that's it!

I hope this was able to help you along your journey to integrating payments into your Nuxt application. This article has been a long time coming.

Let me know if you have any questions, comments, or concerns. If you run into errors in the code, please let me know and I'll update the examples to help future readers.
