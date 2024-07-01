import axios from 'axios';
import rifas from '@data/rifas/rifas';
import rifa_single from '@data/rifas/rifa_single';

export async function getRifas() {
   return rifas;
}

export async function getRifaSingle(id) {
    return rifa_single.find(campaign => campaign.id == id)
}
