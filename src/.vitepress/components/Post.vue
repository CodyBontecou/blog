<template>
  <Vssue title="title" />
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Function],
      required: false,
    },
    issueId: {
      type: [String, Number],
      required: false,
    },
    options: {
      type: Object,
      required: false,
    },
  },

  computed: {
    // vssueProps() {
    //   return Object.assign({
    //     title: this.$page.title,
    //     options: {
    //       // set the platform api
    //       api: GithubV3,
    //       // here set the default options for your OAuth App
    //       owner: 'CodyBontecou',
    //       repo: 'blog',
    //       clientId: process.env.GITHUB_CLIENT_ID,
    //       clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //     },
    //   })
    // },
  },
}
</script>
