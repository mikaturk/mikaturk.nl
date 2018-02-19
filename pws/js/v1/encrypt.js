export function encrypt(message, key) {
  return message.split('').map((letter, i)=>
    String.fromCharCode((letter.charCodeAt(0)+key.charCodeAt(i%key.length)-2*65)%26+65)
  ).join('');
}
