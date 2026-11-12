import {readFile,stat} from 'node:fs/promises';
import {openStore} from '../src/store.mjs';
import {parseViewReport,existingViewImport,existingVisitorReport,verifyViewReport,applyViewReport} from '../src/historical-views.mjs';

const args=process.argv.slice(2),file=args.shift();let multiplier,apply=false;
while(args.length) {
  const arg=args.shift();
  if(arg==='--multiplier')multiplier=Number(args.shift());
  else if(arg==='--apply')apply=true;
  else throw Error(`Unknown argument: ${arg}`);
}
if(!file||!multiplier)throw Error('Usage: node tools/import-views.mjs FILE.csv|- --multiplier 3 [--apply]');
const database=process.env.DATABASE_FILE||'data/community.sqlite';
await stat(database); // Never silently import into a new, incorrectly addressed database.
let csv;
if(file==='-') {
  const chunks=[];let size=0;
  for await(const chunk of process.stdin) {
    size+=chunk.length;if(size>5*1024*1024)throw Error('CSV exceeds 5 MiB.');
    chunks.push(chunk);
  }
  csv=Buffer.concat(chunks).toString('utf8');
} else {
  if((await stat(file)).size>5*1024*1024)throw Error('CSV exceeds 5 MiB.');
  csv=await readFile(file,'utf8');
}
const report=parseViewReport(csv,multiplier);
const store=openStore(database,Number(process.env.MAX_DATABASE_MIB||512));
try {
  const existing=existingViewImport(store,report);
  if(existing?.visitorsImported)console.log(JSON.stringify({applied:false,alreadyImported:true,period:[report.start,report.end],posts:existing.posts,views:existing.views,visitorEstimates:existing.visitorEstimates},null,2));
  else {
    let verified;
    if(existing)verified=existingVisitorReport(store,report);
    else {
    const siteOrigin=process.env.SITE_URL||process.env.SITE_ORIGINS?.split(',')[0];
    if(!siteOrigin)throw Error('Set SITE_URL to the running public website.');
    const url=new URL(siteOrigin);
    if(!['https:','http:'].includes(url.protocol)||url.origin!==siteOrigin)throw Error('SITE_URL must be an HTTP(S) origin without a trailing slash.');
    verified=await verifyViewReport(report,{siteOrigin,onRetry:({path,attempt,maxAttempts})=>console.error(`Retrying ${path} (${attempt}/${maxAttempts})`)});
    }
    const result=apply?applyViewReport(store,verified):{applied:false,viewsAlreadyImported:Boolean(existing),posts:verified.entries.length,views:verified.views,visitorEstimates:verified.visitorEstimates};
    console.log(JSON.stringify({...result,period:[report.start,report.end],multiplier,ignoredRows:report.ignored,skipped:verified.skipped,...(!apply?{preview:verified.entries.map(({path,views,visitors})=>({path,views,visitors}))}:{})},null,2));
  }
} finally {store.close();}
