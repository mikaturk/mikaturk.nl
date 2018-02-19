export function encrypt(message, key) {
  let encrypted = '';
  for (let a=0; a<message.length/key.length; a++) {
    for (let b=0; b<key.length; b++) {
      const index = a*key.length+b
      if (index<message.length) {
        encrypted += String.fromCharCode((message.charCodeAt(index)+key.charCodeAt(index%key.length)-2*65)%26+65)
      }
    }
    key = key.slice(1)+key[0]
  }
  return encrypted;
}
