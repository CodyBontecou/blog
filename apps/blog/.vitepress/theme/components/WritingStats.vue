<script setup lang="ts">
import { computed, ref } from 'vue'
import { data as archive } from '../posts.data'
import {
    filterWritingPosts,
    getTopicCounts,
    getWritingPosts,
    type WritingPost,
} from '../utils/writing-stats'

const posts = getWritingPosts(archive)
const topics = getTopicCounts(posts)
const years = [
    ...new Set(
        posts.flatMap((post) => (post.year === null ? [] : [post.year])),
    ),
].sort((a, b) => a - b)
const hasUndated = posts.some((post) => post.year === null)
const selectedYear = ref('')
const selectedTopic = ref('')
const showAllTopics = ref(false)
const hoveredPost = ref<WritingPost | null>(null)
const shownArticles = ref(20)
const number = (value: number) => value.toLocaleString('en-US')
const totalWords = posts.reduce((sum, post) => sum + post.words, 0)
const firstYear = years[0] ?? '—'
const filtered = computed(() =>
    filterWritingPosts(posts, selectedYear.value, selectedTopic.value),
)
const visibleArticles = computed(() =>
    filtered.value.slice(0, shownArticles.value),
)
const visibleTopics = computed(() =>
    showAllTopics.value ? topics : topics.slice(0, 8),
)
const groups = computed(() => [
    ...years.map((year) => ({
        key: String(year),
        label: String(year),
        posts: posts.filter((post) => post.year === year),
    })),
    ...(hasUndated
        ? [
              {
                  key: 'undated',
                  label: 'Undated',
                  posts: posts.filter((post) => post.year === null),
              },
          ]
        : []),
])
const matchingUrls = computed(
    () => new Set(filtered.value.map((post) => post.url)),
)
// Fixed colors are assigned by archive frequency so filtering never changes a topic's color.
const colors = [
    '#62877a',
    '#738aa9',
    '#b78b62',
    '#9c7eaa',
    '#b87977',
    '#8a9560',
    '#66999e',
    '#ac8b9a',
]
const topicColor = (topic: string) => {
    const index = topics.findIndex((item) => item.topic === topic)
    return index >= 0 && index < colors.length ? colors[index] : '#929292'
}
const postTopic = (post: WritingPost) =>
    topics.find((item) => post.topics.includes(item.topic))?.topic || ''
const postColor = (post: WritingPost) => topicColor(postTopic(post))
const trendTopics = computed(() =>
    selectedTopic.value
        ? topics.filter((item) => item.topic === selectedTopic.value)
        : topics.slice(0, 8),
)
const trendCount = (topic: string, year: number) =>
    posts.filter((post) => post.year === year && post.topics.includes(topic))
        .length
const maxTrend = Math.max(
    1,
    ...topics
        .slice(0, 8)
        .flatMap((item) => years.map((year) => trendCount(item.topic, year))),
)
const formatDate = (post: WritingPost) =>
    post.date
        ? new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'UTC',
          })
        : 'Date unknown'
function resetResults() {
    shownArticles.value = 20
    hoveredPost.value = null
}
function toggleYear(year: string) {
    selectedYear.value = selectedYear.value === year ? '' : year
    resetResults()
}
function toggleTopic(topic: string) {
    selectedTopic.value = selectedTopic.value === topic ? '' : topic
    resetResults()
}
function clearTopic() {
    selectedTopic.value = ''
    resetResults()
}
function selectTrend(year: number, topic: string) {
    selectedYear.value = String(year)
    selectedTopic.value = topic
    resetResults()
}
function clearFilters() {
    selectedYear.value = ''
    selectedTopic.value = ''
    resetResults()
}
</script>

<template>
    <main id="writing-stats" class="writing-stats">
        <a class="stats-skip" href="#articles-title">Skip to articles</a>
        <header class="stats-intro">
            <p class="eyebrow">The writing archive</p>
            <h1>Writing, over time.</h1>
            <p>
                A record of what I’ve been learning, building, and coming back
                to. One post at a time.
            </p>
        </header>

        <dl class="summary" aria-label="Entire published archive">
            <div>
                <dt>Posts published</dt>
                <dd>{{ number(posts.length) }}</dd>
            </div>
            <div>
                <dt>Words written</dt>
                <dd>{{ number(totalWords) }}</dd>
            </div>
            <div>
                <dt>Topics explored</dt>
                <dd>{{ number(topics.length) }}</dd>
            </div>
            <div>
                <dt>Writing since</dt>
                <dd>{{ firstYear }}</dd>
            </div>
        </dl>

        <section class="stats-section" aria-labelledby="mosaic-title">
            <div class="section-heading">
                <h2 id="mosaic-title">One square, one post</h2>
                <span>{{ years.length }} years</span>
            </div>
            <p class="section-note">
                Read across the years. Select a year or topic to narrow the
                archive. Open a square to read the post.
            </p>
            <div class="filters">
                <label
                    >Year
                    <select v-model="selectedYear" @change="resetResults">
                        <option value="">All years</option>
                        <option
                            v-for="year in years"
                            :key="year"
                            :value="String(year)"
                        >
                            {{ year }}
                        </option>
                        <option v-if="hasUndated" value="undated">
                            Undated
                        </option>
                    </select>
                </label>
                <label
                    >Topic
                    <select v-model="selectedTopic" @change="resetResults">
                        <option value="">All topics</option>
                        <option
                            v-for="item in topics"
                            :key="item.topic"
                            :value="item.topic"
                        >
                            {{ item.topic }} ({{ item.count }})
                        </option>
                    </select>
                </label>
            </div>
            <div class="mosaic" aria-label="Published posts grouped by year">
                <div
                    v-for="group in groups"
                    :key="group.key"
                    class="mosaic-row"
                >
                    <button
                        class="year-label"
                        :class="{ selected: selectedYear === group.key }"
                        :aria-pressed="selectedYear === group.key"
                        @click="toggleYear(group.key)"
                    >
                        {{ group.label }}<span>{{ group.posts.length }}</span>
                    </button>
                    <div class="squares">
                        <a
                            v-for="post in [...group.posts].reverse()"
                            :key="post.url"
                            :href="post.url"
                            class="post-square"
                            :class="{ dimmed: !matchingUrls.has(post.url) }"
                            :style="{ '--topic-color': postColor(post) }"
                            :aria-label="`${post.title}, ${formatDate(post)}${post.topics.length ? ', ' + post.topics.join(', ') : ''}`"
                            :title="`${post.title} · ${formatDate(post)}`"
                            @mouseenter="hoveredPost = post"
                            @mouseleave="hoveredPost = null"
                            @focus="hoveredPost = post"
                            @blur="hoveredPost = null"
                            ><span
                        /></a>
                    </div>
                </div>
            </div>
            <p class="post-preview" aria-live="polite">
                {{
                    hoveredPost
                        ? `${formatDate(hoveredPost)} · ${hoveredPost.title}`
                        : 'Each square links to a published post. Color follows its most common topic.'
                }}
            </p>
            <div class="topic-legend" aria-label="Filter by topic">
                <button
                    :aria-pressed="!selectedTopic"
                    :class="{ selected: !selectedTopic }"
                    @click="clearTopic"
                >
                    All topics
                </button>
                <button
                    v-for="item in visibleTopics"
                    :key="item.topic"
                    :aria-pressed="selectedTopic === item.topic"
                    :class="{ selected: selectedTopic === item.topic }"
                    @click="toggleTopic(item.topic)"
                >
                    <i
                        :style="{ background: topicColor(item.topic) }"
                        aria-hidden="true"
                    />{{ item.topic }}<span>{{ item.count }}</span>
                </button>
                <button
                    v-if="topics.length > 8"
                    class="text-button"
                    :aria-expanded="showAllTopics"
                    @click="showAllTopics = !showAllTopics"
                >
                    {{
                        showAllTopics
                            ? 'Fewer topics'
                            : `All ${topics.length} topics`
                    }}
                </button>
            </div>
            <p class="section-note">
                Less common topics and posts without a topic appear in gray.
            </p>
        </section>

        <section class="stats-section" aria-labelledby="trends-title">
            <div class="section-heading">
                <h2 id="trends-title">Topics through the years</h2>
                <span>Posts per year</span>
            </div>
            <p class="section-note">
                {{
                    selectedTopic
                        ? `Following ${selectedTopic}. Clear the topic to compare the eight most frequent.`
                        : 'The eight topics I return to most. Darker cells mean more posts.'
                }}
                Posts can appear in more than one topic.
            </p>
            <div
                class="trend-scroll"
                tabindex="0"
                role="region"
                aria-label="Topic trends table, scroll horizontally on smaller screens"
            >
                <table class="trend-table">
                    <caption class="sr-only">
                        Published posts per topic and year. Select a count to
                        filter the archive.
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">Topic</th>
                            <th v-for="year in years" :key="year" scope="col">
                                <button
                                    :class="{
                                        selected: selectedYear === String(year),
                                    }"
                                    :aria-pressed="
                                        selectedYear === String(year)
                                    "
                                    @click="toggleYear(String(year))"
                                >
                                    {{ year }}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in trendTopics" :key="item.topic">
                            <th scope="row">
                                <button
                                    :aria-pressed="selectedTopic === item.topic"
                                    @click="toggleTopic(item.topic)"
                                >
                                    <i
                                        :style="{
                                            background: topicColor(item.topic),
                                        }"
                                        aria-hidden="true"
                                    />{{ item.topic }}
                                </button>
                            </th>
                            <td v-for="year in years" :key="year">
                                <button
                                    class="trend-cell"
                                    :class="{
                                        'active-cell':
                                            selectedYear === String(year) &&
                                            selectedTopic === item.topic,
                                    }"
                                    :style="{
                                        '--cell-strength':
                                            trendCount(item.topic, year) /
                                            Math.max(
                                                maxTrend,
                                                ...years.map((y) =>
                                                    trendCount(item.topic, y),
                                                ),
                                            ),
                                    }"
                                    :aria-label="`${item.topic}, ${year}: ${trendCount(item.topic, year)} posts. Filter archive.`"
                                    @click="selectTrend(year, item.topic)"
                                >
                                    {{ trendCount(item.topic, year) || '·' }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="stats-section" aria-labelledby="articles-title">
            <div class="section-heading">
                <h2 id="articles-title">From the archive</h2>
                <span role="status"
                    >{{ filtered.length }}
                    {{ filtered.length === 1 ? 'post' : 'posts' }}</span
                >
            </div>
            <div
                v-if="selectedYear || selectedTopic"
                class="filter-description"
            >
                <p>
                    {{ selectedTopic || 'All topics' }} ·
                    {{ selectedYear || 'All years' }}
                </p>
                <button class="text-button" @click="clearFilters">
                    Clear filters
                </button>
            </div>
            <p v-else class="section-note">
                Everything published, newest first.
            </p>
            <ul v-if="filtered.length" class="stats-articles">
                <li v-for="post in visibleArticles" :key="post.url">
                    <a :href="post.url"
                        ><time :datetime="post.date || undefined">{{
                            formatDate(post)
                        }}</time>
                        <h3>{{ post.title }}</h3>
                        <p>
                            {{ post.topics.join(' · ') || 'Uncategorized' }}
                        </p></a
                    >
                </li>
            </ul>
            <div v-else class="empty-state">
                <h3>No posts in this selection.</h3>
                <p>Try another year or topic to explore more of the archive.</p>
                <button class="text-button" @click="clearFilters">
                    Show all posts
                </button>
            </div>
            <button
                v-if="filtered.length > shownArticles"
                class="load-more"
                @click="shownArticles += 20"
            >
                Show more posts
                <span>{{ filtered.length - shownArticles }} remaining</span>
            </button>
        </section>
        <footer class="stats-footer">
            <p>
                Built from the published archive. Totals update when the site is
                built. Word counts estimate prose and exclude fenced code
                blocks. Undated posts are included in totals, but not yearly
                trends.
            </p>
            <a href="https://levels.io/stats">Inspired by Pieter Levels ↗</a>
        </footer>
    </main>
</template>

<style scoped>
.stats-skip {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
}
.stats-skip:focus {
    position: static;
    display: inline-block;
    width: auto;
    height: auto;
    clip-path: none;
    margin-bottom: 16px;
}
.writing-stats {
    --stats-text: #1a1a1a;
    --stats-muted: #666;
    --stats-line: #e0e0e0;
    --stats-surface: #f0f0f0;
    color: var(--stats-text);
    padding-top: 16px;
}
.stats-intro {
    margin-bottom: 32px;
}
.eyebrow {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--stats-muted);
    margin: 0 0 16px;
}
h1,
h2,
h3,
dd {
    font-family: 'Crimson Pro', serif;
    font-weight: 400;
    text-wrap: balance;
}
h1 {
    font-size: 48px;
    line-height: 1;
    letter-spacing: -0.02em;
    margin: 0 0 16px;
}
.stats-intro > p:last-child {
    max-width: 680px;
    font-size: 16px;
    line-height: 24px;
    color: var(--stats-muted);
}
p {
    text-wrap: pretty;
}
.summary {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    padding: 24px 0;
    margin: 0;
}
.summary dt {
    color: var(--stats-muted);
    font-size: 12px;
    line-height: 16px;
}
.summary dd {
    font-size: 36px;
    line-height: 40px;
    font-variant-numeric: tabular-nums;
    margin: 4px 0 0;
}
.stats-section {
    margin-top: 48px;
}
.section-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
}
h2 {
    font-size: 24px;
    line-height: 32px;
    margin: 0;
}
.section-heading > span {
    font-size: 12px;
    line-height: 16px;
    color: var(--stats-muted);
    flex-shrink: 0;
}
.section-note,
.post-preview,
.stats-footer,
.filter-description {
    font-size: 14px;
    line-height: 20px;
    color: var(--stats-muted);
}
.section-note {
    margin: 0 0 16px;
}
.filters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 24px 0;
}
.filters label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--stats-muted);
    font-size: 12px;
    line-height: 16px;
    min-width: 0;
}
select {
    font-family: inherit;
    font-size: 16px;
    line-height: 24px;
    padding: 8px 12px;
    width: 100%;
    border: 1px solid var(--stats-line);
    border-radius: 4px;
    background: transparent;
    color: var(--stats-text);
}
option {
    background: #fafafa;
    color: #1a1a1a;
}
button,
a,
select {
    touch-action: manipulation;
}
button {
    font-family: inherit;
    cursor: pointer;
    color: inherit;
    user-select: none;
}
button,
a {
    -webkit-tap-highlight-color: transparent;
}
button:active,
a:active {
    opacity: 0.65;
}
button:focus-visible,
a:focus-visible,
select:focus-visible,
.trend-scroll:focus-visible {
    outline: 2px solid var(--stats-text);
    outline-offset: 4px;
}
.mosaic {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.mosaic-row {
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr);
    gap: 12px;
    align-items: start;
}
.year-label {
    display: flex;
    gap: 8px;
    align-items: center;
    text-align: left;
    padding: 4px 0;
    font-size: 12px;
    line-height: 16px;
}
.year-label span {
    color: var(--stats-muted);
    font-size: 12px;
}
.selected {
    color: var(--stats-text);
    text-decoration: underline;
    text-underline-offset: 4px;
}
.squares {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
}
.post-square {
    width: 24px;
    height: 24px;
    display: inline-flex;
    padding: 2px;
    transition: opacity 180ms cubic-bezier(0.32, 0.72, 0, 1);
}
.post-square span {
    width: 100%;
    height: 100%;
    background: var(--topic-color);
    border-radius: 2px;
}
.post-square.dimmed {
    opacity: 0.15;
}
.post-preview {
    min-height: 40px;
    margin: 16px 0;
}
.topic-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}
.topic-legend button {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    border: 1px solid var(--stats-line);
    padding: 8px 12px;
    font-size: 12px;
    line-height: 16px;
}
.topic-legend button.selected {
    border-color: var(--stats-text);
}
.topic-legend span {
    color: var(--stats-muted);
}
i {
    display: inline-block;
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 2px;
}
.topic-legend .text-button {
    border-color: transparent;
}
.text-button {
    text-decoration: underline;
    text-underline-offset: 4px;
    font-size: 14px;
    line-height: 20px;
    padding: 8px 0;
}
.trend-scroll {
    overflow-x: auto;
    padding: 4px;
    margin: 0 -4px;
}
.trend-table {
    display: table;
    border-collapse: separate;
    border-spacing: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 16px;
}
.trend-table th {
    font-weight: 400;
    text-align: left;
}
.trend-table thead th {
    color: var(--stats-muted);
    padding-bottom: 8px;
}
.trend-table th button {
    padding: 4px;
    white-space: nowrap;
}
.trend-table tbody th button {
    display: flex;
    align-items: center;
    gap: 8px;
}
.trend-cell {
    display: block;
    position: relative;
    isolation: isolate;
    width: 100%;
    min-width: 32px;
    min-height: 32px;
    padding: 8px;
    text-align: center;
    font-variant-numeric: tabular-nums;
}
.trend-cell::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: #738aa9;
    opacity: calc(0.06 + var(--cell-strength) * 0.45);
    border-radius: 2px;
}
.active-cell {
    outline: 1px solid var(--stats-text);
}
.filter-description {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: baseline;
    margin-bottom: 24px;
}
.stats-articles {
    list-style: none;
    padding: 0;
    margin: 24px 0 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.stats-articles a {
    display: block;
    text-decoration: none;
}
.stats-articles time {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.05em;
    color: var(--stats-muted);
}
.stats-articles h3 {
    font-size: 20px;
    line-height: 28px;
    margin: 8px 0 4px;
}
.stats-articles p {
    color: var(--stats-muted);
    font-size: 12px;
    line-height: 16px;
    margin: 0;
}
.load-more {
    width: 100%;
    border: 1px solid var(--stats-line);
    border-radius: 4px;
    padding: 12px 16px;
    margin-top: 32px;
    font-size: 14px;
    line-height: 20px;
}
.load-more span {
    color: var(--stats-muted);
    margin-left: 8px;
}
.empty-state {
    padding: 24px;
    background: var(--stats-surface);
    margin-top: 24px;
}
.empty-state h3 {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 8px;
}
.empty-state p {
    font-size: 14px;
    line-height: 20px;
    color: var(--stats-muted);
}
.stats-footer {
    margin-top: 48px;
    font-size: 12px;
    line-height: 16px;
}
.stats-footer a {
    display: inline-block;
    text-decoration: underline;
    text-underline-offset: 4px;
    margin-top: 12px;
}
@media (hover: hover) and (pointer: fine) {
    .post-square:hover {
        opacity: 1;
        outline: 1px solid var(--stats-text);
        outline-offset: 0;
    }
    .year-label:hover,
    .text-button:hover,
    .stats-articles a:hover,
    .stats-footer a:hover {
        opacity: 0.65;
    }
    .topic-legend button:hover,
    .load-more:hover,
    .trend-cell:hover {
        background: var(--stats-surface);
    }
}
@media (prefers-color-scheme: dark) {
    .writing-stats {
        --stats-text: #fafafa;
        --stats-muted: #aaa;
        --stats-line: #444;
        --stats-surface: #272727;
        color-scheme: dark;
    }
    option {
        background: #1a1a1a;
        color: #fafafa;
    }
    .trend-cell::before {
        background: #b7cde0;
    }
}
@media (min-width: 1500px) {
    .summary {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
@media (max-width: 640px) {
    .writing-stats {
        padding-top: 0;
    }
    h1 {
        font-size: 36px;
        line-height: 40px;
    }
    .section-heading {
        flex-wrap: wrap;
        gap: 4px;
    }
    .mosaic-row {
        grid-template-columns: 64px minmax(0, 1fr);
        gap: 8px;
    }
    .post-square {
        width: 32px;
        height: 32px;
        padding: 4px;
    }
    .year-label {
        padding: 8px 0;
    }
    .filters {
        grid-template-columns: minmax(0, 1fr);
    }
    .summary {
        gap: 24px 16px;
    }
}
</style>
