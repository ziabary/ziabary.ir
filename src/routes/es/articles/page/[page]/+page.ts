import { loadArchive, archiveEntries } from '$lib/archive-pages';
export const entries = () => archiveEntries('es');
export const load = ({params}) => loadArchive('es', params.page, true);
