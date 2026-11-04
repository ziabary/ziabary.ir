import {DatabaseSync,backup} from 'node:sqlite';import {access,mkdir,chmod} from 'node:fs/promises';import {dirname,resolve} from 'node:path';
const source=resolve(process.argv[2]||'data/community.sqlite'),target=process.argv[3];if(!target)throw Error('Usage: node tools/backup.mjs DATABASE OUTPUT.sqlite');
try{await access(target);throw Error('Backup destination already exists');}catch(e){if(e.code!=='ENOENT')throw e;}
await mkdir(dirname(resolve(target)),{recursive:true,mode:0o700});const db=new DatabaseSync(source,{readOnly:true});try{await backup(db,target);await chmod(target,0o600);}finally{db.close();}console.log('Consistent SQLite backup completed. Keep the encryption/identity keys in a separate secure backup.');
