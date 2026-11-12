import {readFileSync} from 'node:fs';

export function readBootstrap(path) {
  const values={};
  for(const line of readFileSync(path,'utf8').split(/\r?\n/)) {
    const match=/^(Username|Password|ARCAPTCHA_SITE_KEY|ARCAPTCHA_SECRET_KEY):[ \t]*(.*)$/.exec(line);
    if(!match)continue;
    if(Object.hasOwn(values,match[1]))throw Error('Duplicate bootstrap setting: '+match[1]);
    values[match[1]]=match[2].normalize('NFC').trim();
  }
  if(!/^[\w.-]{3,60}$/.test(values.Username||'') || (values.Password||'').length<16 || values.Password.length>256)throw Error('Set Username and a password of 16–256 characters in bootstrap.txt');
  for(const field of ['ARCAPTCHA_SITE_KEY','ARCAPTCHA_SECRET_KEY'])if((values[field]||'').length>512 || /[\u0000-\u001f\u007f]/u.test(values[field]||''))throw Error('Invalid bootstrap setting: '+field);
  return values;
}
