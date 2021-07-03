<template>
  <span> {{ timeToRead }} minute read </span>
</template>

<script>
export default {
  computed: {
    timeToRead() {
      const text = document.getElementsByClassName(
        'theme-default-content content__default'
      )[0].innerText
      const words = text.trim().split(/\s+/).length
      const wpm = 225

      return Math.ceil(words / wpm)
    },
  },
}
</script>
