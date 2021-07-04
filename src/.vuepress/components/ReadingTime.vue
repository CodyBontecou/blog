<template>
  <span> <span id="time"></span> minute read </span>
</template>

<script>
function readingTime() {
  const text = document.getElementsByClassName(
    'theme-default-content content__default'
  )[0].innerText

  const wpm = 225
  const words = text.trim().split(/\s+/).length
  const timeToRead = Math.ceil(words / wpm)

  document.getElementById('time').innerText = timeToRead.toString()
}

export default {
  mounted() {
    readingTime()
  },
}
</script>
