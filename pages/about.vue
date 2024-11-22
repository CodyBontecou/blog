<template>
    <div class="max-w-3xl mx-auto py-8 px-4">
        <div class="lg:pt-0 lg:grid lg:grid-cols-2 lg:gap-x-12">
            <!-- Left Column -->
            <div class="max-w-lg mx-auto mb-16 lg:mb-0 lg:mx-0">
                <TopNav />

                <main>
                    <div class="mb-12">
                        <h1 class="text-2xl font-normal mb-4">About me</h1>
                        <p>
                            I’m Cody. I'm currently enjoying life. Previously I
                            co-founded
                            <a
                                class="underline"
                                href="https://www.i18nlocale.com"
                                >i18nLocale</a
                            >
                            and
                            <a
                                class="underline"
                                href="https://www.xfeedmuter.com"
                                >xFeedMuter</a
                            >.
                        </p>

                        <h2 class="my-4">A few links to explore:</h2>
                        <ul class="list-disc list-inside space-y-1 underline">
                            <li>
                                <NuxtLink to="/">Writing</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/">Projects</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/">Talks</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/">What I'm doing now</NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <div class="mb-12">
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
                                <a class="underline" href="">
                                    stephango.com/feed
                                </a>
                            </li>
                            <li>
                                Twitter:
                                <a class="underline" href="">@codybontecou</a>
                            </li>
                            <li>
                                Github:
                                <a class="underline" href="">@codybontecou</a>
                            </li>
                            <li>
                                Bluesky:
                                <a class="underline" href="">
                                    @codybontecou.com
                                </a>
                            </li>
                            <li>
                                Threads:
                                <a class="underline" href="">@bonteq</a>
                            </li>
                            <li>
                                Instagram:
                                <a class="underline" href="">@bonteq</a>
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>
