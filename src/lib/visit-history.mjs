export const VISIT_STORAGE_KEY = 'ziabary:visited';

/** Capture visit status once so client-side navigation stays in the same visit.
 * Call only after mounting in the browser; no storage access happens on the server.
 * @param {() => Pick<Storage,'getItem'|'setItem'>} getStorage
 */
export function createReturningVisitCheck(getStorage) {
  /** @type {boolean | undefined} */
  let returning;
  return () => {
    if (returning !== undefined) return returning;
    returning = false;
    try {
      const storage = getStorage();
      returning = storage.getItem(VISIT_STORAGE_KEY) === '1';
      if (!returning) storage.setItem(VISIT_STORAGE_KEY, '1');
    } catch {
      // Without a reliable previous-visit marker, keep notifications quiet.
    }
    return returning;
  };
}

export const isReturningVisit = createReturningVisitCheck(() => window.localStorage);
