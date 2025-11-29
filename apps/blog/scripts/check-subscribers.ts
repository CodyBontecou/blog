#!/usr/bin/env tsx

import { config } from 'dotenv'

// Load environment variables BEFORE importing modules that use them
config()

import { supabase } from '../lib/supabase'

async function checkSubscribers() {
    console.log('📊 Checking Subscriber Database\n')
    
    try {
        // Get all subscribers
        const { data: allSubscribers, error: allError } = await supabase
            .from('subscribers')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (allError) {
            console.error('❌ Error fetching subscribers:', allError)
            process.exit(1)
        }
        
        // Get confirmed subscribers
        const { data: confirmedSubscribers, error: confirmedError } = await supabase
            .from('subscribers')
            .select('*')
            .eq('confirmed', true)
            .order('created_at', { ascending: false })
        
        if (confirmedError) {
            console.error('❌ Error fetching confirmed subscribers:', confirmedError)
            process.exit(1)
        }
        
        console.log('📈 Subscriber Statistics:')
        console.log(`   Total subscribers: ${allSubscribers?.length || 0}`)
        console.log(`   Confirmed subscribers: ${confirmedSubscribers?.length || 0}`)
        console.log(`   Unconfirmed subscribers: ${(allSubscribers?.length || 0) - (confirmedSubscribers?.length || 0)}`)
        
        if (confirmedSubscribers && confirmedSubscribers.length > 0) {
            console.log('\n✅ Confirmed Subscribers:')
            confirmedSubscribers.forEach((sub, index) => {
                console.log(`   ${index + 1}. ${sub.email} (joined: ${new Date(sub.created_at).toLocaleDateString()})`)
            })
        } else {
            console.log('\n⚠️  No confirmed subscribers found!')
            console.log('   This explains why newsletters aren\'t being sent.')
        }
        
        if (allSubscribers && allSubscribers.length > confirmedSubscribers?.length) {
            const unconfirmed = allSubscribers.filter(sub => !sub.confirmed)
            console.log('\n⏳ Unconfirmed Subscribers:')
            unconfirmed.forEach((sub, index) => {
                console.log(`   ${index + 1}. ${sub.email} (signed up: ${new Date(sub.created_at).toLocaleDateString()})`)
            })
        }
        
        // Check recent campaigns
        const { data: campaigns, error: campaignError } = await supabase
            .from('newsletter_campaigns')
            .select('*')
            .order('sent_at', { ascending: false })
            .limit(5)
        
        if (!campaignError && campaigns && campaigns.length > 0) {
            console.log('\n📧 Recent Newsletter Campaigns:')
            campaigns.forEach((campaign, index) => {
                console.log(`   ${index + 1}. "${campaign.article_title}" - Sent to ${campaign.recipients_count} recipients on ${new Date(campaign.sent_at).toLocaleDateString()}`)
            })
        } else {
            console.log('\n📧 No newsletter campaigns found in the database.')
        }
        
    } catch (error) {
        console.error('❌ Unexpected error:', error)
        process.exit(1)
    }
}

checkSubscribers().catch(console.error)