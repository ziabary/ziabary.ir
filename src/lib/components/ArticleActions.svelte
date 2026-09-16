<script lang="ts">
  import registry from '$lib/generated/short-links.json';
  import { articleShareUrl, articleShareContent } from '$lib/article-sharing.mjs';
  import { prepareArticleShareImage } from '$lib/article-share-image';
  import { onDestroy, onMount } from 'svelte';
  export let href: string;
  export let title: string;
  export let cover: string | undefined = undefined;
  export let excerpt: string;
  export let compact = false;
  export let standaloneHref: string | undefined = undefined;
  export let locale: 'fa' | 'en' | 'es' = 'fa';

  const copies = {
    fa: { label: 'اشتراک‌گذاری نوشته', actions: 'گزینه‌های مقاله', open: 'بازکردن مقاله در تب جدید', share: 'اشتراک‌گذاری', copy: 'کپی لینک', copied: 'لینک کوتاه کپی شد', copyText: 'کپی متن و لینک', textCopied: 'متن و لینک کپی شدند', native: 'سایر برنامه‌ها', withImage: 'اشتراک با تصویر', preparingImage: 'آماده‌سازی تصویر…', downloadImage: 'دریافت تصویر', imageFailed: 'تصویر آماده نشد؛ متن و لینک همچنان قابل اشتراک‌اند.', email: 'ایمیل', preview: 'متن پیام', shortLink: 'لینک کوتاه', close: 'بستن', failed: 'کپی انجام نشد؛ متن زیر را انتخاب و کپی کنید.', shareFailed: 'اشتراک‌گذاری انجام نشد؛ یک مقصد دیگر انتخاب کنید.' },
    en: { label: 'Article sharing', actions: 'Article actions', open: 'Open article in a new tab', share: 'Share', copy: 'Copy link', copied: 'Short link copied', copyText: 'Copy text and link', textCopied: 'Text and link copied', native: 'Other apps', withImage: 'Share with image', preparingImage: 'Preparing image…', downloadImage: 'Download image', imageFailed: 'Image unavailable; you can still share the text and link.', email: 'Email', preview: 'Message text', shortLink: 'Short link', close: 'Close', failed: 'Could not copy. Select and copy the text below.', shareFailed: 'Could not share. Choose another destination.' },
    es: { label: 'Compartir artículo', actions: 'Opciones del artículo', open: 'Abrir el artículo en una pestaña nueva', share: 'Compartir', copy: 'Copiar enlace', copied: 'Enlace corto copiado', copyText: 'Copiar texto y enlace', textCopied: 'Texto y enlace copiados', native: 'Otras aplicaciones', withImage: 'Compartir con imagen', preparingImage: 'Preparando imagen…', downloadImage: 'Descargar imagen', imageFailed: 'Imagen no disponible; aún puedes compartir el texto y el enlace.', email: 'Correo', preview: 'Texto del mensaje', shortLink: 'Enlace corto', close: 'Cerrar', failed: 'No se pudo copiar. Selecciona y copia el texto de abajo.', shareFailed: 'No se pudo compartir. Elige otro destino.' }
  } as const;
  $: copy = copies[locale];
  $: url = articleShareUrl(standaloneHref ?? href, registry);
  $: content = articleShareContent({ title, excerpt, url });

  $: destinations = [
    ...(locale === 'fa' ? [
      { id: 'bale', name: 'بله', href: content.bale, icon: 'bale-white.svg' },
      { id: 'eitaa', name: 'ایتا', href: content.eitaa, icon: 'eitaa.svg' }
    ] : []),
    { id: 'telegram', name: locale === 'fa' ? 'تلگرام' : 'Telegram', href: content.telegram, icon: 'telegram-white.svg' },
    { id: 'whatsapp', name: locale === 'fa' ? 'واتس‌اپ' : 'WhatsApp', href: content.whatsapp, icon: 'whatsapp-white.svg' },
    { id: 'linkedin', name: locale === 'fa' ? 'لینکدین' : 'LinkedIn', href: content.linkedin, icon: 'linkedin-white.svg' },
    { id: 'x', name: 'X', href: content.x, icon: 'x-white.svg' }
  ];
  let previewOpen = false;
  let copied = false;
  let feedback = '';
  let dialog: HTMLDialogElement;
  let nativeAvailable = false;
  let shareFile: File | undefined;
  let shareFileUrl = '';
  let imageLoading = false;
  let imageShareable = false;
  let preparedCover = '';
  let destroyed = false;
  let imageRequest = 0;
  let resetTimer: ReturnType<typeof setTimeout>;
  onMount(() => { nativeAvailable = typeof navigator.share === 'function'; });
  onDestroy(() => {
    destroyed = true;
    clearTimeout(resetTimer);
    if (shareFileUrl) URL.revokeObjectURL(shareFileUrl);
  });

  async function prepareImage() {
    if (!cover) {
      imageRequest += 1;
      preparedCover = '';
      shareFile = undefined;
      imageShareable = false;
      imageLoading = false;
      if (shareFileUrl) URL.revokeObjectURL(shareFileUrl);
      shareFileUrl = '';
      return;
    }
    if (preparedCover === cover && (shareFile || imageLoading)) return;
    const requestedCover = cover;
    const request = ++imageRequest;
    preparedCover = requestedCover;
    imageLoading = true;
    shareFile = undefined;
    imageShareable = false;
    if (shareFileUrl) URL.revokeObjectURL(shareFileUrl);
    shareFileUrl = '';
    try {
      const file = await prepareArticleShareImage(requestedCover);
      if (destroyed || request !== imageRequest || cover !== requestedCover) return;
      shareFile = file;
      shareFileUrl = URL.createObjectURL(file);
      imageShareable = nativeAvailable && typeof navigator.canShare === 'function'
        && navigator.canShare({ files: [file] });
    } catch {
      if (!destroyed && request === imageRequest) feedback = copy.imageFailed;
    } finally {
      if (!destroyed && request === imageRequest) imageLoading = false;
    }
  }

  async function writeClipboard(value: string, html?: string) {
    if (html && typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      try {
        await navigator.clipboard.write([new ClipboardItem({
          'text/plain': new Blob([value], { type: 'text/plain' }),
          'text/html': new Blob([html], { type: 'text/html' })
        })]);
        return;
      } catch { /* Fall back to plain text when rich clipboard access is denied. */ }
    }
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement('textarea');
      input.value = value;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      // A modal dialog makes the rest of the document inert.
      (dialog.open ? dialog : document.body).appendChild(input);
      try {
        input.select();
        if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
      } finally { input.remove(); }
    }
  }
  async function copyValue(fullText = false) {
    clearTimeout(resetTimer);
    try {
      await writeClipboard(fullText ? content.fullText : url, fullText ? content.html : undefined);
      copied = !fullText;
      feedback = fullText ? copy.textCopied : copy.copied;
      resetTimer = setTimeout(() => { copied = false; feedback = ''; }, 2200);
    } catch {
      copied = false;
      feedback = copy.failed;
      previewOpen = true;
      if (!dialog.open) dialog.showModal();
    }
  }
  function openSharing() {
    feedback = '';
    previewOpen = false;
    dialog.showModal();
    void prepareImage();
  }
  async function shareNative() {
    try {
      // The file is ready before the click; awaiting image preparation here
      // would lose the user activation required by the native share sheet.
      await navigator.share(imageShareable && shareFile
        ? { title: content.title, text: content.fullText, files: [shareFile] }
        : content.native);
      dialog.close();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      feedback = copy.shareFailed;
    }
  }
</script>

<div class="article-actions" data-short-url={url} class:compact aria-label={standaloneHref ? copy.actions : copy.label}>
  <button type="button" onclick={openSharing} aria-haspopup="dialog" aria-label={copy.share} title={copy.share}><i class="fa-solid fa-share-nodes" aria-hidden="true"></i><span>{copy.share}</span></button>
  <button type="button" class:copied onclick={() => copyValue()} aria-label={copied ? copy.copied : copy.copy} title={copied ? copy.copied : copy.copy}><i class={copied ? 'fa-solid fa-check' : 'fa-solid fa-link'} aria-hidden="true"></i><span>{copied ? copy.copied : copy.copy}</span></button>
  {#if standaloneHref}
    <a class="article-open" href={standaloneHref} target="_blank" rel="noopener noreferrer" aria-label={copy.open} title={copy.open}>
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3h7v7M21 3 11 13M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></svg>
      <span>{copy.open}</span>
    </a>
  {/if}
  {#if feedback && !dialog?.open}<small class="copy-feedback" role="status">{feedback}</small>{/if}
</div>

<dialog class="share-dialog" data-no-lightbox bind:this={dialog} aria-label={copy.label} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <header><strong>{copy.share}</strong><form method="dialog"><button class="share-close" aria-label={copy.close} title={copy.close}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></form></header>
  <div class="share-article-preview">
    {#if cover}<img class="share-cover" loading="lazy" src={cover} alt="" width="72" height="48" />{/if}
    <p class="share-title">{content.title}</p>
  </div>
  <div class="share-destinations" role="group" aria-label={copy.share}>
    {#each destinations as destination}
      <a class="share-service" href={destination.href} target="_blank" rel="noopener noreferrer" data-share-destination={destination.id} aria-label={destination.name} title={destination.name}>
        <img src={'/images/social/' + destination.icon} width="28" height="28" alt="" />
        <span class="share-tooltip" aria-hidden="true">{destination.name}</span>
      </a>
    {/each}
    <a class="share-service" href={content.email} data-share-destination="email" aria-label={copy.email} title={copy.email}>
      <svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>
      <span class="share-tooltip" aria-hidden="true">{copy.email}</span>
    </a>
  </div>
  <div class="share-link-row">
    <input class="share-short-url" readonly value={url} dir="ltr" aria-label={copy.shortLink} onclick={(event) => event.currentTarget.select()} />
    <button class="share-link-copy" type="button" onclick={() => copyValue()} aria-label={copied ? copy.copied : copy.copy} title={copied ? copy.copied : copy.copy}>
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        {#if copied}<path d="m5 12 4 4L19 6"/>{:else}<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>{/if}
      </svg>
    </button>
  </div>
  <div class="share-utilities">
    <button type="button" onclick={() => copyValue(true)} data-share-destination="copy">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>{copy.copyText}
    </button>
    {#if nativeAvailable}<button type="button" onclick={shareNative} data-share-destination="native" disabled={imageLoading}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>{imageLoading ? copy.preparingImage : imageShareable ? copy.withImage : copy.native}
    </button>{/if}
    {#if cover}
      {#if imageLoading && !nativeAvailable}<span class="share-image-loading" role="status">{copy.preparingImage}</span>
      {:else if !imageLoading}
        <a class="share-image-download" href={shareFileUrl || cover} download={shareFile?.name ?? ''} data-share-destination="image-download">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4"/></svg>{copy.downloadImage}
        </a>
      {/if}
    {/if}
  </div>
  <details class="share-message" bind:open={previewOpen}>
    <summary>{copy.preview}<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></summary>
    <textarea class="share-preview" readonly value={content.fullText} aria-label={copy.copyText} rows="4"></textarea>
  </details>
  <p class="share-status" role="status">{feedback}</p>
</dialog>

<style>
  .article-actions{position:relative}
  .compact button,.compact .article-open{width:40px;height:40px;justify-content:center;padding:0;font-size:15px}
  .compact button span,.compact .article-open span{display:none}
  .article-open svg{display:block;flex-shrink:0}
  .copy-feedback{position:absolute;left:0;bottom:calc(100% + 12px);padding:8px 12px;background:var(--paper);border:1px solid var(--line);border-radius:7px;color:var(--ink);font-size:11px;line-height:1.6;white-space:nowrap}
  .share-dialog{box-sizing:border-box;width:min(430px,calc(100vw - 24px));max-height:calc(100dvh - 24px);overflow:auto;padding:24px;margin:auto;border:1px solid var(--line);border-radius:20px;background:var(--paper);color:var(--ink);box-shadow:0 16px 64px #0005;font-size:14px;line-height:1.8;scrollbar-width:thin;scrollbar-color:var(--line) transparent}
  .share-dialog::backdrop{background:#0008;backdrop-filter:blur(4px)}
  .share-dialog header{display:flex;align-items:center;justify-content:space-between;gap:16px}
  .share-dialog form{margin:0}
  .share-close{display:flex;align-items:center;justify-content:center;width:36px;height:36px;padding:6px;border:0;border-radius:50%;background:var(--soft);color:var(--ink);cursor:pointer}
  .share-article-preview{display:flex;align-items:center;gap:12px;margin:14px 0 22px}
  .share-dialog .share-cover{margin:0;display:block;flex:0 0 72px;width:72px;height:48px;object-fit:cover;border-radius:7px}
  .share-title{display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:13px;line-height:1.9;margin:0;color:var(--muted)}
  .share-destinations{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;margin:0 0 24px}
  .share-destinations .share-service{position:relative;display:flex;align-items:center;justify-content:center;flex:0 0 48px;width:48px;height:48px;padding:0;border:0;border-radius:50%;background:var(--soft);color:var(--ink);text-decoration:none;transition:transform .15s,box-shadow .15s}
  .share-service img,.share-service svg{display:block;flex-shrink:0;object-fit:contain;pointer-events:none;cursor:inherit}
  .share-service[data-share-destination=bale]{background:#008675}
  .share-service[data-share-destination=bale] img{width:32px;height:32px}
  .share-service[data-share-destination=eitaa]{background:#ef7f1a}
  .share-service[data-share-destination=eitaa] img{width:32px;height:32px;border-radius:9px}
  .share-service[data-share-destination=telegram]{background:#1688ba}
  .share-service[data-share-destination=whatsapp]{background:#128c5d}
  .share-service[data-share-destination=linkedin]{background:#0a66c2}
  .share-dialog[dir=rtl] .share-destinations{max-width:240px;margin-inline:auto}
  .share-service[data-share-destination=x]{background:#151a20}
  .share-service[data-share-destination=x] img{width:31px;height:31px}
  .share-service[data-share-destination=email]{box-shadow:inset 0 0 0 1px var(--line)}
  .share-destinations .share-service:hover{transform:translateY(-2px);box-shadow:0 5px 14px #0002}
  .share-tooltip{position:absolute;top:calc(100% + 5px);inset-inline-start:50%;transform:translateX(50%);padding:2px 7px;border-radius:5px;background:var(--ink);color:var(--paper);font-size:10px;line-height:1.5;white-space:nowrap;pointer-events:none;opacity:0;z-index:1}
  .share-dialog[dir=ltr] .share-tooltip{transform:translateX(-50%)}
  .share-service:is(:hover,:focus-visible) .share-tooltip{opacity:1}
  .share-dialog :is(a,button,input,textarea,summary):focus-visible{outline:2px solid var(--teal);outline-offset:3px}
  .share-link-row{display:flex;align-items:center;gap:8px;padding:5px 6px 5px 12px;border:1px solid var(--line);border-radius:10px;background:var(--soft);direction:ltr}
  .share-short-url{flex:1;min-width:0;width:100%;margin:0;padding:0;border:0;border-radius:0;background:transparent;color:var(--ink);font:inherit;font-size:13px;text-align:left;text-overflow:ellipsis}
  .share-link-copy{flex-shrink:0;display:grid;place-items:center;width:36px;height:36px;padding:0;border:0;border-radius:7px;background:var(--paper);color:var(--link-ink);cursor:pointer}
  .share-utilities{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px 12px;margin:8px 0 10px}
  .share-utilities button,.share-image-download{display:flex;align-items:center;justify-content:center;gap:6px;min-height:40px;padding:4px 0;border:0;background:none;color:var(--link-ink);font:inherit;font-size:12px;text-decoration:none;cursor:pointer}
  .share-utilities button:disabled{opacity:.6;cursor:wait}
  .share-image-loading{font-size:12px;color:var(--muted)}
  .share-utilities svg{flex-shrink:0}
  .share-message{border-top:1px solid var(--line);padding-top:10px}
  .share-message summary{display:flex;align-items:center;justify-content:space-between;min-height:32px;list-style:none;color:var(--muted);font-size:12px;cursor:pointer}
  .share-message summary::-webkit-details-marker{display:none}
  .share-message[open] summary svg{transform:rotate(180deg)}
  .share-preview{box-sizing:border-box;display:block;width:100%;margin:8px 0 0;padding:10px;border:1px solid var(--line);border-radius:8px;background:var(--soft);color:var(--muted);font:inherit;font-size:12px;line-height:1.9;resize:vertical;unicode-bidi:plaintext;scrollbar-width:thin;scrollbar-color:var(--teal) transparent}
  .share-status{margin:8px 0 0;font-size:12px;color:var(--link-ink)}
  .share-status:empty{display:none}
  @media(max-width:420px){.share-dialog{padding:20px}.share-destinations{gap:8px}.share-destinations .share-service{flex-basis:44px;width:44px;height:44px}}
  @media(prefers-reduced-motion:reduce){.share-destinations .share-service{transition:none}}
</style>
