<template>
  <span> {{ timeToRead }} minute read </span>
</template>

<script>
function readingTime(text) {
  const wpm = 225
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}

export default {
  data() {
    return {
      timeToRead: undefined,
    }
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.timeToRead = readingTime(this.text)
  },
}
</script>
