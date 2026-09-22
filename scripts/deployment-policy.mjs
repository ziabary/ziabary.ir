export function isVersionFile(key) {
  return /^_app\/version\.json(?:\.(?:br|gz))?$/.test(key);
}

export function deploymentPhases(files) {
  const assets = [];
  const pages = [];
  const version = [];
  for (const file of files) {
    if (isVersionFile(file.key)) version.push(file);
    else if (/\.(?:html|json|xml|txt)(?:\.(?:br|gz))?$/.test(file.key) && !file.key.startsWith('_app/immutable/')) pages.push(file);
    else assets.push(file);
  }
  // Finish every dependency before publishing pages, then announce the version.
  return [assets, pages, version];
}

export function staleDeploymentKeys(remoteKeys, localKeys) {
  // Open tabs still import modules using their original build's manifest.
  // Hashed JS/CSS must remain available after that build's HTML is replaced.
  return [...remoteKeys].filter(key => !localKeys.has(key) && !key.startsWith('_app/immutable/'));
}

export function cacheControl(key) {
  if (key.startsWith('_app/immutable/')) return 'public,max-age=31536000,immutable';
  if (isVersionFile(key)) return 'no-store';
  if (/\.(?:html|json)(?:\.(?:br|gz))?$/.test(key)) return 'public,max-age=0,must-revalidate';
  return 'public,max-age=3600';
}

export function unchangedObject(remote, checksum, size, key) {
  return remote?.Metadata?.sha256 === checksum && remote.ContentLength === size && remote.CacheControl === cacheControl(key);
}

export async function publishPhases(files, publish) {
  for (const phase of deploymentPhases(files)) await publish(phase);
}
