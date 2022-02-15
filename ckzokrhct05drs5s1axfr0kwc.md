## Silently Update URL in Nuxt 3

# Silently Update URL in Nuxt 3

> We often need to update a query parameter like `?search=hello` within our URL without refreshing the page. I'll quickly show you how to do that using Nuxt 3.

![Silently Update URL in Nuxt 3](https://codybontecou.com/images/update-url.gif)


## Collecting User Input

For this tutorial, I'll be using a simple `<input>` field with `v-model` to gather the query parameter.

```html
<!-- pages/example.vue -->
<template>
  <input v-model="twitchStreamer" />
</template>
```

`twitchStreamer` is now a [reactive variable](https://vuejs.org/guide/extras/reactivity-in-depth.html) that we can work with within `setup()`.

```js
// pages/example.vue
<script>
  setup() {
    const twitchStreamer = ref('')

    return { twitchStreamer }
</script>
```

## Nuxt 3's useRouter()

> I'm not sure what differences there are between Nuxt 2 and Nuxt 3, but so far there haven't been any.

Within `setup()`, call the auto-imported functions `useRouter()` to gain access to the `router` object.

```js
// pages/example.vue
<script>
  setup() {
    const router = useRouter()
    const twitchStreamer = ref('')

    return { twitchStreamer }
</script>
```

## Connecting v-model input to our URL

Now, set up a watcher to watch our `twitchStreamer` v-model value so that every time it's value is updated, a bit of code is ran.

```js
// pages/example.vue
<script>
  setup() {
    const router = useRouter()
    const twitchStreamer = ref('')

    watch(twitchStreamer, (twitchStreamer, previous) => {
      router.push({
        path: '/test',
        query: { streamer: twitchStreamer },
      })
    })

    return { twitchStreamer }
</script>
```

Every time the twitchStreamer value is changed, we push to our URL using [vue-router](https://router.vuejs.org/guide/essentials/navigation.html) with the updated query.

The query parameter of `.push` takes in a key and value. The key in this example is `streamer`.

Because of this, the url that is updated will look like `/test?streamer=` with the `twitchStreamer` value beind after the = sign.

## Final code snippet

```html
<!-- pages/example.vue -->
<template>
  <input v-model="twitchStreamer" />
</template>

<script>
  setup() {
    const router = useRouter()
    const twitchStreamer = ref('')

    watch(twitchStreamer, (twitchStreamer, previous) => {
      router.push({
        path: '/test',
        query: { streamer: twitchStreamer },
      })
    })

    return { twitchStreamer }
</script>
```
