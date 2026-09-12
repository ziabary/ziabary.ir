import { loadArchive, archiveEntries } from '$lib/archive-pages';
export const entries = () => archiveEntries('en');
export const load = ({params}) => loadArchive('en', params.page, true);
