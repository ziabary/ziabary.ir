import { error } from '@sveltejs/kit';
import { findPresentation, presentations } from '$lib/presentations';

export const presentationEntries = () => presentations.map(({ slug }) => ({ slug }));

export function loadPresentation({ params }: { params: { slug: string } }) {
  const presentation = findPresentation(params.slug);
  if (!presentation) error(404, 'Presentation not found');
  return { presentation };
}
