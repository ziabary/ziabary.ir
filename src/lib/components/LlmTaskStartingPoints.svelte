<script lang="ts">
  import { research, researchModel, researchEvidenceId } from '$lib/llm/research';
  import { llmBrand } from '$lib/llm/brands';
  import type { LlmGuideRepository } from '$lib/llm/schema';
  import LlmEvidence from './LlmEvidence.svelte';
  export let repository: LlmGuideRepository;
  export let onOpenModel: (id: string, panel?: string) => void;
  let selected = 0;
  const descriptions = [
    'مدل کوچک برای بازنویسی، با ارزیابی OpenRewrite-Eval؛ این آزمون، ارزیابی بازنویسی فارسی نیست.',
    'دو حالت با و بدون تفکر افزوده را جدا بسنجید؛ طول پاسخ و بودجهٔ استدلال بر هزینه و تأخیر اثر دارند.',
    'نقطهٔ شروع برای تولید پاسخ از اسناد؛ نسخه‌های Q4 و Q8 را در جدول حافظه با زمینه و تعداد درخواست دلخواه بررسی کنید.',
    'فارسی در زبان‌های اعلام‌شدهٔ Aya Expanse است؛ زمینهٔ اعلامی نسخهٔ ۸ میلیاردی ۸٬۱۹۲ توکن و نسخهٔ ۳۲ میلیاردی ۱۳۱٬۰۷۲ توکن است.',
    'امتیاز نسخه‌های تقطیرشدهٔ ۷، ۱۴ و ۳۲ میلیاردی در یک گزارش ناشر موجود است؛ معیار نزدیک به مسئلهٔ خود و بودجهٔ توکن استدلال را انتخاب کنید.',
    'نتیجهٔ LiveCodeBench v4 در دو حالت تفکر موجود است. برای مخزن بزرگ یا عامل برنامه‌نویسی، ارزیابی همان کار لازم است.',
    'برای جست‌وجوی چندزبانه در اسناد، با بردارهای پیش‌فرض ۱٬۰۲۴بعدی.',
    'بازرتبه‌بند به جفت پرسش و سند امتیاز ارتباط می‌دهد؛ پس از بازیابی اولیه، ترتیب سندهای نامزد را اصلاح می‌کند.',
    'آزمون‌های vLLM، SGLang و TensorRT-LLM روی H100 موجودند. نرخ خروجی کل سرویس و زمان اولین توکن را کنار هم بخوانید.',
    'مسیر لایه‌ای AirLLM به RAM و دیسک تکیه دارد. حافظهٔ کم GPU به‌تنهایی به معنی پاسخ سریع یا سرویس هم‌زمان نیست.'
  ];
  $: item = research.startingPoints[selected];
  $: model = researchModel(repository, item.startingModelRepository);
</script>
<details class="task-start"><summary>کدام مدل برای کار من مناسب است؟</summary>
  <label>کار مورد نظر<select bind:value={selected}>{#each research.startingPoints as task,index}<option value={index}>{task.taskFa.replace('۱۴B','۱۴ میلیاردی')}</option>{/each}</select></label>
  <article><header>{#if llmBrand(item.startingModelRepository)}<img src={llmBrand(item.startingModelRepository)} alt="" width="36" height="36" />{/if}<bdi>{item.startingModelRepository.split('/')[1]}</bdi><small>مدل پیشنهادی</small></header><p>{descriptions[selected]}</p>{#if model}<button type="button" on:click={() => onOpenModel(model!.id)}>معرفی، نسخه‌ها و نتایج این مدل ←</button>{/if}<LlmEvidence ids={item.sourceIds.map(researchEvidenceId)} evidence={repository.evidence} /></article>
</details>
<style>
  .task-start{margin:16px 0;padding:16px;border:1px solid var(--line);border-radius:9px;background:var(--paper);font-size:13px;line-height:2}summary{color:var(--link-ink);cursor:pointer;font-weight:600}label{display:flex;flex-direction:column;gap:8px;max-width:420px;margin:15px 0}select{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:7px;padding:8px;min-width:0}header{display:flex;align-items:center;gap:12px;flex-wrap:wrap}header img{width:36px;height:36px;object-fit:contain;background:white;border-radius:7px;padding:4px;box-sizing:border-box}header small{color:var(--muted);font-size:11px}button{font:inherit;cursor:pointer;border:0;background:transparent;padding:4px 0;color:var(--link-ink)}article{min-width:0}p{margin:12px 0}
</style>
