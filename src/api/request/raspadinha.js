import axios from 'axios';
import raspadinhas from '@data/raspadinhas/raspadinhas';
import raspadinha_single from '@data/raspadinhas/raspadinha_single';

export async function getRaspadinhas() {
   return raspadinhas
}

export async function getRaspadinhaSingle(id) {
    return raspadinha_single.find(campaign => campaign.id == id)
}
