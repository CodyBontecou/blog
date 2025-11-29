<template>
  <div class="newsletter-manager">
    <header class="manager-header">
      <h2 class="header-title">Newsletter</h2>
      <p class="header-subtitle">Manage your email campaigns</p>
    </header>

    <div class="manager-content">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Subscribers</p>
            <p class="stat-value">{{ stats.totalSubscribers }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m2 7 10 6 10-6"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Campaigns Sent</p>
            <p class="stat-value">{{ stats.campaignsSent }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Confirmed</p>
            <p class="stat-value">{{ stats.confirmedSubscribers }}</p>
          </div>
        </div>
      </div>

      <div class="campaigns-section">
        <h3 class="section-title">Recent Campaigns</h3>
        <div v-if="campaigns.length === 0" class="empty-state">
          <p>No campaigns sent yet</p>
        </div>
        <div v-else class="campaigns-list">
          <div
            v-for="campaign in campaigns"
            :key="campaign.id"
            class="campaign-card"
          >
            <div class="campaign-info">
              <h4 class="campaign-title">{{ campaign.article_title }}</h4>
              <p class="campaign-meta">
                Sent {{ formatDate(campaign.sent_at) }} to {{ campaign.recipients_count }} subscribers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase-client'

const stats = ref({
  totalSubscribers: 0,
  confirmedSubscribers: 0,
  campaignsSent: 0,
})

const campaigns = ref<any[]>([])

const loadStats = async () => {
  // Load subscribers count
  const { count: totalCount } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true })

  const { count: confirmedCount } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true })
    .eq('confirmed', true)

  const { count: campaignsCount } = await supabase
    .from('newsletter_campaigns')
    .select('*', { count: 'exact', head: true })

  stats.value = {
    totalSubscribers: totalCount || 0,
    confirmedSubscribers: confirmedCount || 0,
    campaignsSent: campaignsCount || 0,
  }
}

const loadCampaigns = async () => {
  const { data } = await supabase
    .from('newsletter_campaigns')
    .select('*')
    .order('sent_at', { ascending: false })
    .limit(10)

  campaigns.value = data || []
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

onMounted(() => {
  loadStats()
  loadCampaigns()
})
</script>

<style scoped>
.newsletter-manager {
  min-height: 100vh;
  animation: fadeIn 0.4s ease;
}

.manager-header {
  background: #ffffff;
  border-bottom: 1px solid #e8e0d5;
  padding: 2.5rem 3rem 2rem;
}

.header-title {
  font-family: 'Crimson Pro', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d2a26;
  margin: 0;
  letter-spacing: -0.02em;
}

.header-subtitle {
  font-size: 1rem;
  color: #8b7f72;
  margin: 0.5rem 0 0 0;
}

.manager-content {
  padding: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e8e0d5;
  border-radius: 2px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #f5f1e8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9a962;
}

.stat-icon svg {
  width: 28px;
  height: 28px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #8b7f72;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  font-family: 'Crimson Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #2d2a26;
  margin: 0;
}

.campaigns-section {
  background: #ffffff;
  border: 1px solid #e8e0d5;
  border-radius: 2px;
  padding: 2rem;
}

.section-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d2a26;
  margin: 0 0 1.5rem 0;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #8b7f72;
}

.campaigns-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.campaign-card {
  padding: 1.5rem;
  background: #faf8f5;
  border: 1px solid #e8e0d5;
  border-radius: 2px;
}

.campaign-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d2a26;
  margin: 0 0 0.5rem 0;
}

.campaign-meta {
  font-size: 0.875rem;
  color: #8b7f72;
  margin: 0;
}
</style>
