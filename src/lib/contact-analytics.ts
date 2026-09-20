export type ContactPlacement = 'wizard' | 'llm-guide' | 'gpu-guide';
const handled = new WeakSet<Event>();
/** Interaction only: never infer a submitted enquiry from opening an email app. */
export function trackContact(event: Event, action: 'contact_reveal' | 'contact_email_click', placement: ContactPlacement, locale: string) {
  if (!event.isTrusted || handled.has(event)) return;
  handled.add(event);
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  let referrer = '';
  try { const url = new URL(document.referrer); referrer = url.origin + url.pathname; } catch {}
  gtag('event', action, {
    contact_placement: placement,
    content_language: locale,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: referrer
  });
}
