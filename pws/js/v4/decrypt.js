import {toLetter, toNumber, decryptLetter, shuffle} from './helpers.js';

export function decrypt(message='', key='', shufflestring='ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  let charcode = 0;
  let shift = 0;
  let sliceindex = 0;
  let decrypted = '';
  let newkey = '';
  
  for (let a=0; a<message.length/key.length; a++) {
    key = shuffle(key, shufflestring)
    charcode = toNumber(key,a%key.length);
    shift = (charcode+shift)%key.length;
    sliceindex = key.length - shift;
    newkey = key.slice(sliceindex) + key.slice(0,sliceindex);
    console.log({charcode, shift, newkey, key});
    for (let b=0; b<key.length; b++) {
      const index = a*key.length+b
      if (index<message.length) {
        decrypted += decryptLetter(message, newkey, index)
      }
    }
  }
  return decrypted;
}