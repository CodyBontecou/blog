<template>
  <div class="mt-10 flex items-center text-sm text-gray-400">
    <img
      :src="author.image"
      alt="Portrait of Cody Bontecou"
      class="rounded-full w-6 mr-2"
    />
    <span class="text-blue-ninja">&nbsp;{{ author.name }}</span>
    &nbsp;·&nbsp;{{ formattedDate }}&nbsp;·&nbsp;<ReadingTime :text="text" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: undefined,
    }
  },
  props: {
    author: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * Convert timestamp to human readable date without weekday
     */
    formattedDate() {
      const date = new Date(this.date).toDateString()
      return date.replace(/^\S+\s/, '')
    },
  },
  mounted() {
    this.text = document.getElementsByClassName(
      'theme-default-content content__default'
    )[0].innerText
  },
}
</script>
