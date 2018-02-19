export function decrypt(message, key) {
  return message.split('').map((letter, i)=>
    String.fromCharCode((letter.charCodeAt(0)-key.charCodeAt(i%key.length)+26)%26+65)
  ).join('');
}
