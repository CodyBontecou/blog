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
last_modified: 2025-03-27T16:16
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
const translator = await pipeline(task, model)

export async function translate(input: string) {
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

## The Performance Challenge

This implementation looks straightforward. However, there's a significant performance bottleneck hidden in this code. Let's break down what happens when you call the `translate` function:

1. **Model Loading**: The `pipeline` function downloads and initializes a large machine learning model.
2. **Resource Intensive**: This process involves:
    - Downloading the model weights (potentially megabytes of data)
    - Parsing and initializing the model in the browser
    - Setting up the computational graph
    - Allocating memory for the model


In the current implementation, if you call `translate()` multiple times:
- The model will be downloaded and initialized **every single time**

## Introducing the Singleton Pattern

The Singleton Pattern provides an elegant solution to prevent repeated model initialization:

```ts
// workers/translate.ts

import { pipeline, TranslationPipeline } from '@xenova/transformers'

class TranslationSingleton {
    private static instance: TranslationSingleton;
    private pipelinePromise: Promise<TranslationPipeline> | null = null;

    private constructor() {}

    public static getInstance(): TranslationSingleton {
        if (!TranslationSingleton.instance) {
            TranslationSingleton.instance = new TranslationSingleton();
        }
        return TranslationSingleton.instance;
    }

    public async getTranslator(): Promise<TranslationPipeline> {
        if (!this.pipelinePromise) {
            this.pipelinePromise = pipeline('translation', 'Xenova/nllb-200-distilled-600M') as Promise<TranslationPipeline>;
        }
        return this.pipelinePromise;
    }
}

export async function translate(input: string) {
    const singleton = TranslationSingleton.getInstance();
    const translator = await singleton.getTranslator();

    const translation = await translator(input, {
        tgt_lang: 'spa_Latn',
        src_lang: 'eng_Latn',
    });

    return translation;
}
```

### How the Singleton Solves Our Problem

1. **One-Time Initialization**: The model is loaded only once, the first time `getTranslator()` is called.
2. **Cached Pipeline**: Subsequent calls return the same pipeline instance.
3. **Lazy Loading**: The model is only loaded when first needed.
4. **Performance Optimization**: Reduces unnecessary network requests and computational overhead.

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
