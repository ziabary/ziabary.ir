import { DatabaseSync } from 'node:sqlite';
import { chmodSync } from 'node:fs';

export function openStore(path, posts, maxDatabaseMiB = 512) {
  const db = new DatabaseSync(path, { enableForeignKeyConstraints: true, allowExtension: false });
  if (path !== ':memory:') chmodSync(path, 0o600);
  const maximumPages=Math.floor(maxDatabaseMiB*1024*1024/db.prepare('PRAGMA page_size').get().page_size);
  if(db.prepare('PRAGMA page_count').get().page_count>maximumPages){db.close();throw Error('Existing database exceeds MAX_DATABASE_MIB; increase its configured quota.');}
  db.exec('PRAGMA max_page_count='+maximumPages);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS posts(path TEXT PRIMARY KEY,title TEXT NOT NULL,locale TEXT NOT NULL,commentable INTEGER NOT NULL DEFAULT 1,enabled INTEGER NOT NULL DEFAULT 1,views INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS visitors(id TEXT PRIMARY KEY,first_seen INTEGER NOT NULL,last_seen INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS post_visitors(post TEXT REFERENCES posts(path),visitor TEXT REFERENCES visitors(id),PRIMARY KEY(post,visitor));
    CREATE TABLE IF NOT EXISTS visits(id INTEGER PRIMARY KEY,post TEXT NOT NULL REFERENCES posts(path),visitor TEXT NOT NULL,ip_hash TEXT NOT NULL,ip TEXT NOT NULL,created INTEGER NOT NULL,day TEXT NOT NULL,browser TEXT NOT NULL,os TEXT NOT NULL,language TEXT NOT NULL,timezone TEXT NOT NULL,screen TEXT NOT NULL,referrer TEXT NOT NULL,window INTEGER NOT NULL,UNIQUE(post,visitor,window));
    CREATE INDEX IF NOT EXISTS visits_post_date ON visits(post,created); CREATE INDEX IF NOT EXISTS visits_date ON visits(created);
    CREATE TABLE IF NOT EXISTS daily(post TEXT REFERENCES posts(path),day TEXT,views INTEGER NOT NULL,PRIMARY KEY(post,day));
    CREATE TABLE IF NOT EXISTS comments(id INTEGER PRIMARY KEY AUTOINCREMENT,post TEXT NOT NULL REFERENCES posts(path),parent INTEGER REFERENCES comments(id),depth INTEGER NOT NULL,author TEXT NOT NULL,body TEXT NOT NULL,status TEXT NOT NULL CHECK(status IN ('pending','approved','rejected','spam','deleted')),created INTEGER NOT NULL,updated INTEGER NOT NULL,ip_hash TEXT NOT NULL,ip TEXT,request_key TEXT UNIQUE NOT NULL,payload_hash TEXT NOT NULL,is_admin INTEGER NOT NULL DEFAULT 0);
    CREATE INDEX IF NOT EXISTS comments_post_status ON comments(post,status,id); CREATE INDEX IF NOT EXISTS comments_status ON comments(status,id);
    CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY,csrf TEXT NOT NULL,created INTEGER NOT NULL,touched INTEGER NOT NULL,ua TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS metadata(key TEXT PRIMARY KEY,value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS limits(key TEXT PRIMARY KEY,count INTEGER NOT NULL,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS spent_tokens(id TEXT PRIMARY KEY,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS blocks(ip_hash TEXT PRIMARY KEY,reason TEXT NOT NULL,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY,created INTEGER NOT NULL,action TEXT NOT NULL,target TEXT NOT NULL,detail TEXT NOT NULL,actor TEXT NOT NULL);
    PRAGMA user_version=1;`);
  const run = (sql,...args) => db.prepare(sql).run(...args), get = (sql,...args) => db.prepare(sql).get(...args), all = (sql,...args) => db.prepare(sql).all(...args);
  const transaction = fn => { db.exec('BEGIN IMMEDIATE'); try { const result = fn(); db.exec('COMMIT'); return result; } catch (e) { db.exec('ROLLBACK'); throw e; } };
  transaction(()=>{ run('UPDATE posts SET enabled=0'); for(const p of posts)run('INSERT INTO posts(path,title,locale,commentable) VALUES(?,?,?,?) ON CONFLICT(path) DO UPDATE SET title=excluded.title,locale=excluded.locale,commentable=excluded.commentable,enabled=1',p.path,p.title,p.locale,Number(p.commentable)); });
  const limit = (key,max,period,now) => {
    const bucket = `${key}:${Math.floor(now/period)}`;
    const value = get('INSERT INTO limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count',bucket,now+period*2).count;
    return value <= max;
  };
  const audit = (now,action,target,detail,actor) => run('INSERT INTO audit(created,action,target,detail,actor) VALUES(?,?,?,?,?)',now,action,String(target),JSON.stringify(detail),actor);
  const prune = (now,days) => transaction(()=>{
    run('DELETE FROM visits WHERE created<?',now-days*86400000); run('DELETE FROM sessions WHERE touched<? OR created<?',now-1800000,now-28800000);
    run('DELETE FROM limits WHERE expires<?',now);run('DELETE FROM spent_tokens WHERE expires<?',now);run('DELETE FROM blocks WHERE expires<?',now);
    run('UPDATE comments SET ip=NULL WHERE created<?',now-days*86400000);run('DELETE FROM audit WHERE created<?',now-365*86400000);
  });
  return {db,run,get,all,transaction,limit,audit,prune,close:()=>db.close()};
}
