<script lang="ts">
  import { onDestroy, tick } from 'svelte';

  type PendingImage = {
    file: File;
    name: string;
    url: string;
  };

  let title = '';
  let slug = '';
  let lang: 'fa' | 'en' | 'es' = 'fa';
  let date = new Date().toISOString().slice(0, 10);
  let faDate = '';
  let updated = '';
  let faUpdated = '';
  let category = 'یادداشت';
  let excerpt = '';
  let readTime = '۸ دقیقه';
  let relatedRaw = '';
  let external = '';
  let draft = true;
  let body = '## تیتر نخست\n\nمتن مقاله را از اینجا بنویسید…';
  let images: PendingImage[] = [];
  let bodyEditor: HTMLTextAreaElement;
  let imagePicker: HTMLInputElement;
  let markdownPicker: HTMLInputElement;
  let repoHandle: any = null;
  let repoName = '';
  let status = '';
  let statusKind: 'info' | 'success' | 'error' = 'info';
  let dragging = false;

  $: safeSlug = normalizeSlug(slug) || 'new-article';
  $: markdown = createMarkdown();
  $: previewHtml = renderMarkdown(body);

  function normalizeSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\p{L}\p{N}._-]+/gu, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function normalizeFileName(value: string) {
    const dot = value.lastIndexOf('.');
    const base = dot > 0 ? value.slice(0, dot) : value;
    const extension = dot > 0 ? value.slice(dot).toLowerCase() : '';
    return `${normalizeSlug(base) || `image-${Date.now()}`}${extension}`;
  }

  function yaml(value: string) {
    return JSON.stringify(value.trim());
  }

  function createMarkdown() {
    const related = relatedRaw.split(/[،,\n]/).map((item) => normalizeSlug(item)).filter(Boolean);
    const lines = [
      '---',
      `title: ${yaml(title || 'عنوان مقاله')}`,
      `slug: ${safeSlug}`,
      `lang: ${lang}`,
      `date: ${date}`,
      `faDate: ${yaml(faDate || 'تاریخ فارسی')}`,
      ...(updated ? [`updated: ${updated}`] : []),
      ...(updated && faUpdated.trim() ? [`faUpdated: ${yaml(faUpdated)}`] : []),
      `category: ${yaml(category)}`,
      `excerpt: ${yaml(excerpt || 'خلاصه مقاله')}`,
      `readTime: ${yaml(readTime)}`,
      'related:',
      ...related.map((item) => `  - ${item}`),
      ...(external.trim() ? [`external: ${yaml(external)}`] : []),
      `draft: ${draft}`,
      '---',
      '',
      body.trim(),
      ''
    ];
    return lines.join('\n');
  }

  function updateSlug(event: Event) {
    const previous = safeSlug;
    slug = (event.currentTarget as HTMLInputElement).value;
    const next = normalizeSlug(slug) || 'new-article';
    if (previous !== next) body = body.replaceAll(`/images/articles/${previous}/`, `/images/articles/${next}/`);
  }

  async function insertIntoBody(value: string) {
    const insertion = `\n\n${value}\n\n`;
    if (!bodyEditor) {
      body += insertion;
      return;
    }
    const start = bodyEditor.selectionStart;
    const end = bodyEditor.selectionEnd;
    body = `${body.slice(0, start)}${insertion}${body.slice(end)}`;
    await tick();
    bodyEditor.focus();
    bodyEditor.setSelectionRange(start + insertion.length, start + insertion.length);
  }

  function addFiles(files: File[]) {
    const accepted = files.filter((file) => file.type.startsWith('image/'));
    if (!accepted.length) {
      setStatus('فقط فایل تصویری پذیرفته می‌شود.', 'error');
      return;
    }

    const existingNames = new Set(images.map((image) => image.name));
    const additions = accepted.map((file) => {
      let name = normalizeFileName(file.name || `pasted-image-${Date.now()}.png`);
      let counter = 2;
      const dot = name.lastIndexOf('.');
      const base = dot > 0 ? name.slice(0, dot) : name;
      const extension = dot > 0 ? name.slice(dot) : '';
      while (existingNames.has(name)) name = `${base}-${counter++}${extension}`;
      existingNames.add(name);
      return { file, name, url: URL.createObjectURL(file) };
    });

    images = [...images, ...additions];
    for (const image of additions) insertIntoBody(`![توضیح تصویر](/images/articles/${safeSlug}/${image.name})`);
    setStatus(`${additions.length.toLocaleString('fa-IR')} تصویر اضافه شد.`, 'success');
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragging = false;
    addFiles(Array.from(event.dataTransfer?.files ?? []));
  }

  function handlePaste(event: ClipboardEvent) {
    const pasted = Array.from(event.clipboardData?.items ?? [])
      .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter((file): file is File => Boolean(file));
    if (!pasted.length) return;
    event.preventDefault();
    addFiles(pasted);
  }

  function removeImage(index: number) {
    const image = images[index];
    URL.revokeObjectURL(image.url);
    images = images.filter((_, imageIndex) => imageIndex !== index);
    body = body.replaceAll(`![توضیح تصویر](/images/articles/${safeSlug}/${image.name})`, '');
  }

  async function chooseRepository() {
    if (!('showDirectoryPicker' in window)) {
      setStatus('مرورگر شما نوشتن مستقیم در پوشه را پشتیبانی نمی‌کند؛ از دکمه دانلود Markdown استفاده کنید.', 'error');
      return;
    }
    try {
      const handle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
      await handle.getFileHandle('package.json');
      await handle.getDirectoryHandle('src');
      repoHandle = handle;
      repoName = handle.name;
      setStatus(`مخزن «${handle.name}» انتخاب شد.`, 'success');
    } catch (error) {
      if ((error as DOMException).name === 'AbortError') return;
      repoHandle = null;
      repoName = '';
      setStatus('پوشه انتخاب‌شده ریشه این پروژه نیست؛ پوشه‌ای را انتخاب کنید که package.json در آن قرار دارد.', 'error');
    }
  }

  async function nestedDirectory(root: any, parts: string[]) {
    let current = root;
    for (const part of parts) current = await current.getDirectoryHandle(part, { create: true });
    return current;
  }

  async function writeFile(directory: any, name: string, content: Blob | string) {
    const handle = await directory.getFileHandle(name, { create: true });
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
  }

  function validate() {
    if (!title.trim()) return 'عنوان مقاله را وارد کنید.';
    if (!normalizeSlug(slug)) return 'یک slug معتبر وارد کنید.';
    if (!date || !faDate.trim()) return 'تاریخ میلادی و فارسی را کامل کنید.';
    if (!excerpt.trim()) return 'خلاصه مقاله را وارد کنید.';
    return '';
  }

  async function saveToRepository() {
    const problem = validate();
    if (problem) {
      setStatus(problem, 'error');
      return;
    }
    if (!repoHandle) {
      await chooseRepository();
      if (!repoHandle) return;
    }

    try {
      const articlesDirectory = await nestedDirectory(repoHandle, ['src', 'lib', 'content', 'articles']);
      await writeFile(articlesDirectory, `${safeSlug}.md`, markdown);

      if (images.length) {
        const imagesDirectory = await nestedDirectory(repoHandle, ['static', 'images', 'articles', safeSlug]);
        for (const image of images) await writeFile(imagesDirectory, image.name, image.file);
      }

      setStatus(`مقاله و ${images.length.toLocaleString('fa-IR')} تصویر در مخزن ذخیره شد؛ اکنون تغییرات را commit و push کنید.`, 'success');
    } catch (error) {
      setStatus(`ذخیره انجام نشد: ${(error as Error).message}`, 'error');
    }
  }

  function download(content: Blob, fileName: string) {
    const url = URL.createObjectURL(content);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadMarkdown() {
    const problem = validate();
    if (problem) {
      setStatus(problem, 'error');
      return;
    }
    download(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }), `${safeSlug}.md`);
  }

  function parseScalar(value: string) {
    const trimmed = value.trim();
    if (trimmed.startsWith('"')) {
      try { return JSON.parse(trimmed); } catch { return trimmed.replace(/^"|"$/g, ''); }
    }
    return trimmed;
  }

  async function loadMarkdown(event: Event) {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];
    if (!file) return;
    const source = await file.text();
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) {
      setStatus('Frontmatter فایل Markdown قابل تشخیص نیست.', 'error');
      return;
    }

    const values: Record<string, string> = {};
    const related: string[] = [];
    let readingRelated = false;
    for (const line of match[1].split(/\r?\n/)) {
      if (readingRelated && /^\s+-\s+/.test(line)) {
        related.push(line.replace(/^\s+-\s+/, '').trim());
        continue;
      }
      readingRelated = false;
      const separator = line.indexOf(':');
      if (separator < 0) continue;
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim();
      if (key === 'related') {
        if (value.startsWith('[') && value.endsWith(']')) {
          related.push(...value.slice(1, -1).split(',').map((item) => parseScalar(item.trim())).filter(Boolean));
          continue;
        }
        readingRelated = true;
        continue;
      }
      values[key] = parseScalar(value);
    }

    title = values.title ?? '';
    slug = values.slug ?? file.name.replace(/\.md$/i, '');
    lang = values.lang === 'en' || values.lang === 'es' ? values.lang : 'fa';
    date = values.date ?? date;
    faDate = values.faDate ?? '';
    updated = values.updated ?? '';
    faUpdated = values.faUpdated ?? '';
    category = values.category ?? 'یادداشت';
    excerpt = values.excerpt ?? '';
    readTime = values.readTime ?? '۸ دقیقه';
    relatedRaw = related.join(', ');
    external = values.external ?? '';
    draft = values.draft !== 'false';
    body = match[2].trim();
    setStatus(`فایل «${file.name}» برای ویرایش باز شد.`, 'success');
    (event.currentTarget as HTMLInputElement).value = '';
  }

  function escapeHtml(value: string) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function renderInline(value: string) {
    let output = escapeHtml(value);
    output = output.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, path) => {
      const image = images.find((item) => path.endsWith(`/${item.name}`));
      const src = image?.url ?? (path.startsWith('/') || path.startsWith('https://') ? path : '');
      return src ? `<img src="${src}" alt="${alt}" />` : `<span class="missing-image">تصویر: ${alt || path}</span>`;
    });
    output = output.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)/g, '<a href="$2">$1</a>');
    output = output.replace(/`([^`]+)`/g, '<code>$1</code>');
    output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return output;
  }

  function renderMarkdown(value: string) {
    const lines = value.split(/\r?\n/);
    const output: string[] = [];
    let inCode = false;
    let code: string[] = [];
    let listOpen = false;

    for (const line of lines) {
      if (line.startsWith('```')) {
        if (inCode) {
          output.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
          code = [];
        }
        inCode = !inCode;
        continue;
      }
      if (inCode) {
        code.push(line);
        continue;
      }
      const listItem = line.match(/^[-*]\s+(.+)/);
      if (listItem) {
        if (!listOpen) output.push('<ul>');
        listOpen = true;
        output.push(`<li>${renderInline(listItem[1])}</li>`);
        continue;
      }
      if (listOpen) {
        output.push('</ul>');
        listOpen = false;
      }
      if (/^###\s+/.test(line)) output.push(`<h3>${renderInline(line.replace(/^###\s+/, ''))}</h3>`);
      else if (/^##\s+/.test(line)) output.push(`<h2>${renderInline(line.replace(/^##\s+/, ''))}</h2>`);
      else if (/^#\s+/.test(line)) output.push(`<h1>${renderInline(line.replace(/^#\s+/, ''))}</h1>`);
      else if (/^>\s?/.test(line)) output.push(`<blockquote>${renderInline(line.replace(/^>\s?/, ''))}</blockquote>`);
      else if (line.trim()) output.push(`<p>${renderInline(line)}</p>`);
    }
    if (listOpen) output.push('</ul>');
    if (inCode) output.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
    return output.join('');
  }

  function setStatus(message: string, kind: 'info' | 'success' | 'error') {
    status = message;
    statusKind = kind;
  }

  onDestroy(() => images.forEach((image) => URL.revokeObjectURL(image.url)));
</script>

<svelte:head>
  <title>مدیریت محتوا | مهران ضیابری</title>
  <meta name="robots" content="noindex,nofollow" />
</svelte:head>

<main class="admin-page" onpaste={handlePaste}>
  <section class="wrap admin-heading">
    <div>
      <p class="eyebrow">Git-first · بدون بک‌اند</p>
      <h1>مدیریت محتوا</h1>
      <p>مقاله را بنویسید، تصویر را بکشید یا مستقیماً paste کنید، پیش‌نمایش را ببینید و خروجی را داخل مخزن ذخیره کنید.</p>
    </div>
    <div class="admin-repo">
      <span class:connected={repoHandle}>{repoHandle ? `متصل به ${repoName}` : 'هنوز مخزنی انتخاب نشده'}</span>
      <button class="button ghost" type="button" onclick={chooseRepository}>انتخاب پوشه مخزن</button>
      <button class="button ghost" type="button" onclick={() => markdownPicker.click()}>باز کردن Markdown</button>
      <input class="visually-hidden" bind:this={markdownPicker} type="file" accept=".md,text/markdown" onchange={loadMarkdown} />
    </div>
  </section>

  <section class="wrap admin-note">
    <b>این صفحه حساب کاربری یا رمز عبور ندارد.</b>
    <span>تمام پردازش در مرورگر انجام می‌شود و تا زمانی که خودتان پوشه‌ای را انتخاب و ذخیره نکنید، فایلی تغییر نمی‌کند. پس از ذخیره، commit و push همچنان با Git انجام می‌شود.</span>
  </section>

  <section class="wrap admin-layout">
    <div class="admin-editor">
      <section class="admin-panel meta-panel">
        <div class="panel-title"><span>۰۱</span><div><b>مشخصات مقاله</b><small>Frontmatter</small></div></div>
        <div class="field-grid">
          <label class="wide"><span>عنوان</span><input bind:value={title} placeholder="عنوان مقاله" /></label>
          <label><span>Slug</span><input value={slug} oninput={updateSlug} dir="ltr" placeholder="article-slug" /></label>
          <label><span>زبان</span><select bind:value={lang}><option value="fa">فارسی</option><option value="en">English</option><option value="es">Español</option></select></label>
          <label><span>تاریخ میلادی</span><input bind:value={date} type="date" dir="ltr" /></label>
          <label><span>تاریخ نمایشی</span><input bind:value={faDate} placeholder="۱۸ مرداد ۱۴۰۵" /></label>
          <label><span>آخرین بازبینی (اختیاری)</span><input bind:value={updated} type="date" dir="ltr" /></label>
          <label><span>نمایش آخرین بازبینی</span><input bind:value={faUpdated} placeholder="۱۹ مرداد ۱۴۰۵" disabled={!updated} /></label>
          <label><span>دسته</span><input bind:value={category} list="categories" /></label>
          <datalist id="categories"><option value="یادداشت"></option><option value="تحلیل"></option><option value="راهنمای فنی"></option><option value="حکمرانی هوش مصنوعی"></option></datalist>
          <label><span>زمان مطالعه</span><input bind:value={readTime} /></label>
          <label class="wide"><span>خلاصه</span><textarea bind:value={excerpt} rows="3" placeholder="خلاصه‌ای که در کارت مقاله و نتایج جستجو دیده می‌شود"></textarea></label>
          <label class="wide"><span>مقالات مرتبط</span><input bind:value={relatedRaw} dir="ltr" placeholder="slug-one, slug-two" /><small>ترتیب این فهرست همان مسیر مطالعه مرتبط خواهد بود.</small></label>
          <label class="wide"><span>لینک نسخه اصلی در رسانه (اختیاری)</span><input bind:value={external} dir="ltr" placeholder="https://…" /></label>
          <label class="draft-field"><input bind:checked={draft} type="checkbox" /><span>به‌صورت پیش‌نویس ذخیره شود</span></label>
        </div>
      </section>

      <section class="admin-panel">
        <div class="panel-title"><span>۰۲</span><div><b>متن Markdown</b><small>نوشتن و ویرایش</small></div></div>
        <textarea class="markdown-editor" bind:this={bodyEditor} bind:value={body} dir={lang === 'fa' ? 'rtl' : 'ltr'} spellcheck="true"></textarea>
      </section>

      <section class="admin-panel">
        <div class="panel-title"><span>۰۳</span><div><b>تصاویر</b><small>Drag, drop or paste</small></div></div>
        <button
          type="button"
          class:dragging
          class="image-drop"
          ondragenter={(event) => { event.preventDefault(); dragging = true; }}
          ondragover={(event) => event.preventDefault()}
          ondragleave={() => (dragging = false)}
          ondrop={handleDrop}
          onclick={() => imagePicker.click()}
        >
          <b>تصویر را اینجا رها کنید</b>
          <span>یا کلیک کنید؛ همچنین می‌توانید تصویر را از Clipboard مستقیماً paste کنید.</span>
          <kbd>Ctrl / ⌘ + V</kbd>
        </button>
        <input class="visually-hidden" bind:this={imagePicker} type="file" accept="image/*" multiple onchange={(event) => addFiles(Array.from(event.currentTarget.files ?? []))} />

        {#if images.length}
          <div class="pending-images">
            {#each images as image, index}
              <article>
                <img src={image.url} alt="" />
                <div><b dir="ltr">{image.name}</b><small dir="ltr">/static/images/articles/{safeSlug}/</small></div>
                <span class="pending-actions">
                  <button type="button" onclick={() => download(image.file, image.name)} aria-label="دانلود تصویر">↓</button>
                  <button type="button" onclick={() => removeImage(index)} aria-label="حذف تصویر">×</button>
                </span>
              </article>
            {/each}
          </div>
        {/if}
      </section>

      <div class="admin-actions">
        <button class="button primary" type="button" onclick={saveToRepository}>ذخیره مستقیم در مخزن</button>
        <button class="button ghost" type="button" onclick={downloadMarkdown}>دانلود فایل Markdown</button>
      </div>
      {#if status}<p class="admin-status {statusKind}" role="status">{status}</p>{/if}
    </div>

    <aside class="admin-preview">
      <div class="preview-bar"><b>پیش‌نمایش زنده</b><span>{draft ? 'پیش‌نویس' : 'آماده انتشار'}</span></div>
      <article dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <small>{category} · {faDate || 'تاریخ مقاله'} · {readTime}</small>
        <h1>{title || 'عنوان مقاله'}</h1>
        <p class="preview-excerpt">{excerpt || 'خلاصه مقاله در این قسمت نمایش داده می‌شود.'}</p>
        <div class="preview-prose">{@html previewHtml}</div>
      </article>
      <details>
        <summary>مشاهده Markdown نهایی</summary>
        <pre dir="ltr">{markdown}</pre>
      </details>
    </aside>
  </section>
</main>
