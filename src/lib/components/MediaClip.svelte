<script lang="ts">
  import { tick } from 'svelte';
  import { imageAttributes } from '$lib/images';

  export let src: string;
  export let poster: string | undefined = undefined;
  export let title: string;
  export let duration: string | undefined = undefined;

  let started = false;
  let failed = false;
  let player: HTMLVideoElement | undefined;

  async function start() {
    started = true;
    await tick();
    player?.focus();
    try {
      await player?.play();
    } catch {
      // Native controls remain available if the browser defers playback.
    }
  }
</script>

<div class="media-clip">
  {#if started}
    <!-- No caption file was supplied with this broadcast excerpt. -->
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
      bind:this={player}
      {src}
      {poster}
      controls
      playsinline
      preload="metadata"
      tabindex="0"
      aria-label={`کلیپ ${title}`}
      onerror={() => (failed = true)}
    >
      مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند. از پیوند منبع اصلی استفاده کنید.
    </video>
  {:else}
    <button type="button" class="clip-play" onclick={start} aria-label={`پخش کلیپ: ${title}`}>
      {#if poster}
        <img {...imageAttributes(poster, '(min-width: 1200px) 400px, calc(100vw - 32px)')} alt="" loading="lazy" />
      {/if}
      <span class="play-icon"><i class="fa-solid fa-play" aria-hidden="true"></i></span>
      <span class="clip-label">پخش کلیپ{#if duration} · {duration}{/if}</span>
    </button>
  {/if}
  {#if failed}
    <p class="clip-error" role="status">پخش کلیپ ممکن نشد. می‌توانید برنامه را از پیوند منبع اصلی در پایین ببینید.</p>
  {/if}
</div>

<style>
  .media-clip { flex-shrink: 0; background: #000; }
  video, .clip-play { display: block; width: 100%; aspect-ratio: 16 / 9; background: #000; }
  video { object-fit: contain; }
  .clip-play { position: relative; overflow: hidden; padding: 0; border: 0; border-radius: 0; color: #fff; cursor: pointer; }
  .clip-play img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: contain; }
  .play-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 64px; height: 64px; display: grid; place-items: center; border: 2px solid #fff; border-radius: 50%; background: rgb(7 28 33 / 85%); font-size: 24px; }
  .clip-label { position: absolute; inset-inline-start: 12px; bottom: 12px; padding: 5px 10px; border-radius: 6px; background: rgb(7 28 33 / 90%); font-size: 11px; }
  .clip-play:hover .play-icon { background: var(--teal); }
  .clip-play:focus-visible, video:focus-visible { outline: 3px solid var(--teal); outline-offset: -3px; }
  .clip-error { margin: 0; padding: 12px; color: #fff; font-size: 12px; line-height: 1.9; }
</style>
