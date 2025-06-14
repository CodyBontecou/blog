<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()

useSeoMeta({
    description:
        'A bit about myself and a directory that may lead you to better understand me.',
    ogTitle: 'About me | Cody Bontecou',
    ogDescription:
        'A bit about myself and a directory that may lead you to better understand me.',
    twitterTitle: 'About me | Cody Bontecou',
    twitterDescription:
        'A bit about myself and a directory that may lead you to better understand me.',
    twitterCard: 'summary_large_image',
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
        {
            rel: 'canonical',
            href: `${config.public.siteUrl}/about`,
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
                <a class="underline" href="/rss.xml" target="_blank">
                    codybontecou.com/rss
                </a>
            </li>
            <li>
                Youtube:
                <a
                    class="underline"
                    href="https://www.youtube.com/@codybontecou"
                    target="_blank"
                >
                    @codybontecou
                </a>
            </li>
            <li>
                Github:
                <a
                    class="underline"
                    href="http://github.com/codybontecou"
                    target="_blank"
                >
                    @codybontecou
                </a>
            </li>
            <li>
                Bluesky:
                <a
                    class="underline"
                    href="https://bsky.app/profile/codybontecou.com"
                    target="_blank"
                >
                    @codybontecou.com
                </a>
            </li>
            <li>
                Twitter:
                <a
                    class="underline"
                    href="http://x.com/codybontecou"
                    target="_blank"
                >
                    @codybontecou
                </a>
            </li>
            <li>
                Threads:
                <a
                    class="underline"
                    href="http://threads.net/@bonteq"
                    target="_blank"
                >
                    @bonteq
                </a>
            </li>
            <li>
                Instagram:
                <a
                    class="underline"
                    href="https://www.instagram.com/bonteq/"
                    target="_blank"
                >
                    @bonteq
                </a>
            </li>
            <li>
                LinkedIn:
                <a
                    class="underline"
                    href="https://www.linkedin.com/in/cody-bontecou/"
                    target="_blank"
                >
                    codybontecou
                </a>
            </li>
        </ul>

        <Separator class="my-10" />

        <h2 class="text-lg font-normal">Colophon</h2>
        <p class="my-4">
            This site is written and editted using
            <a class="underline" href="https://obsidian.md" target="_blank">
                Obsidian</a
            >. I strive to stay inline the with philosophy of
            <a
                class="underline"
                href="https://stephango.com/file-over-app"
                target="_blank"
            >
                file over app</a
            >.
        </p>
        <p class="my-4">
            My markdown files are compiled into web pages using
            <a class="underline" href="https://nuxt.com" target="_blank"
                >Nuxt</a
            >
            and
            <a
                class="underline"
                href="https://content.nuxt.com"
                target="_blank"
            >
                Nuxt content</a
            >. This site is then automatically deployed using
            <a
                class="underline"
                href="https://github.com/features/actions"
                target="_blank"
            >
                Github Actions</a
            >
            and
            <a class="underline" href="https://vercel.com/" target="_blank">
                Vercel</a
            >.
        </p>
        <p class="my-4">
            The site is styled using
            <a class="underline" href="https://tailwindcss.com" target="_blank"
                >tailwindcss</a
            >
            alongside
            <a
                class="underline"
                href="https://www.shadcn-vue.com/"
                target="_blank"
                >Shadcn-vue</a
            >.
        </p>

        <Separator class="my-10" />

        <Newsletter />
    </main>
</template>
