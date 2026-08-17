<script lang="ts">
  export let title: string;
  export let description: string;
  export let path: string;
  export let image: string;
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  export let type: 'website' | 'article' = 'website';
  export let imageAlt: string = title;
  export let imageWidth: number | undefined = undefined;
  export let imageHeight: number | undefined = undefined;

  const siteUrl = 'https://ziabary.ir';
  $: canonicalUrl = new URL(path, siteUrl).href;
  $: imageUrl = new URL(image, siteUrl).href;
  $: siteName = locale === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary';
  $: ogLocale = locale === 'fa' ? 'fa_IR' : locale === 'es' ? 'es_ES' : 'en_US';
  $: imageExtension = imageUrl.split('?')[0].split('.').pop()?.toLowerCase();
  $: imageType = imageExtension === 'png' ? 'image/png' : imageExtension === 'webp' ? 'image/webp' : 'image/jpeg';
  $: structuredData = JSON.stringify(
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          url: canonicalUrl,
          image: [imageUrl],
          author: {
            '@type': 'Person',
            name: 'Mehran Ziabary',
            url: siteUrl
          },
          publisher: {
            '@type': 'Person',
            name: 'Mehran Ziabary',
            url: siteUrl
          }
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: canonicalUrl,
          image: imageUrl,
          isPartOf: {
            '@type': 'WebSite',
            name: 'Mehran Ziabary',
            url: siteUrl
          },
          about: {
            '@type': 'Person',
            name: 'Mehran Ziabary',
            url: siteUrl
          }
        }
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content={ogLocale} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:image:secure_url" content={imageUrl} />
  <meta property="og:image:type" content={imageType} />
  <meta property="og:image:alt" content={imageAlt} />
  {#if imageWidth}<meta property="og:image:width" content={`${imageWidth}`} />{/if}
  {#if imageHeight}<meta property="og:image:height" content={`${imageHeight}`} />{/if}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />
  <meta name="twitter:image:alt" content={imageAlt} />

  <script type="application/ld+json">{structuredData}</script>
</svelte:head>
