import axios from 'axios';
import rifas from '@data/extract/rifas';
import extrato from '@data/extract/extrato';
import moedas from '@data/extract/moedas';
import pontos from '@data/extract/pontos';
import doacoes from '@data/extract/doacoes';

import rifas_single from '@data/extract/rifas_single';
import moedas_single from '@data/extract/moedas_single';
import pontos_single from '@data/extract/pontos_single';
import doacoes_single from '@data/extract/doacoes_single';
import extrato_single from '@data/extract/extrato_single';

export async function getSingleExtract(id){
    const rifas = rifas_single.find(rifa => rifa.id === id);
    const moedas = moedas_single.find(moeda => moeda.id === id);
    const pontos = pontos_single.find(ponto => ponto.id === id);
    const doacoes = doacoes_single.find(doacao => doacao.id === id);
    const extrato = extrato_single.find(extrato => extrato.id === id);
    return rifas ? rifas : moedas ? moedas : pontos ? pontos : doacoes ? doacoes : extrato ? extrato : [];
}

export async function getExtract(){
    return extrato
}
export async function getExtractRifas(){
    return rifas;
}
export async function getExtractPontos(){
    return pontos;
}
export async function getExtractDonate(){
    return doacoes;
}
export async function getExtractMoedas(){
    return moedas;
}

