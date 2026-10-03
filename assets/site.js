(() => {
  'use strict';
  const data = window.PD_QA_CONTENT;
  if (!data || !Array.isArray(data.chapters)) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const lines = value => escape(value).replace(/\n/g, '<br>');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mediaItems = [];
  let figureNumber = 0;
  let lastFocused = null;
  const screenshotPath = value => value.includes('/') ? value : `assets/screenshots/${value}.png`;
  const recordingPath = value => value.includes('/') ? value : `assets/recordings/${value}.gif`;

  function renderMedia(items) {
    if (!items?.length) return '';
    return `<div class="media-collection">${items.map(item => {
      const index = mediaItems.length;
      const media = { ...item, src: screenshotPath(item.image), animation: item.gif ? recordingPath(item.gif) : null };
      const [width, height] = data.dimensions?.[item.image] || [1600, 1000];
      mediaItems.push(media);
      figureNumber += 1;
      return `<figure class="media-figure${item.featured ? ' featured' : ''}${item.compact ? ' compact' : ''}"${item.compact ? ` style="--media-max-width:${width + 22}px"` : ''} data-media="${index}">
        <div class="media-frame"><button class="image-open" type="button" data-open-image="${index}" aria-label="放大查看：${escape(item.title)}"><img src="${escape(media.src)}" width="${width}" height="${height}" alt="${escape(item.alt || item.title)}" loading="${figureNumber === 1 ? 'eager' : 'lazy'}" decoding="async" data-media-image="${index}"></button>
        ${media.animation ? `<div class="media-controls"><button class="animation-button" type="button" data-animation="${index}" aria-pressed="false"><span class="play-symbol" aria-hidden="true">▶</span><span class="animation-label">播放演示</span></button><span class="recording-label">界面操作录屏 · GIF</span></div>` : ''}</div>
        <figcaption><span class="figure-number">${String(figureNumber).padStart(2, '0')}</span><div><p class="figure-title">${escape(item.title)}</p><p class="figure-caption">${escape(item.caption)}</p></div></figcaption>
      </figure>`;
    }).join('')}</div>`;
  }
  function renderHighlights(items) {
    return !items?.length ? '' : `<div class="highlights">${items.map(item => `<div class="highlight"><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p></div>`).join('')}</div>`;
  }
  function renderProcess(items) {
    return !items?.length ? '' : `<ol class="process">${items.map(item => `<li><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p></li>`).join('')}</ol>`;
  }
  function renderModules(items) {
    return !items?.length ? '' : `<div class="capability-index">${items.map((item, index) => `<a class="capability-row" href="${escape(item.href)}"><span class="module-number">${String(index + 1).padStart(2, '0')}</span><div><h3>${escape(item.name)}</h3><p>${escape(item.text)}</p></div><span class="module-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
  }
  function renderTable(chapter) {
    if (!Array.isArray(chapter.table) || !chapter.table.length) return '';
    const rows = chapter.table.map(row => Array.isArray(row) ? row : [row]);
    const headers = Array.isArray(chapter.tableHeaders) ? chapter.tableHeaders : [];
    const columns = Math.max(headers.length, ...rows.map(row => row.length));
    if (!columns) return '';
    const title = chapter.tableTitle || '能力说明';
    const titleId = `${chapter.id}-table-title`;
    const wide = columns > 2;
    const head = headers.length ? `<thead><tr>${Array.from({ length: columns }, (_, index) => `<th scope="col">${lines(headers[index])}</th>`).join('')}</tr></thead>` : '';
    const body = rows.map(row => `<tr>${Array.from({ length: columns }, (_, index) => index === 0 ? `<th scope="row">${lines(row[index])}</th>` : `<td>${lines(row[index])}</td>`).join('')}</tr>`).join('');
    return `<div class="detail-table"><h3 id="${escape(titleId)}">${escape(title)}</h3><div class="table-scroll"${wide ? ` tabindex="0" role="region" aria-labelledby="${escape(titleId)}"` : ''}><table${wide ? ` class="is-wide" style="--table-columns:${columns}"` : ''} aria-labelledby="${escape(titleId)}">${head}<tbody>${body}</tbody></table></div></div>`;
  }
  function renderChapter(chapter) {
    const heading = chapter.layout === 'hero' ? 'h1' : 'h2';
    const intro = `<p class="eyebrow">${escape(chapter.label)}</p><${heading} id="${escape(chapter.id)}-title">${lines(chapter.title)}</${heading}><p class="lead">${escape(chapter.lead)}</p>${chapter.intro ? `<p class="intro">${escape(chapter.intro)}</p>` : ''}`;
    const links = chapter.links ? `<div class="hero-actions">${chapter.links.map((link, index) => `<a class="${index === 0 ? 'primary-link' : 'secondary-link'}" href="${escape(link.href)}">${escape(link.label)}<span aria-hidden="true">${index === 0 ? '↓' : '↗'}</span></a>`).join('')}</div>` : '';
    const table = renderTable(chapter);
    return `<section class="chapter ${escape(chapter.layout || '')}" id="${escape(chapter.id)}" aria-labelledby="${escape(chapter.id)}-title" tabindex="-1">${intro}${links}${renderModules(chapter.modules)}${chapter.layout !== 'hero' ? renderHighlights(chapter.highlights) : ''}${renderProcess(chapter.process)}${renderMedia(chapter.media)}${chapter.layout === 'hero' ? renderHighlights(chapter.highlights) : ''}${table}${chapter.note ? `<p class="note">${escape(chapter.note)}</p>` : ''}${chapter.closing ? `<p class="closing">${escape(chapter.closing)}</p>` : ''}</section>`;
  }
  $('#chapter-nav').innerHTML = data.chapters.map((chapter, index) => `<a class="nav-link" href="#${escape(chapter.id)}"><span class="nav-number">${String(index + 1).padStart(2, '0')}</span>${escape(chapter.nav)}</a>`).join('');
  $('#chapters').innerHTML = data.chapters.map(renderChapter).join('');

  // Keep missing assets explicit. Never replace a screenshot with a product mock-up.
  $$('[data-media-image]').forEach(image => image.addEventListener('error', () => {
    const figure = image.closest('figure');
    if (image.dataset.playing === 'true') {
      setAnimation(Number(figure.dataset.media), false);
      const label = $('.animation-label', figure);
      if (label) label.textContent = '录屏暂不可用';
      const control = $('[data-animation]', figure);
      if (control) control.disabled = true;
      return;
    }
    const frame = $('.media-frame', figure);
    frame.innerHTML = '<div class="media-error" role="status">这张实录图片尚未加入文档素材，请查看媒体清单。</div>';
  }));

  const menuButton = $('.mobile-menu');
  const sidebar = $('.sidebar');
  const backdrop = $('.sidebar-backdrop');
  function toggleMenu(open) {
    sidebar.classList.toggle('is-open', open);
    backdrop.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '关闭章节导航' : '打开章节导航');
    document.body.classList.toggle('modal-open', open || Boolean($('dialog[open]')));
    if (open) $('.search-trigger').focus();
  }
  menuButton.addEventListener('click', () => toggleMenu(!sidebar.classList.contains('is-open')));
  backdrop.addEventListener('click', () => { toggleMenu(false); menuButton.focus(); });
  $$('.sidebar a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
  window.matchMedia('(min-width: 681px)').addEventListener('change', event => { if (event.matches) toggleMenu(false); });
  $('.print-button').addEventListener('click', () => window.print());

  // Use native anchors for deep links, back/forward navigation and file:// compatibility.
  function setActiveSection(id) {
    $$('.nav-link').forEach(link => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }
  function updateActiveSection() {
    const offset = window.innerWidth <= 680 ? 110 : 100;
    let current = data.chapters[0].id;
    $$('.chapter').forEach(section => { if (section.getBoundingClientRect().top <= offset) current = section.id; });
    setActiveSection(current);
  }
  let scrollScheduled = false;
  window.addEventListener('scroll', () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => { updateActiveSection(); scrollScheduled = false; });
  }, { passive: true });
  window.addEventListener('hashchange', updateActiveSection);
  updateActiveSection();

  function openDialog(dialog) {
    lastFocused = document.activeElement;
    toggleMenu(false);
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  $$('dialog').forEach(dialog => {
    $('[data-close-dialog]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      if (dialog.classList.contains('lightbox')) $('.lightbox-image').removeAttribute('src');
      if (lastFocused?.isConnected) lastFocused.focus({ preventScroll: true });
    });
  });

  const searchDialog = $('.search-dialog');
  const searchInput = $('#search-input');
  function collectStrings(value) {
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value.flatMap(collectStrings);
    if (value && typeof value === 'object') return Object.entries(value).filter(([key]) => !['image', 'gif', 'href', 'id', 'layout'].includes(key)).flatMap(([, item]) => collectStrings(item));
    return [];
  }
  const searchIndex = data.chapters.map(chapter => ({ chapter, strings: collectStrings(chapter) }));
  function highlighted(text, query) {
    if (!query) return escape(text);
    const start = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
    return start < 0 ? escape(text) : `${escape(text.slice(0, start))}<mark>${escape(text.slice(start, start + query.length))}</mark>${escape(text.slice(start + query.length))}`;
  }
  function updateSearch() {
    const query = searchInput.value.trim();
    const words = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const matches = searchIndex.filter(item => !words.length || words.every(word => item.strings.join(' ').toLocaleLowerCase().includes(word)));
    $('.search-status').textContent = query ? `找到 ${matches.length} 个相关章节` : '浏览全部章节，或输入关键词缩小范围';
    $('.search-results').innerHTML = matches.length ? matches.map(({ chapter, strings }) => {
      const matchingString = strings.find(text => text.length > 15 && words.some(word => text.toLocaleLowerCase().includes(word))) || chapter.lead;
      const snippet = matchingString.replace(/\n/g, ' ');
      const number = data.chapters.indexOf(chapter) + 1;
      return `<a class="search-result" href="#${escape(chapter.id)}"><span class="search-result-title"><span class="search-result-number">${String(number).padStart(2, '0')}</span>${highlighted(chapter.nav, query)}</span><p>${highlighted(snippet, query)}</p></a>`;
    }).join('') : '<p class="search-empty">没有找到相关内容，试试“场景”“玩家”或“Worker”。</p>';
    $$('.search-result').forEach(link => link.addEventListener('click', () => {
      searchDialog.close();
      const section = document.getElementById(link.hash.slice(1));
      requestAnimationFrame(() => section?.focus({ preventScroll: true }));
    }));
  }
  $('.search-trigger').addEventListener('click', () => { openDialog(searchDialog); updateSearch(); searchInput.focus(); });
  searchInput.addEventListener('input', updateSearch);
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); $('.search-result')?.focus(); }
    if (event.key === 'Enter') $('.search-result')?.click();
  });
  searchDialog.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key) || document.activeElement === searchInput) return;
    const results = $$('.search-result');
    const position = results.indexOf(document.activeElement);
    if (position < 0) return;
    event.preventDefault();
    if (event.key === 'ArrowUp' && position === 0) searchInput.focus();
    else results[Math.max(0, Math.min(results.length - 1, position + (event.key === 'ArrowDown' ? 1 : -1)))]?.focus();
  });

  function setAnimation(index, playing) {
    const media = mediaItems[index];
    if (!media?.animation) return;
    const image = $(`[data-media-image="${index}"]`);
    if (!image) return;
    image.dataset.playing = String(playing);
    image.src = playing ? media.animation : media.src;
    const button = $(`[data-animation="${index}"]`);
    button.setAttribute('aria-pressed', String(playing));
    $('.play-symbol', button).textContent = playing ? 'Ⅱ' : '▶';
    $('.animation-label', button).textContent = playing ? '停止演示' : '播放演示';
  }
  $$('[data-animation]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.animation);
    const playing = button.getAttribute('aria-pressed') !== 'true';
    $$('[data-animation][aria-pressed="true"]').forEach(other => setAnimation(Number(other.dataset.animation), false));
    setAnimation(index, playing);
  }));

  const lightbox = $('.lightbox');
  let lightboxIndex = null;
  let lightboxPlaying = false;
  function updateLightboxAnimation() {
    const media = mediaItems[lightboxIndex];
    $('.lightbox-image').src = lightboxPlaying ? media.animation : media.src;
    $('.lightbox-animation').textContent = lightboxPlaying ? '停止演示' : '播放演示';
    $('.lightbox-animation').setAttribute('aria-pressed', String(lightboxPlaying));
    $('.lightbox-original').href = lightboxPlaying ? media.animation : media.src;
  }
  $$('[data-open-image]').forEach(button => button.addEventListener('click', () => {
    lightboxIndex = Number(button.dataset.openImage);
    const media = mediaItems[lightboxIndex];
    lightboxPlaying = false;
    $$('[data-animation][aria-pressed="true"]').forEach(other => setAnimation(Number(other.dataset.animation), false));
    $('#lightbox-title').textContent = media.title;
    $('.lightbox-caption').textContent = media.caption;
    $('.lightbox-image').alt = media.alt || media.title;
    $('.lightbox-animation').hidden = !media.animation;
    updateLightboxAnimation();
    openDialog(lightbox);
  }));
  $('.lightbox-animation').addEventListener('click', () => { lightboxPlaying = !lightboxPlaying; updateLightboxAnimation(); });
  $('.lightbox-image').addEventListener('error', () => {
    if (!lightboxPlaying) return;
    lightboxPlaying = false;
    updateLightboxAnimation();
    $('.lightbox-caption').textContent = `${mediaItems[lightboxIndex].caption}（录屏暂不可用，当前显示静态截图。）`;
  });
  const stopAnimations = () => {
    $$('[data-animation][aria-pressed="true"]').forEach(button => setAnimation(Number(button.dataset.animation), false));
    if (lightboxPlaying) { lightboxPlaying = false; updateLightboxAnimation(); }
  };
  reducedMotion.addEventListener('change', event => { if (event.matches) stopAnimations(); });
  window.addEventListener('beforeprint', stopAnimations);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAnimations(); });
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === 'k') {
      event.preventDefault();
      if (lightbox.open) lightbox.close();
      if (!searchDialog.open) { openDialog(searchDialog); updateSearch(); }
      searchInput.focus();
    }
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) { toggleMenu(false); menuButton.focus(); }
    if (event.key === 'Tab' && sidebar.classList.contains('is-open')) {
      const focusable = $$('a,button', sidebar);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
})();
