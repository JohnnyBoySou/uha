import axios from 'axios';
import ongs from '@data/ongs';

export async function getONGs() {
   return ongs;
}


export async function getONGSingle(id) {
    return ongs[0];
 }