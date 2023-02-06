<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed, ref, watch, onMounted } from 'vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <SimpleNewsletter />
      <Comments />
      <vue-cookie-accept-decline
        :debug="false"
        :disableDecline="false"
        :showPostponeButton="false"
        @status="cookieStatus"
        elementId="myPanel1"
        position="bottom-right"
        ref="myPanel1"
        transitionName="slideFromBottom"
        type="floating"
      >
        <!-- Optional -->
        <template #postponeContent>&times;</template>

        <!-- Optional -->
        <template #message>
          <span class="text-gray-900">
            We use cookies to ensure you get the best experience on our website.
          </span>
          <a
            href="https://cookiesandyou.com/"
            target="_blank"
            class="text-blue-ninja"
            >Learn More...</a
          >
        </template>

        <!-- Optional -->
        <template #declineContent>Opt Out</template>

        <!-- Optional -->
        <template #acceptContent>Got It!</template>
      </vue-cookie-accept-decline>
    </template>
  </Layout>
</template>
