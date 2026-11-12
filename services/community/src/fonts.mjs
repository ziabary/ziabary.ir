const names=new Set(['IRANSansX-Regular.woff2','IRANSansX-Bold.woff2']);

/** Read the site's existing fonts; no font assets or filesystem cache in this service. */
export function createSiteFonts(siteOrigin,fetchFont=fetch) {
  const cache=new Map();
  return async name=>{
    if(!names.has(name))return null;
    if(!cache.has(name))cache.set(name,(async()=>{
      const response=await fetchFont(new URL('/fonts/IranSansX/fonts/woff2/'+name,siteOrigin),{redirect:'error',signal:AbortSignal.timeout(5000)});
      if(!response.ok)throw Error('font_unavailable');
      const chunks=[];let size=0;
      for await(const chunk of response.body){size+=chunk.length;if(size>256*1024)throw Error('font_too_large');chunks.push(chunk);}
      const bytes=Buffer.concat(chunks);
      if(bytes.subarray(0,4).toString()!=='wOF2')throw Error('invalid_font');
      return bytes;
    })().catch(error=>{cache.delete(name);throw error;}));
    return cache.get(name);
  };
}
