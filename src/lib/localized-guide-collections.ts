import { getArticle } from '$lib/content';
import type { GuideCollection } from '$lib/guides';

// Each edition has its own editorial selection and order. An introduction alone
// does not make a translated collection publishable.
const englishCollections: GuideCollection[] = [
  {
    slug: 'zero-trust-ai',
    title: 'Zero Trust AI (ZTAI)',
    subtitle: 'Secure the data, models and workflows of AI, from development to controlled execution and output release.',
    eyebrow: 'AI security',
    image: '/images/guides/zero-trust-ai.webp',
    imageAlt: 'An AI core connected to data and services through several security boundaries and access gates',
    intro: 'Start with the zero trust principles, then follow the operational foundations, maturity stages and practical controls. The final article examines whether removing direct human access also closes the indirect paths through code, outputs and infrastructure administration.',
    items: [
      { id: 'from-zero-trust-to-zero-trust-ai-en', title: 'From Zero Trust Architecture to Zero Trust AI', subtitle: 'Apply zero trust to data, models and the AI lifecycle.', kind: 'article', href: '/en/articles/from-zero-trust-to-zero-trust-ai-en/' },
      { id: 'mlops-foundation-of-zero-trust-ai-en', title: 'MLOps as the foundation for Zero Trust AI', subtitle: 'Make data, code, experiments and releases traceable.', kind: 'article', href: '/en/articles/mlops-foundation-of-zero-trust-ai-en/' },
      { id: 'zero-trust-ai-maturity-model-en', title: 'A maturity model for Zero Trust AI', subtitle: 'Move from manual work toward controlled automation.', kind: 'article', href: '/en/articles/zero-trust-ai-maturity-model-en/' },
      { id: 'zero-trust-ai-principles-and-controls-en', title: 'Zero Trust AI: principles and practical controls', subtitle: 'Enforce identity, data, model and output policies.', kind: 'article', href: '/en/articles/zero-trust-ai-principles-and-controls-en/' },
      { id: 'ztai-indirect-data-access-en', title: 'When people cannot see the data, has their access really been removed?', subtitle: 'Examine code changes, output release and administrator powers.', kind: 'article', href: '/en/articles/ztai-indirect-data-access-en/' }
    ]
  }
];

const spanishCollections: GuideCollection[] = [
  {
    slug: 'zero-trust-ai',
    title: 'IA de confianza cero (ZTAI)',
    subtitle: 'Proteja los datos, modelos y flujos de trabajo de IA, desde el desarrollo hasta la ejecución controlada y la publicación de resultados.',
    eyebrow: 'Seguridad de IA',
    image: '/images/guides/zero-trust-ai.webp',
    imageAlt: 'Un núcleo de IA conectado con datos y servicios a través de varias fronteras de seguridad y puertas de acceso',
    intro: 'Comience por los principios de confianza cero y continúe con la base operativa, las etapas de madurez y los controles prácticos. El último artículo examina si eliminar el acceso humano directo también cierra las vías indirectas del código, los resultados y la administración de infraestructura.',
    items: [
      { id: 'from-zero-trust-to-zero-trust-ai-es', title: 'De la arquitectura de confianza cero a la IA de confianza cero', subtitle: 'Aplicar confianza cero a los datos, modelos y ciclo de vida de IA.', kind: 'article', href: '/es/articles/from-zero-trust-to-zero-trust-ai-es/' },
      { id: 'mlops-foundation-of-zero-trust-ai-es', title: 'MLOps como base de la IA de confianza cero', subtitle: 'Hacer trazables los datos, el código, los experimentos y las publicaciones.', kind: 'article', href: '/es/articles/mlops-foundation-of-zero-trust-ai-es/' },
      { id: 'zero-trust-ai-maturity-model-es', title: 'Un modelo de madurez para la IA de confianza cero', subtitle: 'Avanzar del trabajo manual a la automatización controlada.', kind: 'article', href: '/es/articles/zero-trust-ai-maturity-model-es/' },
      { id: 'zero-trust-ai-principles-and-controls-es', title: 'IA de confianza cero: principios y controles prácticos', subtitle: 'Aplicar políticas de identidad, datos, modelos y resultados.', kind: 'article', href: '/es/articles/zero-trust-ai-principles-and-controls-es/' },
      { id: 'ztai-indirect-data-access-es', title: 'Si las personas no pueden ver los datos, ¿se ha eliminado realmente su acceso?', subtitle: 'Examinar cambios de código, publicación de resultados y poderes administrativos.', kind: 'article', href: '/es/articles/ztai-indirect-data-access-es/' }
    ]
  }
];

export function getLocalizedGuideCollections(locale: 'en' | 'es'): GuideCollection[] {
  return (locale === 'en' ? englishCollections : spanishCollections).map(collection => ({
    ...collection,
    items: collection.items.filter(item => item.kind !== 'article' || getArticle(item.id)?.lang === locale)
  })).filter(collection => collection.items.length > 0);
}

export function getLocalizedGuideCollection(locale: 'en' | 'es', slug: string) {
  return getLocalizedGuideCollections(locale).find(collection => collection.slug === slug);
}
