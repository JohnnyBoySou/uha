import axios from 'axios';
import rifas from '@data/rifas';

import rifas_single from '@data/rifas_single';

export async function getSingleExtract(id){
    const res = rifas_single.find(rifa => rifa.id === id);
    return res ? res : rifas_single[0];
}
export async function getExtractRifas(){
    return rifas;
}