<script lang="ts">
  export let locale: 'fa' | 'en' | 'es';
  const copy = {
    fa: ['وزن FP4، فعال‌سازی و نسخهٔ موتور', 'یادداشت پیش‌انتشار llama.cpp b11182 در ۲۵ سپتامبر ۲۰۲۶', 'نشان می‌دهد که قالب وزن، دقت فعال‌سازی، نسخهٔ موتور و سخت‌افزار باید جدا بررسی شوند. در CUDA روی Blackwell، لایه‌های NVFP4/MXFP4 با سیاست W4A16 می‌توانند مسیر W4A8 را به‌جای W4A4 به کار بگیرند.', 'طبق مستندات همین commit، GGML_CUDA_MMQ_PREC=auto از فرادادهٔ مدل/تنسور پیروی می‌کند؛ q4 و q8 آن را override می‌کنند. q4 ممکن است پردازش prompt را سریع‌تر کند اما دقت را کاهش دهد و توصیهٔ پیش‌فرض نیست. این یادداشت قابلیت نسخهٔ پایدار 0.5.0، تغییر مشخصات GPU یا تضمین عملکرد کارت‌های دیگر نیست.'],
    en: ['FP4 weights, activations and engine versions', 'The llama.cpp b11182 prerelease note of September 25, 2026', 'shows why weight format, activation precision, engine version and hardware must be considered separately. With CUDA on Blackwell, NVFP4/MXFP4 layers marked W4A16 can use W4A8 instead of W4A4.', 'The documentation at this commit specifies that GGML_CUDA_MMQ_PREC=auto follows model/tensor metadata; q4 and q8 override it. q4 may accelerate prompt processing at an accuracy cost and is not a default recommendation. This is not a stable 0.5.0 capability, a GPU specification change or a performance guarantee for other cards.'],
    es: ['Pesos FP4, activaciones y versiones del motor', 'La nota de prelanzamiento llama.cpp b11182 del 25 de septiembre de 2026', 'muestra por qué se deben distinguir formato de pesos, precisión de activaciones, versión del motor y hardware. En CUDA sobre Blackwell, las capas NVFP4/MXFP4 marcadas W4A16 pueden usar W4A8 en lugar de W4A4.', 'La documentación de este commit indica que GGML_CUDA_MMQ_PREC=auto sigue los metadatos del modelo/tensor; q4 y q8 fuerzan la precisión. q4 puede acelerar el procesamiento del prompt a costa de precisión y no se recomienda por defecto. No es una capacidad estable de 0.5.0, un cambio de especificaciones de GPU ni una garantía de rendimiento para otras tarjetas.']
  };
  $: c = copy[locale];
</script>
<aside id="fp4-activation-policy" class="precision-note" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <h2>{c[0]}</h2>
  <p><a href="https://github.com/ggml-org/llama.cpp/releases/tag/b11182">{c[1]}</a> {c[2]}</p>
  <p>{c[3]} <a href="https://github.com/ggml-org/llama.cpp/commit/e9f824d8c0f011662a742c9d15d4aa18a41e32c0"><bdi>e9f824d8 · docs/build.md</bdi></a></p>
</aside>
<style>
  .precision-note { margin-block: 1.5rem; padding: 1.25rem; border: 1px solid var(--border); border-radius: 12px; }
  h2 { font-size: 1.1rem; } p { line-height: 1.9; }
</style>
