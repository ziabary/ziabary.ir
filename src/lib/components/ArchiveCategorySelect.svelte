<script lang="ts">
  import { tick } from 'svelte';

  export let label: string;
  export let value = '';
  export let options: { value: string; label: string }[];
  export let onchange: (value: string) => void;

  const id = 'archive-category';
  let root: HTMLDivElement;
  let trigger: HTMLButtonElement;
  let open = false;
  let active = 0;
  let typed = '';
  let typedAt = 0;
  $: selected = options.findIndex(option => option.value === value);
  $: selectedLabel = options[selected]?.label ?? label;

  async function reveal(index: number) {
    active = Math.max(0, Math.min(options.length - 1, index));
    await tick();
    root.querySelector<HTMLElement>(`[data-option-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }
  function toggle() {
    open = !open;
    typed = '';
    if (open) void reveal(Math.max(0, selected));
  }
  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    open = false;
    typed = '';
    trigger.focus({ preventScroll: true });
    if (option.value !== value) onchange(option.value);
  }
  function keydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (open) { event.preventDefault(); event.stopPropagation(); open = false; }
    } else if (event.key === 'Tab') {
      open = false;
    } else if (event.key === 'Enter' || (event.key === ' ' && !typed)) {
      event.preventDefault();
      if (open) choose(active); else toggle();
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      if (!open) { open = true; active = Math.max(0, selected); }
      else if (event.key === 'ArrowDown') active += 1;
      else if (event.key === 'ArrowUp') active -= 1;
      if (event.key === 'Home') active = 0;
      if (event.key === 'End') active = options.length - 1;
      void reveal(active);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      typed = (now - typedAt < 700 ? typed : '') + event.key;
      typedAt = now;
      const match = options.findIndex(option => option.label.toLocaleLowerCase().startsWith(typed.toLocaleLowerCase()));
      if (match >= 0) { open = true; void reveal(match); }
    }
  }
  function closeOutside(event: PointerEvent) {
    if (open && event.target instanceof Node && !root.contains(event.target)) open = false;
  }
</script>

<svelte:window onpointerdown={closeOutside} />
<div class="category-select" bind:this={root} onfocusout={event => {
  if (!(event.relatedTarget instanceof Node) || !root.contains(event.relatedTarget)) open = false;
}}>
  <span id={`${id}-label`}>{label}</span>
  <button class="category-trigger" bind:this={trigger} type="button" role="combobox"
    aria-labelledby={`${id}-label`} aria-expanded={open} aria-haspopup="listbox"
    aria-controls={`${id}-options`} aria-activedescendant={open ? `${id}-option-${active}` : undefined}
    onclick={toggle} onkeydown={keydown}>
    <span>{selectedLabel}</span>
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m5 7 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.7" /></svg>
  </button>
  {#if open}
    <div class="category-options" id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`}>
      {#each options as option, index (option.value)}
        <button type="button" role="option" id={`${id}-option-${index}`} data-option-index={index}
          class:active={active === index} aria-selected={value === option.value} tabindex="-1"
          onpointerdown={event => { if (event.pointerType === 'mouse') event.preventDefault(); }}
          onclick={() => choose(index)}>
          <span>{option.label}</span><span class="check" aria-hidden="true">{value === option.value ? '✓' : ''}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .category-select{position:relative;display:grid;gap:6px;flex:1;min-width:220px;font-size:12px;color:var(--muted)}
  .category-trigger{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:44px;padding:8px 12px;border:1px solid var(--line);border-radius:7px;background:var(--paper);color:var(--ink);font:inherit;text-align:start;cursor:pointer}
  .category-trigger svg{flex-shrink:0;transition:transform .15s}
  .category-trigger[aria-expanded=true]{border-color:var(--teal)}
  .category-trigger[aria-expanded=true] svg{transform:rotate(180deg)}
  .category-trigger:focus-visible{outline:2px solid var(--teal);outline-offset:3px}
  .category-options{position:absolute;inset-inline:0;top:calc(100% + 6px);z-index:20;max-height:min(320px,50vh);overflow-y:auto;overscroll-behavior:contain;padding:5px;border:1px solid var(--line);border-radius:9px;background:var(--paper);box-shadow:0 10px 28px #0003;scrollbar-width:thin;scrollbar-color:var(--teal) transparent}
  .category-options button{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:40px;padding:8px 10px;border:0;border-radius:5px;background:transparent;color:var(--ink);font:inherit;text-align:start;cursor:pointer}
  .category-options button:is(:hover,.active){background:var(--soft)}
  .category-options button[aria-selected=true]{color:var(--link-ink);font-weight:600}
  .check{flex:0 0 14px;text-align:center}
</style>
