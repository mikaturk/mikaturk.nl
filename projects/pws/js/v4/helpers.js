export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function toLetter(number = 0) {
  return String.fromCharCode(number%26+65)
}

export function toNumber(string = 'A', index = 0) {
  return string.charCodeAt(index)-65
}

export function encryptLetter(message='', key='', index=0) {
  return toLetter(
    (
      toNumber(message,index)
      +toNumber(key,index%key.length)
    )%26
  );
}

export function decryptLetter(message='', key='', index=0) {
  return toLetter(
    (
      toNumber(message,index)
      -toNumber(key,index%key.length)
      +26
    )%26
  );
}

export function shuffle(message = '', shufflestring = 'CLXUIQJPSADOWVHBFYERMGTZKN') {
  return message
    // transform message into array
    .split('') 
    // do the shuffle operation for every letter
    .map(letter => shufflestring[
        (shufflestring.indexOf(letter)+1)%shufflestring.length
      ]
    )
    // transform the message back into a string
    .join('')
}