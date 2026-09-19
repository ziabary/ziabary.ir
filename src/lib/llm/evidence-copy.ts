import type { Evidence } from './schema';

/** Notes are an editorial field, selected in canonical data and localized by ID.
 * Changing source wording must never change which scientific constraints survive. */
export function evidenceNotes(source: Evidence): string[] {
  return [...new Set(source.presentationNotes ?? [])];
}
