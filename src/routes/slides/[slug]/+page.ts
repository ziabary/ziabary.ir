import { error } from '@sveltejs/kit';
import { courses } from '$lib/data';

export function entries() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function load({ params }) {
  const course = courses.find((item) => item.slug === params.slug);
  if (!course) error(404, 'Course not found');
  return { course };
}
