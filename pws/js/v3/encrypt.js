export function encrypt(message, key) {
  let charcode = 0;
  let shift = 0;
  let sliceindex = 0;
  let encrypted = '';
  let newkey = '';
  
  for (let a=0; a<message.length/key.length; a++) {
    charcode = key.charCodeAt(a%key.length)-65;
    shift = (charcode+shift)%key.length;
    sliceindex = key.length-shift;
    newkey = key.slice(sliceindex)+key.slice(0,sliceindex);
    console.log({charcode,shift,newkey});
    for (let b=0; b<key.length; b++) {
      const index = a*key.length+b
      if (index<message.length) {
        encrypted += String.fromCharCode((message.charCodeAt(index)+newkey.charCodeAt(index%newkey.length)-2*65)%26+65)
      }
    }
  }
  return encrypted;
}
