---
title: Client-side AI with Nuxt Workers + Transformers.js
draft: false
ignore: false
topics:
  - ai
  - nuxt
  - transformers
  - transformers.js
created_at: 2025-03-24T12:25
date: 2025-03-24T12:25
last_modified: 2025-03-24T15:35
---

> [Youtube video](https://www.youtube.com/watch?v=bV6MlWpS9-0) for those that prefer video content.

This post walks you through an implementation of [NLLB-200](https://huggingface.co/Xenova/nllb-200-distilled-600M), Facebook's text-to-text translation model, in the browser.

## Core Tools

- [Nuxt Workers](https://github.com/danielroe/nuxt-workers): Offload AI tasks to Web Workers to prevent main-thread blocking.
- [Transformers.js](https://github.com/huggingface/transformers.js/): Run pre-trained models (translation, sentiment analysis) directly in the browser.

## Project Setup

Let's start by creating a new project with the necessary dependencies.

- Create the project:

```bash
npm create nuxt <project-name>
```

- Change into project directory:

```bash
cd <project-name>
```
### Dependencies

- Install runtime dependencies:

```bash
npm install @xenova/transformers
```

- Install nuxt-workers via module:

```bash
npx nuxi@latest module add nuxt-workers
```

## Web-worker

[Nuxt Workers](https://github.com/danielroe/nuxt-workers) looks for your web workers in the `~/workers/` directory.

Create `translate.ts`:

```ts
// workers/translate.ts

import { pipeline } from '@xenova/transformers'

const task = 'translation'
const model = 'Xenova/nllb-200-distilled-600M'

export async function translate(input: string) {
    const translator = await pipeline(task, model)
    const translation = await translator(input, {
        tgt_lang: 'spa_Latn',
        src_lang: 'eng_Latn',
    })

    return translation
}

```

Transformers.js pulls the model from HuggingFace and installs it into your browser session. Now you can interact with it via the `pipeline` function.

> You can view task options on [Huggingface](https://huggingface.co/tasks). 

> nllb-200 relies on FLORES-200 language codes. See [here](https://github.com/facebookresearch/flores/blob/main/flores200/README.md#languages-in-flores-200) for the full list of languages and their corresponding codes.

## UI Integration

To use the pages directory, replace `app.vue` with the following:

```html
// app.vue

<template>
    <NuxtPage />
</template>
```

Then create an `index.vue` file, hooking into our `translate` function:

```html
// pages/index.vue

<script setup lang="ts">
const input = ref('Hello')
const message = ref()

async function runTranslate() {
    message.value = await translate(input.value)
}
</script>

<template>
    {{ message }}
    <input type="text" v-model="input" />
    <button @click="runTranslate">Translate</button>
</template>
```

## Showcase

> Simple and effective

![](https://i.imgur.com/E1Euk2X.gif)

## Beyond Translation

Swap the model and task for:

- Sentiment analysis: [Xenova/distilbert-sst2](https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english)
- Text generation: [Xenova/t5-small](https://huggingface.co/Xenova/t5-small)
- Image classification: [Xenova/vit-base-patch16-224](https://huggingface.co/Xenova/vit-base-patch16-224)

**Repo**: [nuxt-workers-transformersjs](https://github.com/CodyBontecou/nuxt-workers-transformersjs)
