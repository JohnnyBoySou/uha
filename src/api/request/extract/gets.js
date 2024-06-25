import axios from 'axios';
import rifas from '@data/rifas';
import extrato from '@data/extrato';

import rifas_single from '@data/extract/rifas_single';
import moedas_single from '@data/extract/moedas_single';

export async function getSingleExtract(id){
    const res = rifas_single.find(rifa => rifa.id === id);
    const moedas = moedas_single.find(moeda => moeda.id === id);
    return res ? res : rifas_single[0];
}


export async function getExtract(){
    return extrato
}
export async function getExtractRifas(){
    return rifas;
}
export async function getExtractPontos(){
    return rifas;
}
export async function getExtractDonate(){
    return rifas;
}
export async function getExtractMoedas(){
    return rifas;
}

