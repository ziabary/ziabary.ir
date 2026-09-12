export type Heading = { id: string; title: string; depth: number };
export type HeadingSection = Heading & { children: Heading[] };

export function headingSections(headings: Heading[]): HeadingSection[] {
  const depth = headings.some(heading => heading.depth === 2) ? 2 : 3;
  const sections: HeadingSection[] = [];
  for (const heading of headings) {
    if (heading.depth === depth || !sections.length) sections.push({ ...heading, children: [] });
    else sections[sections.length - 1].children.push(heading);
  }
  return sections;
}

type ReadingPositionOptions = { ids: string[]; onChange: (id: string) => void };

/** Follow the last visible heading above the reading line, in document order. */
export function readingPosition(node: HTMLElement, options: ReadingPositionOptions) {
  let frame = 0;
  let disposed = false;
  let current = '';
  let targets: HTMLElement[] = [];
  const refreshTargets = () => {
    targets = options.ids.map(id => document.getElementById(id)).filter((target): target is HTMLElement => Boolean(target && node.contains(target)));
  };
  const update = () => {
    frame = 0;
    const visible = targets.filter(target => target.getClientRects().length && !target.closest('details:not([open])'));
    const readingLine = Math.max(128, (document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0) + 24);
    let next = visible[0]?.id ?? '';
    for (const target of visible) {
      if (target.getBoundingClientRect().top > readingLine) break;
      next = target.id;
    }
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) next = visible.at(-1)?.id ?? '';
    if (next !== current) { current = next; options.onChange(next); }
  };
  const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(update); };
  const resize = new ResizeObserver(schedule);
  refreshTargets();
  resize.observe(node);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  window.addEventListener('load', schedule, true);
  node.addEventListener('toggle', schedule, true);
  document.fonts.ready.then(schedule);
  schedule();
  return {
    update(next: ReadingPositionOptions) { options = next; current = ''; refreshTargets(); schedule(); },
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      window.removeEventListener('load', schedule, true);
      node.removeEventListener('toggle', schedule, true);
    }
  };
}

/** Scroll only the contents panel, without moving the document or changing its URL. */
export function keepCurrentVisible(node: HTMLElement, _active: string) {
  let frame = 0;
  const update = () => {
    frame = 0;
    if (!node.clientHeight || node.closest('details:not([open])')) return;
    const link = node.querySelector<HTMLElement>('[aria-current="location"]');
    if (!link) return;
    const panel = node.getBoundingClientRect();
    const target = link.getBoundingClientRect();
    if (target.top < panel.top + 8) node.scrollTop += target.top - panel.top - 8;
    else if (target.bottom > panel.bottom - 8) node.scrollTop += target.bottom - panel.bottom + 8;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const parent = node.parentElement;
  parent?.addEventListener('toggle', schedule);
  window.addEventListener('resize', schedule);
  schedule();
  return {
    update: schedule,
    destroy() { cancelAnimationFrame(frame); parent?.removeEventListener('toggle', schedule); window.removeEventListener('resize', schedule); }
  };
}
