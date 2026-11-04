import {readFile,writeFile,mkdir} from 'node:fs/promises';import {resolve,dirname,sep} from 'node:path';
const root=resolve(process.argv[2]||'../../build'),output=resolve(process.argv[3]||'config/posts.json');
const sitemap=await readFile(resolve(root,'sitemap.xml'),'utf8');const posts=[];
const decode=s=>s.replace(/&#x([a-f0-9]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
for(const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)){
 const url=new URL(decode(match[1])),path=url.pathname;
 if(!/^\/(?:[a-z0-9_-]+\/)*$/.test(path)||path.includes('/kazan-investment-reality/'))continue;
 const file=resolve(root,'.'+path,'index.html');if(!file.startsWith(root+sep))throw Error('Unsafe sitemap path');
 const html=await readFile(file,'utf8');if(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html))continue;
 const title=decode(/<title>([^]*?)<\/title>/i.exec(html)?.[1]||path);
 posts.push({path,title,locale:path.startsWith('/en/')?'en':path.startsWith('/es/')?'es':'fa',commentable:/^\/(?:en\/|es\/)?articles\/[^/]+\/$/.test(path)});
}
if(!posts.length||new Set(posts.map(p=>p.path)).size!==posts.length)throw Error('Invalid published catalogue');
await mkdir(dirname(output),{recursive:true});await writeFile(output,JSON.stringify(posts,null,2)+'\n');console.log(`Exported ${posts.length} published pages (${posts.filter(p=>p.commentable).length} articles) to ${output}`);
