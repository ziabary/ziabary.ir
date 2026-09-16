<script lang="ts">
  import type { Snippet } from 'svelte';
  import { imageAttributes } from '$lib/images';
  export let title: string;
  export let lead: string;
  export let eyebrow: string;
  export let image: string;
  export let imageAlt: string;
  export let introId: string | undefined = undefined;
  export let children: Snippet;
</script>

<section class="guide-opening" aria-labelledby="guide-title">
  <div class="opening-copy">
    <header>
      <p class="opening-eyebrow"><bdi>{eyebrow}</bdi></p>
      <h1 id="guide-title">{title}</h1>
      <p class="opening-lead">{lead}</p>
    </header>
    <div class="opening-intro" id={introId}>{@render children()}</div>
  </div>
  <img class="opening-image" {...imageAttributes(image, '(min-width: 1328px) 496px, (min-width: 960px) 40vw, (min-width: 512px) 480px, calc(100vw - 32px)')} alt={imageAlt} width="1600" height="900" fetchpriority="high" />
</section>

<style>
  .guide-opening{display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);gap:40px;align-items:start;width:min(1280px,calc(100% - 48px));margin-inline:auto;padding-top:40px}
  .opening-copy{min-width:0}
  .opening-eyebrow{margin:0 0 12px;color:var(--link-ink);font-size:13px;line-height:1.6}
  h1{margin:0;font-size:38px;line-height:1.5;letter-spacing:normal;text-wrap:pretty}
  .opening-lead{margin:16px 0 24px;font-size:16px;line-height:1.9;color:color-mix(in srgb,var(--ink) 80%,var(--muted))}
  .opening-intro{scroll-margin-top:110px;font-size:17px;line-height:1.9;color:color-mix(in srgb,var(--ink) 94%,var(--muted))}
  .opening-intro :global(p){margin:0 0 18px;font-size:inherit;line-height:inherit}
  .opening-intro :global(p:last-child){margin-bottom:0}
  .opening-image{display:block;width:100%;height:auto;border-radius:12px}
  @media(max-width:959px){
    .guide-opening{grid-template-columns:minmax(0,1fr);gap:24px;width:calc(100% - 32px);padding-top:28px}
    .opening-image{max-width:480px;justify-self:center}
    h1{font-size:32px}
  }
  @media(max-width:600px){h1{font-size:29px}.opening-intro{font-size:16px}.opening-lead{font-size:15px;margin-block:14px 20px}}
</style>
