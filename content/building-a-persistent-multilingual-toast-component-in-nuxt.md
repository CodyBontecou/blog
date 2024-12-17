---
"title: Building a Persistent, Multilingual Toast Component\"": A Step-by-Step Guide to i18n and LocalStorage in Nuxt
ignore: false
draft: false
topics:
  - nuxt
  - i18n
date: 2024-12-14T10:02
created_at: 2024-12-14T10:02
last_modified: 2024-12-16T21:55
---

Picture this: You've just rolled out an exciting new feature on your application. You want to announce it to your users, but you don't want to bombard them with the same message every time they visit. Oh, and your app serves users across multiple languages. Sound familiar?

Toast notifications are a common UI pattern for displaying temporary messages to users. But when you need them to be smarter - showing up just once, speaking your users' language, and knowing when to gracefully disappear - things get interesting.

In this tutorial, we'll build a toast component from the ground up, progressively adding features you'll actually use in production. We'll start with a basic implementation, then enhance it with internationalization (i18n) support for multiple languages, and finally add localStorage persistence so it remembers when it's been shown.

By the end of this guide, you'll have:

- A reusable toast component with a clean render function pattern
- Full internationalization support for multilingual messages
- Persistent state management using localStorage
- A deep understanding of how these features work together

![toast code snippet showcase in blank website](https://i.imgur.com/LRcasfm.gif)
## Installation and setup

We'll begin with creation a new Nuxt application:

```bash
npx nuxi@latest init multilingual-toast-nuxt
```

And then let's add a few modules using the handy `nuxi module add` cli commands.

### i18n

Install the [i18n](https://nuxt.com/modules/i18n) module to make adding internationalization easier:

```bash
npx nuxi@latest module add i18n
```

### shadcn-nuxt

Also install the [shadcn-nuxt](https://nuxt.com/modules/shadcn) module. I use this module often for UI components. This is also how I will be integrating the toast component.

This installation has a few steps that are important. You can read about each dependency in their [docs](https://www.shadcn-vue.com/docs/installation/nuxt).

Shadcn has a bug that requires manually installing Typescript as a dev dependency:

```bash
npm install -D typescript
```

Shadcn relies on Tailwindcss:

```bash
npx nuxi@latest module add @nuxtjs/tailwindcss
```

Now add the shadcn-nuxt module:

```bash
npx nuxi@latest module add shadcn-nuxt
```

**Note:** At the time of writing this article (Dec. 14, 2024), there is [this](https://github.com/nuxt/nuxt/issues/29779) issue with the error `Nuxt module should be a function: @nuxtjs/color-mode`. If you run into this error, a simple fix is navigating to your `package.json` file and replacing your `shadcn-nuxt` dependency with this version: `"shadcn-nuxt": "^0.10.4",`

Run the Shadcn init command to finish the installation:

```bash
npx shadcn-vue@latest init
```

### Toast component and utilities

Now, we you should be able to install Shadcn components using their cli. For this tutorial, we're just going to use their [toast](https://www.shadcn-vue.com/docs/components/toast.html) component.

```bash
npx shadcn-vue@latest add toast
```

This should create files within your `components/ui/toast` directory as well as a `utils.ts` file in your `lib` directory.

Navigate to your `app.vue` file and replace all of the content within the file with this code:

```vue
// app.vue
<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
    <Toaster />
</template>
```

This is the base-amount of code needed to get the `Toast` component to show in other areas of your app. For this tutorial, we're going to use a simple example and keep all of the code within our `app.vue` file.

With this in mind, extend this code with the following:

```vue
// app.vue
<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

onMounted(() => {
    toast({
        title: 'Hello toast',
        description: "Let's spread some butter on ya.",
    })
})
</script>

<template>
    <Toaster />
</template>
```

This imports the `useToast` composable and extracts the `toast` function from it.
We then call `toast()`. In this example, I run it in an `onMounted` call for ease-of-use. 

This is typically how I use it, but it's ultimately just a function that can be called as needed.

![toast code snippet showcase in blank website](https://i.imgur.com/LRcasfm.gif)


The nice thing about Shadcn components is that they are always responsive. The example shown above is how it's shown on mobile devices.

And here it is on a desktop:

![toast shown on desktop view](https://i.imgur.com/57AKfMa.gif)

## Adding internationalization (i18n)

Let's implement internationalization. With modern AI tooling, managing translation files is a breeze and something I try to include in every application I build.

We installed i18n earlier in our [i18n](#i18n) section, so let's just right to the fun stuff.

Extend your `nuxt.config.ts` file to include i18n-specific configuration so that it looks like the following:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
    i18n: {
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'nuxt_i18n',
        },
        defaultLocale: 'eng_Latn',
        locales: [],
    },
})
```

This is my go-to configuration. Here are the [i18n.nuxtjs.org](https://i18n.nuxtjs.org/) docs to better understand each option if you are curious.

### English i18n file

We need to create the file that will contain all of the English words that our website is going to use. The pattern we implement here will be reproducible and used for every additional language you use.

I personally prefer a dedicated `i18n` directory that contains my translation files. My translations files also contain explicit information regarding their intention. For example, instead of `eng.json`, I prefer `eng_Latn`. These details are up to you, this is just how I prefer to organize my projects.

Our toast message contains two string:

```json
title: 'Hello toast',
description: "Let's spread some butter on ya.",
```

Let's re-create this within an `eng_Latn.json` file:

```json
// i18n/eng_Latn.json
{
	"title": "Hello toast",
	"description": "Let's spread some butter on ya.",
}
```

i18n files can get cluttered as the project grows, so I structure my JSON a bit more explicitly. In this case, I'll place these strings nested within a `toast` object:

```json
// i18n/eng_Latn.json
{
	"toast": {
		"title": "Hello toast",
		"description": "Let's spread some butter on ya."
	}
}
```

Now, in our `nuxt.config.ts` file, let's add this new language `locale`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
    i18n: {
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'nuxt_i18n',
        },
        defaultLocale: 'eng_Latn',
        locales: [{ code: 'eng_Latn', title: 'English' }],
    },
})
```

For any future language you add, make sure you create a dedicated `locales` object for it. `nuxt.config.ts` is a typescript file, so you can always get creative with how you iterate over your i18n files to generate an array here.

### i18n.config.ts

Nuxt's i18n module relies on vueI18n under the [hood](https://i18n.nuxtjs.org/docs/v8/getting-started/usage#translate-with-vue-i18n). We will include an `i18n.config.ts` file at the root of our project to specifically configure the vueI18n options.

```ts
// i18n.config.ts
import eng_Latn from './i18n/eng_Latn.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'eng_Latn',
    messages: {
        eng_Latn: eng_Latn,
    },
}))
```

This is where we import the `eng_Latn` JSON object we created earlier, passing it to our `i18n` config.

### Template integration

We can now bring the translations directly into our template files now that we are finished configuration i18n in our Nuxt application.

Nuxt i18n provides a handy `useI18n` composable that allows us to manage translations within our `script setup`.

Here is our new `app.vue` with i18n in place:

```vue
// app.vue
<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { t } = useI18n()

onMounted(() => {
    toast({
        title: t('toast.title'),
        description: t('toast.description'),
    })
})
</script>

<template>
    <Toaster />
</template>
```

Not bad, right?

## Persisting state using local storage

You (probably) don't want your toast to appear every time your user navigates to your site.

A common solution is to store some data in local storage, persisting state between user sessions. I only want to show the toast the first time a user navigates to our site.

### useLocalStorage utility functions

I decided to ~~ask chatGPT~~ create a `useLocalStorage` utility function to create, get, and remove values from local storage:

```ts
// lib/useLocalStorage.ts
export const useLocalStorage = () => {
    const setValue = (key: string, value: any): void => {
        if (process.client) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    const getValue = <T>(key: string, defaultValue?: T): T | null => {
        if (process.client) {
            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : defaultValue || null
        }
        return defaultValue || null
    }

    const removeValue = (key: string): void => {
        if (process.client) {
            localStorage.setItem(key, '')
        }
    }

    return {
        setValue,
        getValue,
        removeValue,
    }
}
```

### Persisting our toast's state

Now we're going to edit the `Toaster.vue` component that Shadcn installed for us. You can find the component's file in your `components/ui/toast` directory.

`Toaster.vue` is where we will set the value in our value. I'm taking a simple approach and simply saying, when the toast is closed, set a local storage value `toast:shown` to true.

```ts
// Toaster.vue
<script setup lang="ts>
import { isVNode } from 'vue'
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '.'
import { useToast } from './use-toast'

const { toasts } = useToast()

const { setValue } = useLocalStorage()
const handleOpenEvent = async () => {
    setValue('toast:shown', true)
}
</script>
```

We're going to make use of the `@update:open` event that `Toast` emits. Here are the [docs](https://www.radix-vue.com/components/toast#root) if you want to learn about each of the events our component supports.

```vue
// Toaster.vue
<template>
    <ToastProvider>
        <Toast
            v-for="toast in toasts"
            :key="toast.id"
            v-bind="toast"
            @update:open="handleOpenEvent" <!--- Add this
        >
            <div class="grid gap-1">
                <ToastTitle v-if="toast.title">
                    {{ toast.title }}
                </ToastTitle>
                <template v-if="toast.description">
                    <ToastDescription v-if="isVNode(toast.description)">
                        <component :is="toast.description" />
                    </ToastDescription>
                    <ToastDescription v-else>
                        {{ toast.description }}
                    </ToastDescription>
                </template>
                <ToastClose />
            </div>
            <component :is="toast.action" />
        </Toast>
        <ToastViewport />
    </ToastProvider>
</template>
```

**Note:** I linked to Radix Vue because Shadcn is built on top of Radix Vue. Shadcn is primarily a UI layer while Radix is where you may want to look to gain a better understanding of the state and events these components support.

### Show/hide toast based on local storage state

Okay, now we are setting the `toast:shown` value to true when we close our toast. But now, we need to check on this value prior to showing our toast.

Lucky for us, the heavy lifting is already gone and we just need to do a simple check prior to calling our `toast` function.

```vue
// app.vue
<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { t } = useI18n()
const { getValue } = useLocalStorage()

onMounted(() => {
    const toastShown = getValue('toast:shown')

    if (!toastShown) {
        toast({
            title: t('toast.title'),
            description: t('toast.description'),
        })
    }
})
</script>

<template>
    <Toaster />
</template>
```

We check to see if `toast:shown` is true, meaning it's been shown based on our `Toaster.vue` logic.

If it is, do not show the toast. Otherwise, show it.

## Conclusion

And there you have! A multilingual toast component that has persistence built in.

This is a common pattern I use in nearly all of my web apps and showcases a few powerful tools such as i18n, Shadcn, and local storage management.

I hope you enjoyed it. Let me know if you have any tips, suggestions, or critique!

You can find the Github repository [here](https://github.com/CodyBontecou/multilingual-toast-nuxt).