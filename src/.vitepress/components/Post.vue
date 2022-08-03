<template>
  <!-- <Vssue title="title" :options="options"></Vssue> -->
  <h1>{{ id }}</h1>
</template>

<script>
import { VssueComponent } from 'vssue'
import GithubV3 from '@vssue/api-github-v3'

export default {
  data() {
    return {
      title: 'Vssue Demo',
      options: {
        api: GithubV3,
        owner: 'CodyBontecou',
        repo: 'blog',
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    }
  },
  components: {
    Vssue: VssueComponent,
  },
}
</script>
