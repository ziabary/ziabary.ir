import {HttpError} from './errors.mjs';

const pageSize=10;
const invalid=()=>{throw new HttpError(400,'invalid_input');};
function readCursor(value) {
  if(value==null||value==='')return null;
  if(value.length>100||!/^[A-Za-z0-9_-]+$/.test(value))invalid();
  let pair;try{pair=JSON.parse(Buffer.from(value,'base64url').toString('utf8'));}catch{invalid();}
  if(!Array.isArray(pair)||pair.length!==2||!pair.every(Number.isSafeInteger)||pair[0]<0||pair[1]<1)invalid();
  return pair;
}

/** Select complete threads by any member's status; paginate by latest activity. */
export function adminThreads(store,{status='pending',post='',cursor}) {
  if(!['all','pending','approved','rejected','spam','deleted'].includes(status))invalid();
  const after=readCursor(cursor);
  const roots=store.all(`WITH RECURSIVE tree(id,post,root,level) AS (
    SELECT id,post,id,0 FROM comments WHERE parent IS NULL AND (?='' OR post=?)
    UNION ALL SELECT c.id,c.post,t.root,t.level+1 FROM comments c JOIN tree t ON c.parent=t.id AND c.post=t.post WHERE t.level<4
  ), activity AS (
    SELECT t.root AS id,t.post,p.title,max(c.updated) AS updated,count(*) AS count
    FROM tree t JOIN comments c ON c.id=t.id JOIN posts p ON p.path=t.post
    GROUP BY t.root HAVING (?='all' OR max(c.status=?)=1)
  ) SELECT * FROM activity WHERE (? IS NULL OR updated<? OR (updated=? AND id<?))
    ORDER BY updated DESC,id DESC LIMIT ?`,post,post,status,status,after?.[0]??null,after?.[0]??0,after?.[0]??0,after?.[1]??0,pageSize+1);
  const selected=roots.slice(0,pageSize);
  if(!selected.length)return {threads:[],nextCursor:null};
  // Only selected roots bring comment bodies into memory. No private fields leave the store.
  const comments=store.all(`WITH RECURSIVE tree(id,post,root,level,position) AS (
    SELECT id,post,id,0,printf('%016d',id) FROM comments WHERE id IN (${selected.map(()=>'?').join(',')}) AND parent IS NULL
    UNION ALL SELECT c.id,c.post,t.root,t.level+1,t.position||'.'||printf('%016d',c.id)
      FROM comments c JOIN tree t ON c.parent=t.id AND c.post=t.post WHERE t.level<4
  ) SELECT t.root,c.id,c.parent,t.level AS depth,c.author,c.body,c.status,c.created,c.updated,c.is_admin,(c.ip IS NOT NULL) AS hasIp
    FROM tree t JOIN comments c ON c.id=t.id ORDER BY t.position`,...selected.map(root=>root.id));
  const threads=selected.map(root=>({...root,comments:[]})),byId=new Map(threads.map(thread=>[thread.id,thread]));
  for(const {root,...comment} of comments)byId.get(root).comments.push(comment);
  const last=selected.at(-1);
  return {threads,nextCursor:roots.length>pageSize?Buffer.from(JSON.stringify([last.updated,last.id])).toString('base64url'):null};
}
