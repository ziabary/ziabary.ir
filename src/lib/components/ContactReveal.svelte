<script lang="ts">
  import copy from '../../../data/llm/wizard-copy.json';
  import { trackContact, type ContactPlacement } from '$lib/contact-analytics';
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  export let placement: ContactPlacement;
  $: c = copy[locale];
  let email = '', status = '';
  let input: HTMLInputElement;
  function reveal(event: MouseEvent) {
    if (!event.isTrusted || email) return;
    email = new TextDecoder().decode(Uint8Array.from([115,97,108,101,115,64,116,97,114,103,111,109,97,110,46,99,111,109]));
    trackContact(event, 'contact_reveal', placement, locale);
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); status = c.emailCopied; }
    catch { input.focus(); input.select(); status = c.manualCopy; }
  }
</script>
<aside class="contact-reveal" class:wizard-contact={placement === 'wizard'} data-contact-placement={placement}>
  <p>{placement === 'wizard' ? c.cta : locale === 'fa' ? 'اگر برای انتخاب مدل و زیرساخت متناسب با شرایط سازمان خود به مشورت نیاز دارید، می‌توانید با ترگمان در تماس باشید.' : locale === 'en' ? 'If you would like advice on choosing models and infrastructure for your organization, you can contact Targoman.' : 'Si necesita asesoramiento para elegir modelos e infraestructura para su organización, puede contactar con Targoman.'}</p>
  {#if !email}<button type="button" onclick={reveal}>{c.revealContact}</button>
  {:else}<div class="contact-actions"><input class="fa-num" readonly dir="ltr" bind:this={input} value={email} aria-label={c.revealContact} /><button type="button" onclick={copyEmail}>{c.copyEmail}</button><a href={'mailto:' + email} onclick={event => trackContact(event, 'contact_email_click', placement, locale)}>{c.composeEmail}</a></div>{/if}
  <span role="status">{status}</span>
</aside>
<style>
  .contact-reveal{border-top:1px solid var(--line);padding-block:20px;margin-block:28px;color:var(--ink);font-size:15px;line-height:1.9}.contact-reveal p{margin:0 0 12px;max-width:85ch}.wizard-contact{border:1px solid var(--teal);border-radius:9px;padding:20px;margin:22px 0 0}.contact-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.contact-actions a{display:inline-flex;align-items:center;min-height:44px;color:var(--link-ink)}button,input{font:inherit;box-sizing:border-box;min-height:44px;padding:8px 12px;border:1px solid var(--line);border-radius:7px;background:var(--paper);color:var(--ink);max-width:100%}button{cursor:pointer;color:var(--link-ink)}button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid var(--teal);outline-offset:3px}[role=status]{font-size:13px}
</style>
