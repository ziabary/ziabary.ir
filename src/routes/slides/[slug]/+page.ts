import { error } from '@sveltejs/kit';
import { findPresentation, presentations } from '$lib/presentations';

export function entries() {
  return presentations.map((presentation) => ({ slug: presentation.slug }));
}

export function load({ params }) {
  const presentation = findPresentation(params.slug);
  if (!presentation) error(404, 'Presentation not found');
  return { presentation };
}
