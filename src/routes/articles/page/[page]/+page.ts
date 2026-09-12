import { loadArchive, archiveEntries } from '$lib/archive-pages';
export const entries = () => archiveEntries('fa');
export const load = ({params}) => loadArchive('fa', params.page, true);
