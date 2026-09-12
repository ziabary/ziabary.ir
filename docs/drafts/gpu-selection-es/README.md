# Colección de GPU en español — revisión editorial

Preparada el 9 de septiembre de 2026. Estado corregido el 12 de septiembre de 2026, tras la confirmación del propietario: **las colecciones española e inglesa están publicadas.**

Ejecute `npm run build` y `npm run preview:local` y abra
`http://127.0.0.1:4186/es/guides/gpu-selection/`. Incluye siete artículos,
dos tablas interactivas y enlaces a los siete artículos individuales. La colección
aparece en las guías técnicas, el buscador y el sitemap, sin etiqueta de borrador.

## Alcance de la adaptación

- Los siete artículos tienen `lang: es`, `draft: false` y slugs terminados
  en `-es`. Aparecen en `/es/articles/`, en el HTML de producción y en el sitemap.
  La colección también tiene `draft: false`, HTML estático, canonical y enlaces
  entre idiomas. Esta corrección local no despliega los demás cambios pendientes.
- La versión inglesa sirve de base editorial. Las recomendaciones se organizan
  por carga de trabajo, presupuesto, ampliación, compatibilidad y cobertura de
  soporte, sin atribuir esas circunstancias a un país concreto.
- Se conservan las referencias, matices técnicos, orden de lectura y relaciones
  seleccionadas en inglés. Los enlaces internos apuntan a los artículos españoles.
  El artículo de seguridad aún no traducido se identifica como «en persa».
- Las tablas utilizan los mismos registros numéricos, identificadores y fuentes
  que las ediciones persa e inglesa. Los textos se mantienen en
  `src/lib/i18n/gpu-data.es.json` y `gpu-ui.es.json`; `gpu.ts` aplica las
  traducciones sin duplicar especificaciones. Los números de las tablas usan
  el formato de la configuración regional española.
- El visor compartido mantiene el ancho de las imágenes dentro del texto y
  actualiza el índice lateral al desplazarse por la colección.

## Imágenes

Las imágenes locales existentes se reutilizan, con pies y textos alternativos
traducidos. Las etiquetas de los diagramas y gráficos originales siguen en inglés.

**Falta sustituir una portada:**
`/images/articles/pcie-gpu-server-selection/cover.png` contiene etiquetas en persa.
Se conserva durante la revisión; antes de publicar se necesita una versión
traducida, preferiblemente con las mismas proporciones horizontales. La incidencia
también figura en `collection.json`. No se han generado ni alterado las figuras.

## Validación y publicación

```sh
node --test tests/gpu-locales.test.mjs
npm run check
npm run build
```

Las pruebas comprueban las traducciones, la conservación de cifras y fuentes,
los enlaces internos, las imágenes y el estado publicable de los artículos. La publicación de la colección completa
requiere revisar la portada y registrar la colección española. Entonces se podrá retirar su restricción de desarrollo y su excepción
específica de `handleUnseenRoutes` en `svelte.config.js`. Mantenga la excepción
inglesa mientras esa colección siga siendo solo un borrador local.
