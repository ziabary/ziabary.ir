<script lang="ts">
  export let title: string;
  export let locale: 'fa' | 'en' | 'es' = 'fa';

  const copies = {
    fa: { label: 'اشتراک‌گذاری نوشته', share: 'اشتراک‌گذاری', copy: 'کپی لینک', copied: 'لینک کپی شد' },
    en: { label: 'Article sharing', share: 'Share', copy: 'Copy link', copied: 'Link copied' },
    es: { label: 'Compartir artículo', share: 'Compartir', copy: 'Copiar enlace', copied: 'Enlace copiado' }
  } as const;
  $: copy = copies[locale];

  let copied = false;
  let resetTimer: ReturnType<typeof setTimeout>;

  async function copyLink() {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement('textarea');
      input.value = url;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }

    copied = true;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => (copied = false), 2200);
  }

  async function shareArticle() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    await copyLink();
  }
</script>

<div class="article-actions" aria-label={copy.label}>
  <button type="button" onclick={shareArticle}><i class="fa-solid fa-share-nodes" aria-hidden="true"></i><span>{copy.share}</span></button>
  <button type="button" class:copied onclick={copyLink}><i class={copied ? 'fa-solid fa-check' : 'fa-solid fa-link'} aria-hidden="true"></i><span>{copied ? copy.copied : copy.copy}</span></button>
</div>
