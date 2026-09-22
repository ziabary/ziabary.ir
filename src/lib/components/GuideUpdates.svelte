<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { formatDate, publicationDay } from '$lib/publication.mjs';
  import { createUpdateHistory, guideUpdateHref, unreadGuideUpdates, observeUpdateRead, UPDATE_STORAGE_PREFIX, type GuideUpdate, type UpdateGuide, type UpdateLocale } from '$lib/guide-updates.mjs';

  export let guide: UpdateGuide;
  export let locale: UpdateLocale = 'fa';
  const labels = {
    fa:{title:'خبر تازه',close:'بستن اعلان‌ها',date:'تاریخ ثبت در جدول',open:'مشاهده در جدول',next:'خبر بعدی',remaining:'خبر دیگر',model:'مدل',software:'نرم‌افزار',gpu:'شتاب‌دهنده',server:'سرور'},
    en:{title:'New update',close:'Close notifications',date:'Date added to the table',open:'View in table',next:'Next update',remaining:'more updates',model:'Model',software:'Software',gpu:'Accelerator',server:'Server'},
    es:{title:'Nueva actualización',close:'Cerrar notificaciones',date:'Fecha de incorporación a la tabla',open:'Ver en la tabla',next:'Siguiente',remaining:'novedades más',model:'Modelo',software:'Software',gpu:'Acelerador',server:'Servidor'}
  };
  $: copy = labels[locale];
  $: numbers = new Intl.NumberFormat(locale);
  let items: GuideUpdate[] = [];
  let history: ReturnType<typeof createUpdateHistory> | undefined;
  let mounted = false;
  let toast: HTMLElement | undefined;
  $: if (mounted && history) items = unreadGuideUpdates(guide,publicationDay(),history.has);
  $: item = items[0];
  onMount(() => {
    history = createUpdateHistory(() => window.localStorage);
    mounted = true;
    const onStorage = (event: StorageEvent) => {
      if (event.key?.startsWith(UPDATE_STORAGE_PREFIX) && event.newValue === '1') {
        items = items.filter(item => UPDATE_STORAGE_PREFIX + item.id !== event.key);
      }
    };
    window.addEventListener('storage',onStorage);
    return () => window.removeEventListener('storage',onStorage);
  });
  async function next(id: string) {
    history?.mark(id);
    items = items.filter(item => item.id !== id);
    await tick();
    (toast?.querySelector<HTMLButtonElement>('.next-update') ?? toast?.querySelector<HTMLButtonElement>('.dismiss'))?.focus({preventScroll:true});
  }
  function close(id: string) {
    history?.mark(id);
    // Keep queued updates unread so they are available on the next visit.
    items = [];
  }
</script>

<div class="update-announcer" role="status" aria-live="polite" aria-atomic="true">{item ? `${copy.title}: ${item.copy[locale].title}` : ''}</div>
{#if item}
  {#key item.id}
    <aside class="guide-updates" bind:this={toast} data-update-id={item.id} dir={locale === 'fa' ? 'rtl' : 'ltr'} aria-labelledby={`update-${guide}`} use:observeUpdateRead={() => history?.mark(item.id)}>
      <header class="toast-header">
        <span class="notification-label">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4M12 2V1" /></svg>
          {copy.title}
        </span>
        <button class="dismiss" type="button" onclick={() => close(item.id)} aria-label={copy.close} title={copy.close}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </header>
      <p class="update-meta"><span>{copy[item.kind]}</span><span aria-hidden="true">·</span><time datetime={item.date} title={copy.date}>{formatDate(item.date,locale)}</time></p>
      <h2 id={`update-${guide}`}><a href={guideUpdateHref(item,locale)} onclick={() => close(item.id)}>{item.copy[locale].title}</a></h2>
      <p class="summary">{item.copy[locale].summary}</p>
      <footer class="toast-actions">
        <a class="update-link" href={guideUpdateHref(item,locale)} onclick={() => close(item.id)}>{copy.open}<span aria-hidden="true">{locale === 'fa' ? '←' : '→'}</span></a>
        {#if items.length > 1}
          <button class="next-update" type="button" onclick={() => next(item.id)} aria-label={`${copy.next} · ${numbers.format(items.length - 1)} ${copy.remaining}`}>{copy.next}<span class="remaining fa-num">{numbers.format(items.length - 1)}</span></button>
        {/if}
      </footer>
    </aside>
  {/key}
{/if}

<style>
  .update-announcer{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
  .guide-updates{--notice-bg:#fffbf2;--notice-ink:#26323b;--notice-muted:#62615c;--notice-accent:#83540b;--notice-line:#dab578;--notice-badge:#fae4b9;position:fixed;z-index:40;inset-inline-end:24px;bottom:calc(24px + env(safe-area-inset-bottom,0px));width:min(400px,calc(100vw - 48px));margin:0;padding:12px 20px 16px;border:1px solid var(--notice-line);border-top:3px solid #d59b37;border-radius:16px;background:var(--notice-bg);color:var(--notice-ink);box-shadow:0 16px 48px #07121540,0 3px 10px #0712151a;text-align:start;animation:notice-enter .28s ease-out both}
  :global(:root[data-theme="dark"]) .guide-updates{--notice-bg:#25303c;--notice-ink:#f9f6ef;--notice-muted:#c9cbd0;--notice-accent:#f5ce89;--notice-line:#a78246;--notice-badge:#473a28;box-shadow:0 18px 56px #0008,0 3px 12px #0005}
  .toast-header{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 5px}
  .notification-label{display:inline-flex;align-items:center;gap:7px;padding:4px 10px;border-radius:99px;background:var(--notice-badge);color:var(--notice-accent);font-size:12px;font-weight:700;line-height:1.7}
  .dismiss{display:grid;place-items:center;flex:0 0 44px;width:44px;height:44px;margin-inline-end:-10px;padding:0;border:0;border-radius:9px;color:var(--notice-muted);background:transparent;cursor:pointer}
  svg{display:block;flex-shrink:0;pointer-events:none}
  .dismiss:hover{background:var(--notice-badge);color:var(--notice-ink)}
  .update-meta{display:flex;flex-wrap:wrap;align-items:center;gap:7px;margin:0 0 4px;font-size:11px;line-height:1.7;color:var(--notice-muted)}
  h2{margin:0;font-size:16px;line-height:1.8;font-weight:700;overflow-wrap:anywhere}
  h2 a{color:inherit;text-decoration:none}
  h2 a:hover{color:var(--notice-accent)}
  .summary{margin:6px 0 14px;font-size:13px;line-height:1.8;color:var(--notice-muted)}
  .toast-actions{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding:12px 0 0;margin:0;border-top:1px solid color-mix(in srgb,var(--notice-line) 45%,transparent);background:transparent}
  .update-link,.next-update{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:40px;padding:6px 12px;border-radius:8px;font-size:12px;line-height:1.6;font-weight:650;text-decoration:none;cursor:pointer}
  .update-link{background:var(--notice-accent);color:var(--notice-bg);border:1px solid var(--notice-accent)}
  .update-link:hover{filter:brightness(1.12)}
  .next-update{background:transparent;color:var(--notice-ink);border:1px solid var(--notice-line)}
  .next-update:hover{background:var(--notice-badge)}
  .remaining{display:grid;place-items:center;min-width:20px;height:20px;padding-inline:4px;border-radius:50%;background:var(--notice-badge);color:var(--notice-accent);font-size:11px}
  a:focus-visible,button:focus-visible{outline:2px solid var(--notice-accent);outline-offset:3px}
  @keyframes notice-enter{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @media(max-width:600px){.guide-updates{inset-inline:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));width:auto;padding:10px 16px 14px}.update-link,.next-update{min-height:44px}.summary{margin-bottom:10px}}
  @media(prefers-reduced-motion:reduce){.guide-updates{animation:none}}
</style>
