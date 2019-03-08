export const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,. ';

export function toLetter(number = 0) {
  return alphabet[number%alphabet.length];
}

export function toNumber(string = 'A', index = 0) {
  return alphabet.indexOf(string[index]);
}

export function encryptLetter(message='', key='', index=0) {
  
  return toLetter((
    toNumber(message,index)
    +toNumber(key,index%key.length)
  )%alphabet.length);
}

export function decryptLetter(message='', key='', index=0) {
  return toLetter((
    toNumber(message,index)
    -toNumber(key,index%key.length)
    +alphabet.length
  )%alphabet.length);
}

export function shuffleString(str) {
  let newstr = '';
  while (str.length > 0) {
    const index = Math.floor(Math.random()*str.length) 
    newstr+=str[index]
    str = str.slice(0,index)+str.slice(index+1, str.length)
  }
  return newstr;
}

export function shuffle(message = '', shufflestring = shuffleString(alphabet)) {
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