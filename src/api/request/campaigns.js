import axios from 'axios';
import campaigns from '@data/campaigns/campaigns';
import campaigns_single from '@data/campaigns/campaigns_single';

export async function getCampaigns() {
   return campaigns;
}

export async function getCampaignSingle(id) {
    return campaigns_single.find(campaign => campaign.id == id)
}
