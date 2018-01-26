

var keyStr  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var alfabet = 'abcdefghijklmnopqrstuvwxyz';

function toAscii(txt){
	var ret = '';
	for (var i=0;i<txt.length;i++) ret+=txt.charCodeAt(i)+',';
	ret = ret.replace(/,$/,'');
	return ret;
}

function encode64(input) {
   var output = ""; var chr1, chr2, chr3; var enc1, enc2, enc3, enc4; var i = 0;
   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
	 enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
	 enc4 = 64;
      }
      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
	 keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   return output;
}

function decode64(input) {
   var output = ""; var chr1, chr2, chr3; var enc1, enc2, enc3, enc4; var i = 0;
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
	 output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
	 output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);
   return output;
}

function MakeKeyedAlphabet(key, alphabet)
{
   var out = "";

   if (typeof(alphabet) != 'string')
      alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   else
      alphabet = alphabet.toUpperCase();

   if (typeof(key) != 'string')
      return alphabet;

   key = key.toUpperCase() + alphabet;
   for (var i = 0; i < key.length; i ++)
   {
      if (out.indexOf(key.charAt(i)) < 0 &&
          alphabet.indexOf(key.charAt(i)) >= 0)
      {
         out += key.charAt(i);
      }
   }

   return out;
}


function Caesar(encdec, text, inc, key, alphabet)
{
   var s = "", b, i, idx;

   if (typeof(alphabet) != 'string')
      alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

   inc = inc * 1;

   key = MakeKeyedAlphabet(key, alphabet);

   if (encdec < 0)
   {
      inc = alphabet.length - inc;
      b = key;
      key = alphabet;
      alphabet = b;
   }

   for (i = 0; i < text.length; i++)
   {
      b = text.charAt(i);
      if ((idx = alphabet.indexOf(b)) >= 0)
      {
	 idx = (idx + inc) % alphabet.length;
 b = key.charAt(idx);
      }
      else if ((idx = alphabet.indexOf(b.toUpperCase())) >= 0)
      {
	 idx = (idx + inc) % alphabet.length;
 b = key.charAt(idx).toLowerCase();
      }
      s += b;
   }
   return s;
}

function atbash(co){
	var kodx='', lit='', nr=0, zq='';
	co=co.toLowerCase();
 for (var iq=0; iq<co.length; iq++){
  lit=co.substring(iq,iq+1);
  if (lit!=' '){
  nr=alfabet.indexOf(lit)+1;
  zq=26-nr;
  kodx+=alfabet.substring(zq,zq+1);
  } else kodx+=' ';
 }
return kodx;
}

function xorek(co,klucz){
	var wynikx='';
 for (var iq=0; iq<co.length; iq++){
  wynikx+=String.fromCharCode(klucz^co.charCodeAt(iq));
 }
return wynikx;
}

function hexdecode(what){
 var data=what.split(' ');
 var ret='';
 for(var i=0;i<data.length;++i){
  if (data[i].match(/^0x[0-9a-fA-F]{1,2}$/)){
   ret+=String.fromCharCode(parseInt(data[i],16));
  }
 }
 return ret;
}

export { encode64, decode64, toAscii, Caesar, hexdecode, atbash, xorek };
