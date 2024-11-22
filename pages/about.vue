<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
    description:
        'A bit about myself and a directory that may lead you to better understand me.',
    ogTitle: 'About me | Cody Bontecou',
    ogDescription:
        'A bit about myself and a directory that may lead you to better understand me.',
    twitterTitle: 'About me | Cody Bontecou',
    twitterDescription:
        'A bit about myself and a directory that may lead you to better understand me.',
    twitterCard: 'summary',
})

useHead({
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'icon',
            type: 'image/ico',
            href: '/favicon.ico',
        },
    ],
})

const cofoundedLinks = [
    { to: 'https://www.i18nlocale.com', name: 'i18nLocale' },
    { to: 'https://www.xfeedmuter.com', name: 'xFeedMuter' },
]

const linksToExplore = [
    { to: '/', name: 'Writing' },
    { to: 'projects', name: 'Projects' },
    { to: 'talks', name: 'Talks' },
    { to: 'now', name: "What I'm doing now" },
]

const allLinks = [
    { links: cofoundedLinks, header: t('about.cofoundedHeader') },
    { links: linksToExplore, header: t('about.linksToExploreHeader') },
]
</script>

<template>
    <main>
        <div class="mb-12">
            <h1 class="text-2xl font-normal mb-4">About me</h1>
            <p>
                I’m Cody. I'm currently enjoying life with my wife in our
                vintage 1977 Toyota RV. We are actively chasing sunshine and
                warmth while finding the occasional surf and/or hot spring.
            </p>

            <AboutSection
                v-for="linkObj in allLinks"
                :links="linkObj.links"
                :header="linkObj.header"
                :separate="true"
            />
        </div>

        <h2 class="text-lg font-normal">Elsewhere</h2>
        <p class="my-4">
            You can
            <NuxtLink class="underline" to="subscribe">
                receive updates from me via email
            </NuxtLink>
            or follow me:
        </p>

        <ul class="list-disc list-inside space-y-1">
            <li>
                RSS feed:
                <NuxtLink class="underline" to="/feed">
                    codybontecou.com/feed
                </NuxtLink>
            </li>
            <li>
                Youtube:
                <a
                    class="underline"
                    href="https://www.youtube.com/@codybontecou"
                >
                    @codybontecou
                </a>
            </li>
            <li>
                Github:
                <a class="underline" href="http://github.com/codybontecou">
                    @codybontecou
                </a>
            </li>
            <li>
                Bluesky:
                <a
                    class="underline"
                    href="https://bsky.app/profile/codybontecou.com"
                >
                    @codybontecou.com
                </a>
            </li>
            <li>
                Twitter:
                <a class="underline" href="http://x.com/codybontecou">
                    @codybontecou
                </a>
            </li>
            <li>
                Threads:
                <a class="underline" href="http://threads.net/@bonteq">
                    @bonteq
                </a>
            </li>
            <li>
                Instagram:
                <a class="underline" href="https://www.instagram.com/bonteq/">
                    @bonteq
                </a>
            </li>
            <li>
                LinkedIn:
                <a
                    class="underline"
                    href="https://www.linkedin.com/in/cody-bontecou/"
                >
                    codybontecou
                </a>
            </li>
        </ul>

        <Separator class="my-10" />

        <h2 class="text-lg font-normal">Colophon</h2>
        <p class="my-4">
            This site is written and editted using
            <a class="underline" href="https://obsidian.md"> Obsidian </a>
            . I strive to stay inline the with philosophy of
            <a class="underline" href="https://stephango.com/file-over-app">
                File over app</a
            >.
        </p>
        <p class="my-4">
            My markdown files are compiled into web pages using
            <a class="underline" href="https://nuxt.com">Nuxt</a>
            and
            <a class="underline" href="https://content.nuxt.com">
                Nuxt content </a
            >. This site is then automatically deployed using
            <a class="underline" href="https://nuxt.studio">Nuxt Studio</a>.
        </p>
        <p class="my-4">
            The site is styled using
            <a class="underline" href="https://tailwindcss.com">tailwindcss</a>.
        </p>

        <Separator class="my-10" />

        <Newsletter />
    </main>
</template>
