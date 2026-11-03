import deckContent from '../../content/presentations/decks/index.json';
const presentationDecks: Record<string, { pdf?: string; cover?: string; version?: string; slideCount?: number }> = deckContent;
import presentationsContent from '../../content/presentations/deliveries/index.json';
export type PresentationLocale = 'fa' | 'en' | 'es';

export type PresentationPerson = { name: string; honorificPrefix?: string };

export type PresentationTranslation = {
  title: string;
  subtitle?: string;
  presenter?: PresentationPerson;
  preparedBy?: string[];
  summary: string;
  description: string;
  presentedAt: string;
  venue: string;
  event?: string;
  organizer?: string;
  audience?: string;
  duration?: string;
  version?: string;
  topics: string[];
};

export type Presentation = {
  slug: string;
  title: string;
  subtitle?: string;
  englishTitle?: string;
  presenter?: PresentationPerson;
  preparedBy?: string[];
  date?: string;
  language?: string;
  kind: 'دوره' | 'کارگاه' | 'سخنرانی' | 'ارائه تخصصی';
  summary: string;
  description: string;
  presentedAt: string;
  venue: string;
  event?: string;
  eventUrl?: string;
  organizer?: string;
  audience?: string;
  duration?: string;
  slideCount: number;
  version?: string;
  cover?: string;
  coverWidth?: number;
  coverHeight?: number;
  pdf?: string;
  instructorProfileUrl?: string;
  topics: string[];
  // Only the description and presentation details are translated; assets stay shared.
  translations: Record<'en' | 'es', PresentationTranslation>;
};

const dbaInstructorProfileUrl = 'https://postmba.org/professors/سید-محمد-محمدزاده-ضیابری/';

// Keep the newest upload first. The home page features the first entry with a PDF.
export const presentations: Presentation[] = presentationsContent.map(({ deck, ...delivery }) => ({ ...delivery, ...(deck ? presentationDecks[deck] : {}) })) as Presentation[];

export const findPresentation = (slug: string) =>
  presentations.find((presentation) => presentation.slug === slug);

export type LocalizedPresentation = PresentationTranslation & {
  slug: string;
  kind: string;
  date?: string;
  language?: string;
  englishTitle?: string;
  eventUrl?: string;
  slideCount: number;
  cover?: string;
  coverWidth?: number;
  coverHeight?: number;
  pdf?: string;
  instructorProfileUrl?: string;
};

const presentationKinds = {
  en: { 'دوره': 'Course', 'کارگاه': 'Workshop', 'سخنرانی': 'Talk', 'ارائه تخصصی': 'Specialist presentation' },
  es: { 'دوره': 'Curso', 'کارگاه': 'Taller', 'سخنرانی': 'Conferencia', 'ارائه تخصصی': 'Presentación especializada' }
};

export function localizePresentation(item: Presentation, locale: PresentationLocale): LocalizedPresentation {
  if (locale === 'fa') return item;
  return {
    ...item.translations[locale],
    slug: item.slug,
    kind: presentationKinds[locale][item.kind],
    slideCount: item.slideCount,
    date: item.date,
    language: item.language,
    englishTitle: item.englishTitle,
    eventUrl: item.eventUrl,
    cover: item.cover,
    coverWidth: item.coverWidth,
    coverHeight: item.coverHeight,
    pdf: item.pdf,
    instructorProfileUrl: item.instructorProfileUrl
  };
}

export function presenterName(person?: PresentationPerson): string {
  return person ? [person.honorificPrefix, person.name].filter(Boolean).join(' ') : '';
}

export function preparationNames(names: string[], locale: PresentationLocale): string {
  return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(names);
}

// Explicit credits are required: do not infer authorship from the website owner.
export function presentationStructuredData(
  item: LocalizedPresentation,
  locale: PresentationLocale,
  labels: { presenter: string; preparedBy: string }
): Record<string, unknown> | undefined {
  if (!item.preparedBy?.length) return undefined;
  const siteUrl = 'https://ziabary.ir';
  const path = `${locale === 'fa' ? '' : `/${locale}`}/slides/${item.slug}/`;
  const url = new URL(path, siteUrl).href;
  return {
    '@type': 'PresentationDigitalDocument',
    '@id': `${url}#presentation`,
    name: item.title,
    ...(item.subtitle ? { alternativeHeadline: item.subtitle } : {}),
    description: item.summary,
    abstract: item.description.replace(/^### /gm, '').replace(/\*\*/g, ''),
    url,
    inLanguage: item.language ?? 'fa',
    ...(item.date ? { datePublished: item.date } : {}),
    ...(item.cover ? { image: new URL(item.cover, siteUrl).href } : {}),
    author: item.preparedBy.map(name => ({ '@type': 'Person', name })),
    creditText: `${labels.preparedBy}: ${preparationNames(item.preparedBy, locale)}`,
    ...(item.presenter ? {
      contributor: {
        '@type': 'Role',
        roleName: labels.presenter,
        contributor: { '@type': 'Person', ...item.presenter }
      }
    } : {}),
    keywords: item.topics,
    ...(item.pdf ? {
      encoding: {
        '@type': 'MediaObject',
        contentUrl: new URL(item.pdf, siteUrl).href,
        encodingFormat: 'application/pdf',
        inLanguage: item.language ?? 'fa'
      }
    } : {})
  };
}
