import {encrypt as encrypt_v1} from './v1/encrypt.js';
import {decrypt as decrypt_v1} from './v1/decrypt.js';
import {encrypt as encrypt_v2} from './v2/encrypt.js';
import {decrypt as decrypt_v2} from './v2/decrypt.js';
import {encrypt as encrypt_v3} from './v3/encrypt.js';
import {decrypt as decrypt_v3} from './v3/decrypt.js';
import {encrypt as encrypt_v4} from './v4/encrypt.js';
import {decrypt as decrypt_v4} from './v4/decrypt.js';
import {encrypt as encrypt_v5} from './v5/encrypt.js';
import {decrypt as decrypt_v5} from './v5/decrypt.js';
import * as helpers_v4 from './v4/helpers.js';
import * as helpers_v5 from './v5/helpers.js';

const methods = [
  {encrypt: encrypt_v1, decrypt: decrypt_v1},
  {encrypt: encrypt_v2, decrypt: decrypt_v2},
  {encrypt: encrypt_v3, decrypt: decrypt_v3},
  {encrypt: encrypt_v4, decrypt: decrypt_v4},
  {encrypt: encrypt_v5, decrypt: decrypt_v5}
];

methods.forEach((version, i)=>{
  document.getElementById(`v${i+1}-encrypt-button`).addEventListener('click', e=>{
    const message = document.getElementById(`v${i+1}-encrypt-message`).value;
    const key = document.getElementById(`v${i+1}-encrypt-key`).value;
    const shufflestringRef = document.getElementById(`v${i+1}-encrypt-shufflestring`)
    const randomizeRef = document.getElementById(`v${i+1}-encrypt-shufflestring-randomize`)
    if (randomizeRef && randomizeRef.checked) {
      shufflestringRef.value = helpers_v5.shuffleString((i===3?helpers_v4:helpers_v5).alphabet)
    }
    const shufflestring = shufflestringRef&&shufflestringRef.value
    const outcome = version.encrypt(i===4?message:message.toUpperCase(), i===4?key:key.toUpperCase(), shufflestring)
    document.getElementById(`v${i+1}-encrypt-outcome`).value = outcome
  });
  document.getElementById(`v${i+1}-decrypt-button`).addEventListener('click', e=>{
    const message = document.getElementById(`v${i+1}-decrypt-message`).value;
    const key = document.getElementById(`v${i+1}-decrypt-key`).value;
    const shufflestringRef = document.getElementById(`v${i+1}-encrypt-shufflestring`)
    const shufflestring = shufflestringRef&&shufflestringRef.value
    const outcome = version.decrypt(i===4?message:message.toUpperCase(), i===4?key:key.toUpperCase(), shufflestring)
    document.getElementById(`v${i+1}-decrypt-outcome`).value = outcome
  });
})
